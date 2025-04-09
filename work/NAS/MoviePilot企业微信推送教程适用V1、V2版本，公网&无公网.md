固定半年公网IP

http://111.119.207.11:9999/

企业微信填ip即可

mp后台记得加端口

下面有搭建教程

企业微信推送
前提准备：

1、公网ipv4(动态/静态)

2、域名（一定要有域名，把mp服务映射到外网。内网是搞不了企业微信推送的）

3、企业微信账号

4、vps服务器（可选）

1.登录企业微信，记录企业ID 并填写在WECHAT CORPID①
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/1.png)
2、新建应用
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/2.png)
3、填写相关信息并上传图标
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/3.png)
4、创建完成后，点击Secret的查看获取对应的值并填写在WECHAT_APP_SECRET③同时填写上面的AgentId到应用ID WECHAT_APP_ID中②
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/4.png)
5、然后配置企业可信IP，企业微信现在做了安全升级，这里配置的必须为公网固定IP（可以买一个阿里云或者腾讯云等小服务器即可，做地址代理中转）（这个位置只需要填写IP即可）④（可信ip可找我购买）
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/5.png)
6、上划页面到功能部分，配置接收消息
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/6.png)
7、配置内容
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/7.png)
URL中填写你的域名加上固定后缀（这里和nastool是不一样的）/api/wl/message?token=（如果是V2版本token要十六位）

Token是你在conpose.yaml文件中或在./config/app.env 文件中配置的 API_IOKEN 的值（环境变脸权重大于配置文件权重）
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/8.png)
点击随机获取Token⑤
点击随机获取EncodingAESKey⑥
！！！然后一次从上往下看序号，填写在mp后台中设定-通知中即可！！！（下方4号位置与企业微信不符，需要以http://IP:端口的方式填写）
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/9.png)

注意！！

配置完成后这个时候点击保存是无法生效的，你必须重启服务(如果已经启动)或者构建服务(还没启动)后再点击保存 才能生

效！！！

8、使用方法
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/10.png)
## 搭建微信代理
前置条件
首先你需要一台拥有固定公网V4的VPS
Docker命令部署

## Docker  部署

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
## Docker Compose 部署

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
浏览器输入地址查看，出现此即成功（端口可按需修改）
![本地图片](/public/img/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网/11.png)
