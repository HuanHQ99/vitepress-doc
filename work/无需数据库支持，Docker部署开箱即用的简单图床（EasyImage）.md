前言
Easyimage 是一个功能强大的在线图像处理和管理工具，旨在为用户提供简单而高效的方式来处理图像。这款应用程序采用了友好的用户界面，使得图像上传、编辑和管理变得轻而易举。无论您是个人用户还是企业用户，Easyimage 都能够满足您对图像处理的多样化需求
特点
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/1.png)
项目地址https://github.com/icret/EasyImages2.0
界面演示
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/2.png)
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/3.png)
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/4.png)
开始部署
## Docker Compose部署
Docker Compose 配置文件

```yaml
version: '3.3'  # 使用 Docker Compose 的 3.3 版本
services:
  easyimage:
    image: ddsderek/easyimage:latest  # 使用最新镜像
    container_name: easyimage           # 容器名称
    restart: unless-stopped             # 容器重启策略
    ports:
      - '8080:80'                       # 容器内部端口80映射到主机的8080端口
    environment:
      TZ: Asia/Shanghai                 # 设置时区
      PUID: 1000                        # 设置用户ID
      PGID: 1000                        # 设置组ID
    volumes:
      - '/root/data/docker_data/easyimage/config:/app/web/config'  # 持久化配置
      - '/root/data/docker_data/easyimage/i:/app/web/i'            # 持久化数据

````
Docker部署
该项目的部署和名字一样，也是特别简单。首先我们需要在docker文件夹中新建easyimage文件夹

随后再在其中新建子文件夹config与i
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/5.png)
在docker注册表中搜索ddsderek/easyimage下载
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/6.png)
再将config映射路径设置为/app/web/config

i映射路径为/app/web/i

端口映射80端口，本地不冲突即可
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/7.png)
浏览器输入http://nasip+本地端口进入安装界面。直接点击下一步，随后自定义你的信息。
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/8.png)
根据自己实际情况填写
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/9.png)
EasyImage可以一次批量上传多个图片文件，我个人实测上传的速度还是非常快的，并且在这个页面下方还显示了每个图片的直链链接
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/10.png)
上传完成的图片会全部显示在“广场”上上传完成的图片会全部显示在“广场”上
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/11.png)
它有个“统计”功能很不错，可以很直观的了解目前使用的磁盘空间
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/12.png)
它还有非常丰富的设置项，我这里我也不一一演示了，反正别的图床该有的功能它一个都没少，别的图床可能是付费的功能它也免费的给咱们安排上了，比如说水印、自动压缩、图片甄别等多种功能
## 注意
如果不想让别人看到你广场的图片，就到设置把这个关掉即可
![本地图片](/public/img/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）/13.png)
