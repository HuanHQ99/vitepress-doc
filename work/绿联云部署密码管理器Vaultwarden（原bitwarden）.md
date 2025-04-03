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
1、打开文件管理，在docker目录下新建Vaultwarden目录用来存储配置文件666