## 前言
在当今数字化时代，我们经常需要记住大量的密码，涵盖着各种网站、应用和在线服务。然而，为了安全起见，我们不能简单地使用相同的密码，也不能使用容易猜到的密码，因为这会让我们的账户变得极度脆弱，易受黑客攻击。

密码管理器是现代生活中必不可少的工具，它为我们提供了安全、方便和高效的方式来组织和存储各种登录凭据和敏感信息。在众多密码管理器中，Bitwarden凭借其卓越的功能和开源透明的优势脱颖而出。Bitwarden不仅提供跨平台的支持，而且提供了免费和付费版本，以满足不同用户的需求。Vaultwarden 是一个用于本地搭建 Bitwarden 服务器的第三方 Docker 项目。仅在部署的时候使用 Vaultwarden 镜像，桌面端、移动端、浏览器扩展等客户端均使用官方 Bitwarden 客户端。本期教程我们将使用绿联私有云部署Vaultwarden项目。
## 必要条件
因为Vaultwarden访问必须使用https，所有具备以下条件，才能部署访问。

绿联ddns已经解析成功，可以使用域名访问绿联web端或者相关服务，有需求可以看下面这篇文章。
## Docker Compose部署
Docker Compose 配置文件

```yaml
version: "3.8" # 确保指定版本
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      - SIGNUPS_ALLOWED=true # 不允许注册，先填true，自己注册完再改成false
      - TZ=Asia/Shanghai # 正确的时区设置
    volumes:
      - /opt/vaultwarden:/data # 持久化数据的路径
    ports:
      - 5100:80 # 映射的端口
networks: {}

````
Docker部署
1、打开文件管理，在docker目录下新建Vaultwarden目录用来存储配置文件
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/1.png)
在docker镜像仓库中搜索Vaultwarden，下载最新版本（latest）
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/2.png)
本地容器中找到下载好的镜像盘，点击+创建容器
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/3.png)
容器名称自定义，勾选自动重启，创建后启动容器，点击下一步
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/4.png)
存储空间文件/文件夹选择创建的Vaultwarden目录，类型改为读写

nas端口填写一个未使用的

点击确认，启动容器，
初始化
（注意这里需要用lucky反代内网你填写的NAS端口）浏览器输入反代地址
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/5.png)
输入邮箱、名称、密码，点击创建账户
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/6.png)
创建成功以后，进行登录
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/7.png)
浏览器插件安装和登录
edge、谷歌、360极速浏览器等在相关的拓展中心浏中直接搜索bitwarden安装就行
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/8.png)
这里说一下浏览器插件登录的方式，首先我们点击bitwarden小图标，然后点击自托管，弹出的页面中输入外网登录的完整链接（记得要有https），然后点击保存，然后点击登录输入用户名和密码既可以登录后台
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/9.png)
登录成功
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/10.png)
密码导入和密码的添加
方式1. 可以把我们浏览器上存储的密码导入到Bitwarden中，登录Bitwarden后台，在工具→导入数据中可以看到支持导入的数据文件，具体浏览器生成的文件导入过程很大同小异这里不做介绍。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/11.png)
方式2. 在我们未保存密码的网页项目中会最自动弹出窗口，这时候我们点击保存即可，这样密码会自动填充到密码库中。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/12.png)
方式3. 我们也可以点击添加登录信息去手动保存账号和密码。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/13.png)
生成强密码
1、当我们注册一个网站的时候，不知道该设置什么样的密码的时候可以使用Vaultwarden生成，点击生成器，可以在选项中设置密码复杂性。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/14.png)
2、在生成器的最下方密码历史记录中可以查看到历史生成密码的记录。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/15.png)
补充设置
点开密码库，选择设置，按照图片勾选一下选项，此选项是为了避免重启浏览器，密码库让重新输入密码的状况。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/16.png)
设置→选项，默认的url匹配方式请选择主机，这样是为了提高在相同域名不同端口自动填充密码的准确性。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/17.png)
设置→选项，按照图片勾选，自动填充密码。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/18.png)
移动端下载
1、Vaultwarden客户端可以使用bitwarden的，两者之前兼容，下载地址如下。 Vaultwarden客户端下载地址：https://bitwarden.com/download/

2、移动端安装成功以后点击区域，将服务器改为自托管，填写服务器URL，然后点击保存，登录账号即可
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/19.png)
3、登录完成之后点击设置→自动填充服务。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/20.png)
4、将里面的选项按照教程引导都打开即可。
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/21.png)
进阶配置
1、浏览器输入vaultwarden地址，在地址后面加上/admin，既可以进入配置页面，根据自身需求进行相关即可
![本地图片](/public/img/work/绿联云部署密码管理器Vaultwarden（原bitwarden）/22.png)
2、在进阶配置遇到问题时优先查看Vaultwarden文档 中文说明文档：https://rs.ppgg.in/ 原版英文文档：https://github.com/dani-garcia/vaultwarden/wiki
总结
vaultwarden为我们提供了一种高效、安全的密码管理解决方案。通过使用Bitwarden，我们可以极大地提升在线安全性，免除担心密码丢失或泄漏的困扰，让我们能够专注于享受数字化生活带来的便利与乐趣，推荐大家部署使用，本篇教程结束，咱们下一篇见。

