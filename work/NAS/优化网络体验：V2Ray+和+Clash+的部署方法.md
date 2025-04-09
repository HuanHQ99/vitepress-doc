## v2raya

## Docker Compose部署
Docker Compose 配置文件

```yaml
version: '3.8'

services:
  v2raya:
    image: mzz2017/v2raya:latest
    container_name: v2raya
    ports:
      - "2017:2017"  # 映射容器的2017端口到主机的2017端口
      - "20170:20170"  # 映射容器的20170端口到主机的20170端口
      - "20171:20171"  # 映射容器的20171端口到主机的20171端口
      - "20172:20172"  # 映射容器的20172端口到主机的20172端口
    volumes:
      - ./v2raya_data:/etc/v2raya  # 将本地目录映射到容器内的配置目录
    environment:
      - TZ=Asia/Shanghai  # 设置时区
    restart: unless-stopped  # 自动重启策略
    privileged: true  # 给予容器特权模式
    networks:
      - v2raya_network  # 指定使用的网络

networks:
  v2raya_network:
    driver: bridge  # 使用桥接网络

````
Docker客户端部署

![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-1.png)
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-2.png)
建议部署完后立即启动，首先跳转到v2raya的使用方法，学习设置端口转发，并给docker 镜像服务器进行加速，方便之后的各种镜像拉取。

## 使用方法
因为MP/TMM的削刮+整理依赖TMDB，国内DNS污染比较严重，为了Emby能够更好的识别削刮，故需要科学上网科学，事先准备好✈️场，没有机场的可以自行购买一个。容器更新比较频繁，更新同样也需要科学，有条件的还是准备一个✈️场（可找我合租），观影体验更佳。注册好后，点击⼀键订阅后复制订阅地址，保存好，接下来需要⽤到。

浏览器输入 http://你的设备IP:2017，即可访问到容器，下面的其他容器访问也是同理不再过多赘述。

首次登录让你创建个账户密码，自己输入喜欢的，之后让你输入订阅地址即是上面✈️场的机场的订阅地址。
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-3.png)
然后再进行测速，选择一个时延最低的点连接即可

![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-4.png)
然后点右上角的设置，并打开端口分享设置
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-5.png)
点选择一个节点，点连接，然后点左上角的启动就成功了
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-6.png)
现在科学上网就可以了，目前这个是http代理，大家不用担心QB等下载会走代理流量，容器只有增加了环境变量（HTTP_PROXY）才会进行http代理，并且此容器有国内外分流。在代理地址中填入：http://本机IP+20171即可。
前端mrxianyu-metacubexd-ui、后端metacubex-mihomo
适用于不可安装V2raya的NAS设备
Docker Compose部署
## Docker Compose 配置文件

```yaml
version: '3.8'

services:
  v2raya:
    image: mzz2017/v2raya:latest
    container_name: v2raya
    ports:
      - "2017:2017"  # 映射容器的2017端口到主机的2017端口
      - "20170:20170"  # 映射容器的20170端口到主机的20170端口
      - "20171:20171"  # 映射容器的20171端口到主机的20171端口
      - "20172:20172"  # 映射容器的20172端口到主机的20172端口
    volumes:
      - ./v2raya_data:/etc/v2raya  # 将本地目录映射到容器内的配置目录
    environment:
      - TZ=Asia/Shanghai  # 设置时区
    restart: unless-stopped  # 自动重启策略
    privileged: true  # 给予容器特权模式
    networks:
      - v2raya_network  # 指定使用的网络

networks:
  v2raya_network:
    driver: bridge  # 使用桥接网络

````
Docker部署
前端
拉取镜像mrxianyu-metacubexd-ui双击部署（保持默认，本地端口改为9080直接启动就行）
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-7.png)
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-8.png)
网络模式默认 nas端口为9080 然后确定即可
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-9.png)
本地浏览器输入http：//IP:端口添加
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/10.png)
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/11.png)
后端（先新建文件夹/docker/mihomo/config）
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-12.png)
将config.yaml geoip.metadb文件放置/docker/mihomo/config目录下

config文件自己去clash客户端下载
[geoip.metadb下载地址](https://github.com/HuanHQ99/vitepress-doc/blob/main/public/file/geoip.metadb)
（由于可能网络原因拉不动，可以直接使用我的）
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-13.png)
> 映射路径：共享文件夹/docker/mihomo/config:/root/.config/mihomo/
> 端口映射

> - 7890：7890

> - 7891：7891

> - 7892：7892

> - 9090：9090

![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-14.png)
日志有节点信息就没问题
![本地图片](/public/img/work/优化网络体验：V2Ray+和+Clash+的部署方法/image-15.png)
