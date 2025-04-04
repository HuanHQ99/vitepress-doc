前言
最近，哪吒面板进行了V1版本的更新，页面UI和系统操作逻辑和V0相比有了非常大的变化，

所以写一篇新的教程教大家如何搭建安装。
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/1.png)
安装 Dashboard
与常规的不同，本期教程采用的是Docker-Compose的方式进行部署
## Docker Compose 配置文件
```yaml
services:
  dashboard:
    image: ghcr.io/nezhahq/nezha
    container_name: nezha-dashboard
    restart: always
    volumes:
      - ./data:/dashboard/data
    ports:
      - 8008:8008
````
在/opt下创建nezha文件夹，并且把上方命令行复制到docker-compose.yml文本中

在ssh命令中，cd进到该目录/opt/nezha，docker compose up -d执行
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/2.png)
安装完成后，可以通过 http://ip:8008 进入 Dashboard，然后点击登录
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/3.png)
默认用户名密码都是admin登录到后台之后，立刻前往个人信息中修改默认的登录密码
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/4.png)
安装 Agent
v1 版本安装 Agent 变化比较大，不需要添加服务器再运行安装命令，直接复制一键安装命令，到对应的机器上执行即可，安装完成后，机器会自动显示在列表中（机器多的可以借助 SSH 工具批量执行，所有机器的安装命令都相同）

请注意，如果你是国内的机器，则需要在github前面添加一个加速地址即可，具体地址可以询问度娘

系统设置里面一定是ip+端口否则国内鸡挂不上
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/5.png)
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/6.png)
配置ngixn反向代理
Docker-Compose命令
## Docker Compose 配置文件
```yaml
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
````
在/opt下创建nginx文件夹，并且把上方命令行复制到docker-compose.yml文本中

在ssh命令中，cd进到该目录/opt/nginx，docker compose up -d执行
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/7.png)
日志中有账号密码

docker composoe logs -f
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/8.png)
安装完成后，可以通过 http://ip:81 进入 Nginx，然后点击登录

配置反代域名
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/9.png)
反代配置
填写下方命令
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/10.png)
```yaml
underscores_in_headers on;
ignore_invalid_headers off;

location /dashboard {
    proxy_pass http://$server:$port;
    proxy_set_header Host $http_host;
    proxy_set_header      Upgrade $http_upgrade;
}
# websocket 相关
location ~* ^/api/v1/ws/(server|terminal|file)(.*)$ {
    proxy_set_header Host $host;
    proxy_set_header nz-realip $remote_addr;
    proxy_set_header Origin https://$host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
    proxy_pass http://$server:$port;
}
# grpc 相关    
location ^~ /proto.NezhaService/ {
    grpc_set_header Host $host;
    grpc_set_header nz-realip $remote_addr;
    grpc_set_header client_secret $http_client_secret;
    grpc_set_header client_uuid $http_client_uuid;
    grpc_read_timeout 600s;
    grpc_send_timeout 600s;
    grpc_socket_keepalive on;
    client_max_body_size 10m;
    grpc_buffer_size 4m;
    grpc_pass grpc://$server:$port;
}
 ````
输入配置好的域名，即可访问成功
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/11.png)
设置三网监控
要新增一个网络波动监控，请按照以下步骤操作：

进入管理面板
转到 服务 页，点击 + 按钮添加新的服务监控。

配置参数
在新增监控时，设置以下参数：

名称：为此服务自定义一个名称。

目标

TC Ping：输入运营商 IP 地址/域名并添加端口号，例如：1.1.1.1:80 或 example.com:22。

类型：选择监控类型（TC Ping）。

服务中显示：选择是否向游客显示此监控（隐私性选项）。

间隔：设置监控间隔时间（单位：秒）。

覆盖范围：选择一条规则来确定哪些 Agent 请求目标。

特定服务器：指定覆盖范围内需要使用的 Agent。

通知组 ID：选择已在 通知 页中配置的通知方式，详见 通知方式配置。

启用失败通知：可选择在目标故障时接收通知（默认为不启用）。

提交监控
点击 提交 按钮保存配置，稍等片刻后返回主页查看监控结果

效果：


![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/12.png)
全国三网IP地
```yaml
河北

     联通             移动              电信


61.182.138.156  111.62.229.100    27.185.242.215
山西

     联通             移动              电信


60.221.18.41  183.201.244.91    1.71.157.41
辽宁

     联通             移动              电信


218.61.211.132  	36.131.156.145    123.184.58.41
吉林

     联通             移动              电信

122.143.8.41 111.27.127.176 123.172.127.217

黑龙江
     联通             移动              电信
     
113.7.211.140 111.42.190.25 42.101.84.132

