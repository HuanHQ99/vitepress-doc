前言
本篇文章主要讲Symedia插件的使用方法

## 微信通知
插件功能：可利用微信做转发通知
前期准备
先注册一个企业微信账号

微信通知代理服务器部署
## Docker Compose 配置文件
```yaml
version: "3.3"
services:
  wxchat:
    container_name: wxchat
    restart: always
    ports:
      - 7777:80
    image: ddsderek/wxchat:latest
networks: {}
 
 
````
![本地图片](/public/img/work/Symedia插件/wechat/1.png)
获取方式
企业ID
![本地图片](/public/img/work/Symedia插件/wechat/2.png)
应用ID
先创建我们的机器人，上传好头像，设置好名称
![本地图片](/public/img/work/Symedia插件/wechat/3.png)
![本地图片](/public/img/work/Symedia插件/wechat/4.png)
应用秘钥
![本地图片](/public/img/work/Symedia插件/wechat/5.png)
Access Token
![本地图片](/public/img/work/Symedia插件/wechat/6.png)
![本地图片](/public/img/work/Symedia插件/wechat/7.png)
消息加密秘钥
![本地图片](/public/img/work/Symedia插件/wechat/8.png)
URL（回调地址）
企业微信回调地址填写：https://sa的公网地址/api/v1/message/?token=symedia
![本地图片](/public/img/work/Symedia插件/wechat/9.png)
![本地图片](/public/img/work/Symedia插件/wechat/10.png)
代理URL
填写你部署的微信通知代理服务器IP即可

Sa插件记得填写格式http://ip:端口
![本地图片](/public/img/work/Symedia插件/wechat/11.png)
填写完成
注意查看是否存在空格
![本地图片](/public/img/work/Symedia插件/wechat/12.png)
如何使用
微信扫码添加即可
![本地图片](/public/img/work/Symedia插件/wechat/13.png)
然后就可以使用了
![本地图片](/public/img/work/Symedia插件/wechat/14.png)


## EmbyServer
插件功能：用于生成Strm｜软链接时通知Emby扫库
![本地图片](/public/img/work/Symedia插件/emby/1.png)
Emby媒体服务器通知：需要设置媒体服务器Webhook，回调相对路径为 /api/v1/webhook/mediamsg/emby/{Emby IP:端口}/{Emby API Key}?token=symedia（8095端口），其中 symedia 为设置的 API_TOKEN。 示例：http://172.17.0.1:8095/api/v1/webhook/mediamsg/emby/172.17.0.1:8096/770131037e8e49459618af98c14de06c?token=symedia
![本地图片](/public/img/work/Symedia插件/emby/2.png)
![本地图片](/public/img/work/Symedia插件/emby/3.png)
路径替换：Emby和Symedia对于同一个目录映射方式相同时可以不填

Emby通知的原理是把生成的Strm｜软链接的路径通知给Emby，让Emby去扫描该路径，如果Strm｜软链接的目录在Symedia和Emby中的映射不一样，则需要在这里进行替换。因此建议Symedia和Emby在映射目录时尽量保持一致

支持的配置格式（注意空格）：多个配置用;隔开

被替换路径1 => 替换路径1;被替换路径2 => 替换路径2;...

示例：比如对于/mnt/Symlink在Symedia中的映射为/mnt/Symlink:/Symedia/Symlink,在Emby中的映射为/mnt/Symlink:/Emby/Symlink,我们就需要把/Symedia/Symlink替换为/Emby/Symlink

那么路径替换就是：/Symedia/Symlink => /Emby/Symlink

注意！！！
如遇到测试失败，则需要再Emby添加这三条环境变量
```yaml
HTTP_PROXY=http://192.168.9.5:7890
ALL_PROXY=http://192.168.9.5:7890
NO_PROXY=172.17.0.1,127.0.0.1,localhost
 
````
![本地图片](/public/img/work/Symedia插件/emby/4.png)
![本地图片](/public/img/work/Symedia插件/emby/5.png)

