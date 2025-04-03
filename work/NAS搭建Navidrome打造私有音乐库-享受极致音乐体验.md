# 前言
今天教大家如何使用绿联云搭建一个私有音乐服务。搭建完成后，配合 `music_tag_web` 刮削歌词与封面，以及各平台客户端使用，体验非常不错。有兴趣的朋友可以尝试一下。

## Navidrome
Navidrome 是一个开源的音乐服务器，支持多平台客户端访问，适合搭建私有音乐库。
![本地图片](/img/work/Navidrome/image-mvay.png)
## Navidrome
![本地图片](/img/work/Navidrome/image-dylk.png)
# 使用的项目
## 1. Navidrome
- **GitHub 地址**: [Navidrome](https://github.com/navidrome/navidrome)  
- **简介**: Navidrome 是一款基于网络的开源音乐收藏服务器和流媒体。它让您可以通过任何浏览器或移动设备自由收听您收藏的音乐。

## 2. Music Tag Web
- **GitHub 地址**: [Music Tag Web](https://github.com/xhongc/music-tag-web)  
- **简介**: Web 版音乐标签编辑器，支持编辑歌曲的标题、专辑、艺术家、歌词、封面等信息。支持多种音频格式，包括 FLAC、APE、WAV、AIFF、MP3、M4A、OGG、MPC、OPUS、WMA、DSF、DFF、MP4 等。

## 3. StreamMusic 音流 (非开源)
- **GitHub 地址**: [StreamMusic](https://github.com/gitbobobo/StreamMusic)  
- **简介**: 支持 Android、iOS、macOS、Windows 平台的 Subsonic/Navidrome/Jellyfin/Emby/AudioStation 客户端。作者计划后期支持 TV 版本。
![本地图片](/img/work/Navidrome/image-ecej.png)
# Navidrome 部署
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


![本地图片](/img/work/Navidrome/image-nodd.png)
# Navidrome 配置指南
## 1. 访问 Navidrome
在浏览器中打开 Navidrome 的管理界面，默认端口为：4533
配置好用户名和密码登录成功以后-配置语言为中文
![本地图片](/img/work/Navidrome/image-iotv.png)
放置自己的音乐到/io/music目录以后
![本地图片](/img/work/Navidrome/image-tloe.png)
扫描以后就出来音乐了
![本地图片](/img/work/Navidrome/image-vdwe.png)
这些是我用Music-tag刮削好的，所以都有海报墙

# Music-tag 部署指南
## 1. 创建 `docker-compose.yml` 文件
在项目目录下创建一个名为 `docker-compose.yml` 的文件，内容如下：

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

![本地图片](/img/work/Navidrome/image-qtqj.png)
配置Muisc-tag
启动完，浏览器输入ip+8002端口

默认用户名admin密码admin

需要修改密码的进入以下地址http://ip:8002/admin自行修改即可

![本地图片](/img/work/Navidrome/image-gsrs.png)
选中这些没有刮削的，选按自己需求选择刮削模式，然后确定开始刮削
![本地图片](/img/work/Navidrome/image-uvkd.png)
因为我这边没刮削的比较少，所以会快一点
![本地图片](/img/work/Navidrome/image-gjmu.png)
我的建议是没刮削和刮削完的单独分开 (没刮削的先刮好再自动放到那个刮好的文件夹)

有点强迫症...我的习惯是刮削好再整理文件夹（然后整理好的文件目录，/中文音乐/艺术家/专辑）
![本地图片](/img/work/Navidrome/image-rjpu.png)
都刮削好之后，在Navidrome都是海报墙啦
![本地图片](/img/work/Navidrome/image-rsad.png)
## 客户端使用(附下载链接)
将搭建好的服务绑定公网就可以使用各个平台的客户端了

Navidrome的客户端软件有很多与所有 Subsonic/Madsonic/Airsonic客户端兼容本次推荐使用StreamMusic音流
![本地图片](/img/work/Navidrome/image-iaeq.png)
iso,Android ,mac,Windows 客户端都有 使用方法是直接配置地址
![本地图片](/img/work/Navidrome/image-whju.png)
登录用户名密码直接可以使用
![本地图片](/img/work/Navidrome/image-puid.png)
这是官网地址，里面每个客户端的下载地址都有：[音流官网](https://music.aqzscn.cn/)