## Navidrome
![本地图片](/img/work/Navidrome/image-mvay.png)

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
![本地图片](/img/work/Lucky/image-xaoo.png)

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
![本地图片](/img/work/Navidrome/image-dylk.png)

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