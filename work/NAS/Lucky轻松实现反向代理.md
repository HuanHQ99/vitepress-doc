# Lucky 部署及反向代理配置指南

## 前期准备工作

1. <mark>**公网 IPv4**：确保拥有公网 IPv4。</mark>
2. <mark>**域名购买**：在腾讯云、阿里云等平台购买域名。</mark>
3. <mark>**部署 Lucky**：支持 Docker 和 Docker Compose 两种部署方式。</mark>

---

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



## Docker 部署
1. 使用 Docker 客户端部署。
2. 添加完直接确定启动。
![本地图片](/public/img/work/Lucky/image-wzfz.png)
![本地图片](/public/img/work/Lucky/image-cipm.png)
## 初始化 Lucky
1. 打开浏览器，访问 `IP+16601`，进入 Lucky 管理后台。
![本地图片](/public/img/work/Lucky/image-azmw.png)
2. 默认用户名和密码均为 `666`，登录后点击左侧“设置”选项卡，重置管理账号和密码。
![本地图片](/public/img/work/Lucky/image-suqr.png)
---

## 添加 DDNS 任务
1. 在左侧找到“动态域名”选项卡，点击“添加 DDNS 任务”。
![本地图片](/public/img/work/Lucky/image-qtov.png)
2. 填写任务名称，操作模式选择“简易模式”，DNS 服务商选择域名服务商（如腾讯云）。
3. 创建 Token，将 ID 和 Token 填入。
4. 根据公网 IP 类型选择 IPv4 或 IPv6，获取方式选择“通过接口获取”。
5. 域名列表填写两行：
   - 第一行：主域名（如 `example.com`）。
   - 第二行：`*.主域名`（如 `*.example.com`），表示二级域名。
   ![本地图片](/public/img/work/Lucky/image-lkut.png)
6. 点击“添加”，稍等片刻，看到“域名 IP 和公网 IP 一致”即表示 DDNS 设置成功。
![本地图片](/public/img/work/Lucky/image-dpha.png)

---

## 申请 SSL 证书
1. 转到“安全管理”选项卡，点击“添加证书”。
![本地图片](/img/work/Lucky/image-dopu.png)
2. 备注随意填写，添加方式选择“ACME”，证书颁发机构选择“Let's Encrypt”。
3. DNS 服务商选择域名服务商。
![本地图片](/img/work/Lucky/image-jgcy.png)
4. 如果公网 IP 是 IPv4，开启“DNS 查询强制 IPv4”和“DNS 查询仅使用 TCP 通道”。
![本地图片](/img/work/Lucky/image-sijw.png)
5. 点击“添加”，等待几分钟，证书申请成功后会出现颁发时间和到期时间。
![本地图片](/img/work/Lucky/image-zxhp.png)

---

## 设置反向代理及 HTTPS 访问
1. 转到“Web 服务”菜单，点击“添加 Web 规则”。
i![本地图片](/public/img/work/Lucky/image-diaf.png)
2. 填写规则名称，开启规则开关，操作模式选择“简易模式”。
3. 监听类型根据公网 IP 类型选择，监听端口默认 `16666`（可自定义）。
4. 开启“防火墙自动放行”和“TLS”（必须开启，否则无法使用 HTTPS）。
![本地图片](/public/img/work/Lucky/image-iqpc.png)
5. 点击“添加 Web 服务子规则”：
   - **名称**：随意填写。
   - **规则开关**：开启。
   - **Web 服务类型**：选择“反向代理”。
   - **前端域名/地址**：填写二级域名（如 `nas.example.com`）。
   - **后端地址**：填写内网 IP + 端口号（如 `http://192.168.1.100:8080`）。
   ![本地图片](/public/img/work/Lucky/image-cptn.png)
6. **BasicAuth 认证**：根据需要开启，增加访问安全性。
![本地图片](/public/img/work/Lucky/image-tzyw.png)
7. 添加所有需要的子规则，确保二级域名前缀不冲突。
![本地图片](/public/img/work/Lucky/image-xaoo.png)
8. 将反向代理端口（如 `7777`）通过路由器映射出去，确保内网端口和外网端口一致。
![本地图片](/public/img/work/Lucky/image-dwin.png)
---

## 访问测试
1. 从外网访问 `https://二级域名:端口`（如 `https://nas.example.com:7777`）。
2. 确保域名前面显示“锁”图标，表示已启用 HTTPS。
3. 如果宽带未被封禁 443 端口，可使用 443 端口作为反代端口，直接通过域名访问（如 `https://example.com`）。
![本地图片](/public/img/work/Lucky/image-qdma.png)

---

## 注意事项
1. **TLS 必须开启**，否则访问不安全。
2. **端口映射**：确保反向代理端口已通过路由器映射。
3. **域名前缀**：避免二级域名前缀冲突。
4. **SSL 证书续签**：Lucky 会自动续签，无需手动干预。
![本地图片](/public/img/work/Lucky/image-azhj.png)__
---
