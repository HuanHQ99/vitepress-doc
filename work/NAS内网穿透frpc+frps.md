# 搭建 Frpc + Frps 实现内网穿透

## 前言

**适用条件：** 无公网 IPv4、IPv6 的网络环境；域名后想隐藏端口的强迫症

**个人建议：** 采用境外 VPS（带宽较大，HK 优先，延迟低）

## 搭建步骤

1.  VPS 搭建 frps、Nginx Proxy Manager
2.  家庭服务搭建 frpc
3.  域名托管 A 类型指向 VPS IPv4 地址
4.  Nginx Proxy Manager 配置反代

## 第一步：搭建 frps、Nginx Proxy Manager

### Frps

**VPS 路径：**/home 新建一个 `/frps` 和 `/npm` 文件夹。

![本地图片](/img/image-byes.png)
![本地图片](/img/image-epuo.png)
在 `/home/frps` 文件夹中添加 `docker-compose.yml` 和 `frps.toml` 两个文件，并填写下方代码：

**docker-compose.yml**

```yaml
version: "3.5"
services:
    frp:
        image: stilleshan/frps
        ports:
            - "7000:7000"
        networks:
            - nginx
        volumes:
            - /home/frps/frps.toml:/frp/frps.toml
        restart: always
        container_name: frp
networks:
    nginx:
        external: true
````
frps.toml

````
bindAddr = "0.0.0.0"
bindPort = 7000
#kcpBindPort = 7000
quicBindPort = 7000

vhostHTTPPort = 80
vhostHTTPSPort = 443

transport.maxPoolCount = 2000
transport.tcpMux = true
transport.tcpMuxKeepaliveInterval = 60
transport.tcpKeepalive = 7200
transport.tls.force = false

webServer.addr = "0.0.0.0"
webServer.port = 7500
webServer.user = "admin"                 #需替换，可自定内容
webServer.password = "admin"             #需替换，可自定内容
webServer.pprofEnable = false

log.to = "./frps.log"
log.level = "info"
log.maxDays = 3
log.disablePrintColor = false

auth.method = "token"
auth.token = "12345678"                  #需替换，可自定内容

allowPorts = [
  { start = 10001, end = 50000 }         #frps放行端口段10001-50000
]

maxPortsPerClient = 8                    #允许放行frpc端口数量，可修改
udpPacketSize = 1500
natholeAnalysisDataReserveHours = 168

 ````
cd /home/frps

docker compose up -d

然后就启动容器啦


**Nginx Proxy Manager**
```yaml
version: "3.5"
services:
  nginx:
    image: chishin/nginx-proxy-manager-zh:latest
    container_name: nginx
    ports:
      - "443:443"
      - "80:80"
      - "81:81"
      - "10222:10222"
    restart: always
    volumes:
      - /home/nginx/data:/data
      - /home/nginx/letsencrypt:/etc/letsencrypt
    environment:
      - TZ=Asia/Shanghai
    networks:
      - nginx
networks:
  nginx:
    name: nginx
 
````
cd /home/nmp

docker compose up -d

部署后访问VPSIP:81即可
## 第二步：搭建 Frpc
搭建方式很多，本文使用 **Docker Compose** 搭建

# 注意事项
同 `frps`，为避免因 `frpc.toml` 文件的挂载、格式或者配置错误导致容器无法正常运行并循环重启，请确保先配置好 `frpc.toml` 后再执行启动。
![本地图片](/img/image-wkhg.png)
![本地图片](/img/image-gmth.png)



**frps.toml**
````

```yaml
serverAddr = "xx.xx.xx.xx"                   #你的VPS地址
serverPort = 7000
auth.method = "token"
auth.token = "freefrp.net"                   #同frpc.toml中auth.token

[[proxies]]
name = "tcp_xxxxx"                           #自定义服务名称，可复制多个，但后续name、localPort必须不同
type = "tcp"                                 #协议类型，常见为tcp，但也可为http等，详见项目地址
localIP = "192.168.1.2"                      #你的本地IP，若搭建在nas，则为nas的IP
localPort = 5000                             #你的本地服务web端口
remotePort = 12306                           #你想反代出去的端口，可自定义，Nginx Proxy Manager中填写此端口
                                             #数值范围为frps.toml中allowPorts放行端口段（本文10001-50000）      
[[proxies]]
name = "web2_xxxxx"
type = "https"
localIP = "192.168.1.2"
localPort = 5001
remotePort = 12306 

[[proxies]]
name = "tcp1_xxxxx"
type = "tcp"
localIP = "192.168.1.3"
localPort = 22
remotePort = 22222
````


**Docker Compose**

````
```yaml
services:  # 服务定义
  frpc:  # 服务名称
    image: stilleshan/frpc  # 镜像来源
    container_name: frpc  # 容器名称
    restart: always  # 容器重启策略
    privileged: true  # 允许容器获得特权
    network_mode: host  # 宿主机网络模式
    volumes:  # 挂载卷
      - /volume1/docker/AppData/frp/frpc.toml:/frp/frpc.toml  # 映射配置文件存储路径
````

## 第三步：将二级域名 DNS A 类型解析至 VPS 的 IP

## 域名解析
1. 登录您的域名管理平台（如阿里云、腾讯云、Cloudflare 等）。
2. 找到域名的 **DNS 解析设置**。
3. 添加一条 **A 记录**，配置如下：
   - **主机记录**：`*`（表示通配符，匹配所有二级域名）
   - **记录类型**：`A`
   - **记录值**：填写您的 VPS 的 IP 地址
   - **TTL**：默认值或根据需求调整

### 示例
以阿里云 DNS 解析为例：
- **主机记录**：`*`
- **记录类型**：`A`
- **记录值**：`123.123.123.123`（替换为您的 VPS IP 地址）
- **TTL**：`600`（默认值）

### 注意事项
- 通配符 `*` 表示所有二级域名，例如 `sub1.example.com`、`sub2.example.com` 等都会解析到该 IP。
- 解析生效时间取决于 TTL 设置，通常需要几分钟到几小时。

![本地图片](/img/image-vlih.png)

## 第四步：配置 Nginx Proxy Manager

# 访问 Nginx Proxy Manager
1. 在浏览器中输入您的 VPS 的 IPv4 地址，并加上端口 `81`，例如：http://123.123.123.123:81
2. 打开后，进入 Nginx Proxy Manager 的 Web 界面。

# 注册账号
1. 在登录页面，点击 **Register** 或 **注册**。
2. 输入您的邮箱和密码，完成账号注册。

# 默认账号（可选）
如果您使用的是默认安装，可以直接使用以下默认账号登录：  
- **默认账号**：`admin@example.com`  
- **默认密码**：`changeme`  

## 登录并进入 Web 服务
1. 使用注册的账号或默认账号登录。
2. 登录后，您将进入 Nginx Proxy Manager 的管理界面，可以开始配置反向代理、SSL 证书等。

![本地图片](/img/image-kvnq.png)

## 申请证书
![本地图片](/img/image-edvo.png)
## 然后就可以访问了
![本地图片](/img/image-nlgn.png)