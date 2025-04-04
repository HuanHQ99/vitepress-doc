## Navidrome
![本地图片](/public/img/work/Navidrome/image-mvay.png)

## Docker Compose 配置文件
```yaml
version: "3"
services:
  navidrome:
    image: deluan/navidrome:latest
    ports:
      - 4533:4533
    restart: unless-stopped
    environment:
      ND_ENABLETRANSCODINGCONFIG: true
      ND_TRANSCODINGCACHESIZE: 0
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
      ND_ENABLESHARING: true
      ND_LASTFM_ENABLED: false
      ND_LASTFM_LANGUAGE: zh
    volumes:
      - /opt/Navidrome/data:/data   # 自定义缓存路径
      - /opt/clouddrive/CloudNAS/Music:/music:ro  # 自定义音乐文件夹路径
networks: {}
````
## Lucky
![本地图片](/public/img/work/Lucky/image-xaoo.png)

## Docker Compose 配置文件
```yaml
services:
  lucky:
    image: gdy666/lucky
    container_name: lucky
    volumes:
      - /volume1/docker/lucky:/goodluck
    network_mode: host
    restart: always
````
## Nginx
![本地图片](/img/work/Lucky/image-xaoo.png)

## Docker Compose 配置文件

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
## Music-Tag
![本地图片](/public/img/work/Navidrome/image-dylk.png)

## Docker Compose 配置文件

```yaml
version: '3'

services:
  music-tag:
    image: xhongc/music_tag_web:latest
    container_name: music-tag-web
    ports:
      - "8002:8002"
    volumes:
      - /volume2/video/Music/音乐（已刮削）:/app/media
      - /volume1/docker/music-tag/config:/app/data
    restart: always

````
## Emby
![本地图片](/public/img/icon/image-mjrm.png)

## Docker Compose 配置文件

```yaml
version: '3.8'  # 指定 Compose 文件版本

services:
  emby:  # 服务名称
    image: linuxserver/emby:latest  # 指定 Docker 镜像
    container_name: emby  # 容器名称
    network_mode: bridge  # 使用桥接网络模式
    environment:
      - PUID=0  # 用户ID（可调整为非特权用户）
      - PGID=0  # 组ID（可调整为非特权用户）
      - TZ=Asia/Shanghai  # 时区
    volumes:
      - /volume1/docker/emby:/config  # 配置文件存储路径
      - /volume1/video:/video  # 媒体文件存储路径
    ports:
      - 8096:8096  # 映射的 Web 界面端口
    devices:
      - /dev/dri:/dev/dri  # 映射图形加速设备
    restart: unless-stopped  # 重启策略

````
## Qbittorrent
![本地图片](/public/img/icon/qb.png)

## Docker Compose 配置文件

```yaml
version: '3.8'  # 指定 Docker Compose 文件的版本

services:
  qbittorrent:  # qbittorrent 服务的定义
    image: lscr.io/linuxserver/qbittorrent:latest  # 使用 qBittorrent 的最新 LinuxServer.io 镜像
    container_name: qbittorrent  # 指定容器的名称为 qbittorrent
    environment:  # 定义环境变量
      PUID: 0  # 设置运行容器的用户 ID（0 表示 root 用户）
      PGID: 0  # 设置容器的组 ID（0 表示 root 用户组）
      TZ: Etc/UTC  # 设置时区为 UTC
      WEBUI_PORT: 8080  # 设置 Web UI 访问端口为 8080
      TORRENTING_PORT: 22154  # 设置 Torrent 下载端口为 22154
    volumes:  # 定义卷的挂载
      - /volume1/docker/qbittorrent/config:/config  # 将宿主机配置目录挂载到容器内部
      - /volume2/video:/volume2/video  # 将宿主机的视频目录挂载到容器内部
    ports:  # 定义端口映射
      - "8080:8080"  # 将宿主机 8080 端口映射到容器的 8080 端口
      - "6881:6881"  # 将宿主机 6881 端口映射到容器的 6881 端口（TCP）
      - "6881:6881/udp"  # 将宿主机 6881 端口映射到容器的 6881 端口（UDP）
    deploy:  # 配置服务部署
      resources:  # 资源限制设置
        limits:  # 定义资源限制
          cpus: '2'     # 限制容器最多使用的 CPU 核心数为 2
          memory: 4G    # 限制容器最多使用的内存为 4GB
    restart: unless-stopped  # 设置重启策略，容器崩溃后自动重启，手动停止后不重启
 

````
## Docker Compose五合一
## Docker Compose 配置文件

```yaml
version: "3.8"
services:
  alist:
    image: xhofe/alist:latest
    container_name: alist
    volumes:
      - /volume1/docker/alist:/opt/alist/data
    ports:
      - 5244:5244
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: unless-stopped

  clouddrive2:
    image: cloudnas/clouddrive2:latest
    container_name: clouddrive2
    restart: unless-stopped
    environment:
      - CLOUDDRIVE_HOME=/Config
      - ENABLE_RUN_AFTER_START=true
    volumes:
      - /opt/stacks/CloudNAS:/CloudNAS:shared
      - /opt/stacks/clouddrive2/Config:/Config
    network_mode: host
    privileged: true
    devices:
      - /dev/fuse:/dev/fuse

  symedia:
    image: shenxianmq/symedia:latest
    container_name: symedia
    restart: always
    ports:
      - "8095:8095"
    volumes:
      - /opt/stacks/CloudNAS:/CloudNAS:rslave
      - /opt/stacks/strm:/strm
      - /opt/stacks/symedia/config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      TZ: Asia/Shanghai
      LICENSE_KEY: ""

  FastEmby:
    image: shenxianmq/fastemby:latest
    container_name: fastemby
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /opt/stacks/fastemby/config:/app/config
      - /opt/stacks/fastemby/log:/app/log
    network_mode: host
    restart: always

  emby:
    image: linuxserver/emby:latest
    container_name: emby
    network_mode: bridge
    environment:
      - PUID=0
      - PGID=0
      - TZ=Asia/Shanghai
    volumes:
      - /opt/stacks/emby/config:/config
      - /opt/stacks/strm:/strm
    ports:
      - 8096:8096
    devices:
      - /dev/dri:/dev/dri
    restart: unless-stopped
 

````