江苏
     联通             移动              电信
     
122.96.235.165 36.156.92.132 58.215.210.220

浙江
     联通             移动              电信
     
101.69.194.224 117.147.213.41 115.220.14.91

安徽
     联通             移动              电信
     
112.132.208.41 112.29.198.100 223.247.108.251

福建

     联通             移动              电信
     
36.248.48.139 112.50.96.88 106.126.10.28

江西

     联通             移动              电信
     
116.153.69.224 117.168.150.249 106.227.22.132

山东

     联通             移动              电信
     
112.240.56.143 120.220.145.91 144.123.160.140

河南

     联通             移动              电信
     
123.6.65.101 111.7.99.220 171.15.110.220

湖北

     联通             移动              电信
     
122.189.226.138 111.47.131.101 111.170.8.60

湖南

     联通             移动              电信
     
116.162.28.220 120.226.192.91 113.240.117.108

广东

     联通             移动              电信
     
112.90.211.100 183.240.65.191 183.36.23.111

海南

     联通             移动              电信
     
153.0.226.35 111.29.29.219 124.225.43.220

四川

     联通             移动              电信
     
101.206.163.49 183.220.151.41 118.123.218.220

贵州

     联通             移动              电信
     
117.187.254.132 61.243.18.220 58.42.61.132

云南

     联通             移动              电信
     
14.204.150.41 36.147.44.219 222.221.102.220

陕西

     联通             移动              电信
     
123.139.127.132 111.19.148.100 124.115.14.100

甘肃

     联通             移动              电信
     
59.81.94.53 117.157.16.41 118.182.228.91

青海

     联通             移动              电信
     
116.177.237.137 111.12.152.170 223.221.216.219

内蒙古

     联通             移动              电信
     
116.114.98.41 117.161.76.41 110.76.186.70

广西

     联通             移动              电信
     
171.39.5.51 36.136.112.41 222.217.93.55

西藏

     联通             移动              电信
     
43.242.165.35 117.180.234.41 113.62.176.89

宁夏

     联通             移动              电信
     
116.129.226.28 111.51.155.214 222.75.44.220

新疆

     联通             移动              电信
     
116.178.77.40 36.189.208.164 110.157.243.45

北京

     联通             移动              电信
     
202.108.29.159 222.35.73.1 220.181.173.35

天津

     联通             移动              电信
     
116.78.119.56 111.31.236.35 42.81.98.35

上海

     联通             移动              电信
     
59.81.65.42 183.194.219.220 101.227.191.14

重庆

     联通             移动              电信
     
113.207.69.190 221.178.81.101 119.84.131.101



````
分享一些小玩意
在后台通知中的警报规则中添加
     
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/13.png)
```yaml
[{"type":"transfer_out_cycle","max":1099511627776,"cycle_start":"2024-11-28T00:00:00+08:00","cycle_interval":1,"cycle_unit":"month","cover":1,"ignore":{"19":true}}]
````
"type": "transfer_out_cycle"：可能表示这是一个关于出站传输的规则或周期的类型。

"max": 1099511627776：这个值是1TB（约为 1024 GB），表示在给定的周期内最大的传输量。

如果你想表示2TB的传输量，你只需将 "max" 字段的值更改为2TB的字节表示。1TB等于 1×10244=1,099,511,627,7761×10244=1,099,511,627,776 字节，所以2TB等于 2×10244=2,199,023,255,5522×10244=2,199,023,255,552 字节

"cycle_start": "2024-11-28T00:00:00+08:00"：这表示计算周期的开始时间，这里是2024年11月28日零时。

"cycle_interval": 1：这表示周期的长度。在这个上下文中，由于 "cycle_unit": "month"，所以这表示每个周期为1个月。

"cover": 1：这个键的意义根据具体上下文可能会有所不同。可能表示此规则是否覆盖其他规则，或者是否启用此规则。

"ignore": {"19": true}：这表示在某些情况下忽略此规则。在这个例子中，可能表示在每个月的19号，这个出站传输的限制不适用
在编辑服务器中添加的公开内容
![本地图片](/public/img/work/NezhaV1部署教程+Nginx反代/14.png)
```yaml
{
   "billingDataMod": {
       "startDate": "2024-10-01T00:00:00+08:00",
       "endDate": "2024-11-01T00:00:00+08:00",
       "autoRenewal": "1",
       "cycle": "月",
       "amount": "$3.99"
   },
   "planDataMod": {
       "bandwidth": "30Mbps",
       "trafficVol": "1TB/月",
       "trafficType": "1",
       "IPv4": "1",
       "IPv6": "1",
       "networkRoute": "CN2,GIA",
       "extra": "传家宝,AS9929"
   }
}
````