import{_ as a,c as n,o as i,ae as p}from"./chunks/framework.06KOO6Yt.js";const l="/vitepress-doc/assets/image-byes.CyonY6Pe.png",e="/vitepress-doc/assets/image-epuo.8DOKywZW.png",t="/vitepress-doc/assets/image-wkhg.C_usK3fb.png",r="/vitepress-doc/assets/image-gmth.CAaS7tJr.png",o="/vitepress-doc/assets/image-vlih.C2Dhd4W9.png",h="/vitepress-doc/assets/image-kvnq.JlVhD-Kh.png",c="/vitepress-doc/assets/image-edvo.BZYajMJH.png",k="/vitepress-doc/assets/image-nlgn.DURCSRlx.png",f=JSON.parse('{"title":"搭建 Frpc + Frps 实现内网穿透","description":"","frontmatter":{},"headers":[],"relativePath":"work/NAS内网穿透frpc+frps.md","filePath":"work/NAS内网穿透frpc+frps.md"}'),d={name:"work/NAS内网穿透frpc+frps.md"};function g(E,s,u,m,y,x){return i(),n("div",null,s[0]||(s[0]=[p('<h1 id="搭建-frpc-frps-实现内网穿透" tabindex="-1">搭建 Frpc + Frps 实现内网穿透 <a class="header-anchor" href="#搭建-frpc-frps-实现内网穿透" aria-label="Permalink to &quot;搭建 Frpc + Frps 实现内网穿透&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><strong>适用条件：</strong> 无公网 IPv4、IPv6 的网络环境；域名后想隐藏端口的强迫症</p><p><strong>个人建议：</strong> 采用境外 VPS（带宽较大，HK 优先，延迟低）</p><h2 id="搭建步骤" tabindex="-1">搭建步骤 <a class="header-anchor" href="#搭建步骤" aria-label="Permalink to &quot;搭建步骤&quot;">​</a></h2><ol><li>VPS 搭建 frps、Nginx Proxy Manager</li><li>家庭服务搭建 frpc</li><li>域名托管 A 类型指向 VPS IPv4 地址</li><li>Nginx Proxy Manager 配置反代</li></ol><h2 id="第一步-搭建-frps、nginx-proxy-manager" tabindex="-1">第一步：搭建 frps、Nginx Proxy Manager <a class="header-anchor" href="#第一步-搭建-frps、nginx-proxy-manager" aria-label="Permalink to &quot;第一步：搭建 frps、Nginx Proxy Manager&quot;">​</a></h2><h3 id="frps" tabindex="-1">Frps <a class="header-anchor" href="#frps" aria-label="Permalink to &quot;Frps&quot;">​</a></h3><p><strong>VPS 路径：</strong>/home 新建一个 <code>/frps</code> 和 <code>/npm</code> 文件夹。</p><p><img src="'+l+'" alt="本地图片"><img src="'+e+`" alt="本地图片"> 在 <code>/home/frps</code> 文件夹中添加 <code>docker-compose.yml</code> 和 <code>frps.toml</code> 两个文件，并填写下方代码：</p><p><strong>docker-compose.yml</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;3.5&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    frp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">stilleshan/frps</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;7000:7000&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/frps/frps.toml:/frp/frps.toml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">always</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        external</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><p>frps.toml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>bindAddr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span>bindPort = 7000</span></span>
<span class="line"><span>#kcpBindPort = 7000</span></span>
<span class="line"><span>quicBindPort = 7000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vhostHTTPPort = 80</span></span>
<span class="line"><span>vhostHTTPSPort = 443</span></span>
<span class="line"><span></span></span>
<span class="line"><span>transport.maxPoolCount = 2000</span></span>
<span class="line"><span>transport.tcpMux = true</span></span>
<span class="line"><span>transport.tcpMuxKeepaliveInterval = 60</span></span>
<span class="line"><span>transport.tcpKeepalive = 7200</span></span>
<span class="line"><span>transport.tls.force = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>webServer.addr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span>webServer.port = 7500</span></span>
<span class="line"><span>webServer.user = &quot;admin&quot;                 #需替换，可自定内容</span></span>
<span class="line"><span>webServer.password = &quot;admin&quot;             #需替换，可自定内容</span></span>
<span class="line"><span>webServer.pprofEnable = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.to = &quot;./frps.log&quot;</span></span>
<span class="line"><span>log.level = &quot;info&quot;</span></span>
<span class="line"><span>log.maxDays = 3</span></span>
<span class="line"><span>log.disablePrintColor = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>auth.method = &quot;token&quot;</span></span>
<span class="line"><span>auth.token = &quot;12345678&quot;                  #需替换，可自定内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>allowPorts = [</span></span>
<span class="line"><span>  { start = 10001, end = 50000 }         #frps放行端口段10001-50000</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>maxPortsPerClient = 8                    #允许放行frpc端口数量，可修改</span></span>
<span class="line"><span>udpPacketSize = 1500</span></span>
<span class="line"><span>natholeAnalysisDataReserveHours = 168</span></span></code></pre></div><p>cd /home/frps</p><p>docker compose up -d</p><p>然后就启动容器啦</p><p><strong>Nginx Proxy Manager</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;3.5&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">chishin/nginx-proxy-manager-zh:latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;443:443&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;80:80&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;81:81&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;10222:10222&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">always</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/nginx/data:/data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/nginx/letsencrypt:/etc/letsencrypt</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TZ=Asia/Shanghai</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span></code></pre></div><p>cd /home/nmp</p><p>docker compose up -d</p><p>部署后访问VPSIP:81即可</p><h2 id="第二步-搭建-frpc" tabindex="-1">第二步：搭建 Frpc <a class="header-anchor" href="#第二步-搭建-frpc" aria-label="Permalink to &quot;第二步：搭建 Frpc&quot;">​</a></h2><p>搭建方式很多，本文使用 <strong>Docker Compose</strong> 搭建</p><h1 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h1><p>同 <code>frps</code>，为避免因 <code>frpc.toml</code> 文件的挂载、格式或者配置错误导致容器无法正常运行并循环重启，请确保先配置好 <code>frpc.toml</code> 后再执行启动。 <img src="`+t+'" alt="本地图片"><img src="'+r+`" alt="本地图片"></p><p><strong>frps.toml</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>\`\`\`yaml</span></span>
<span class="line"><span>serverAddr = &quot;xx.xx.xx.xx&quot;                   #你的VPS地址</span></span>
<span class="line"><span>serverPort = 7000</span></span>
<span class="line"><span>auth.method = &quot;token&quot;</span></span>
<span class="line"><span>auth.token = &quot;freefrp.net&quot;                   #同frpc.toml中auth.token</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[proxies]]</span></span>
<span class="line"><span>name = &quot;tcp_xxxxx&quot;                           #自定义服务名称，可复制多个，但后续name、localPort必须不同</span></span>
<span class="line"><span>type = &quot;tcp&quot;                                 #协议类型，常见为tcp，但也可为http等，详见项目地址</span></span>
<span class="line"><span>localIP = &quot;192.168.1.2&quot;                      #你的本地IP，若搭建在nas，则为nas的IP</span></span>
<span class="line"><span>localPort = 5000                             #你的本地服务web端口</span></span>
<span class="line"><span>remotePort = 12306                           #你想反代出去的端口，可自定义，Nginx Proxy Manager中填写此端口</span></span>
<span class="line"><span>                                             #数值范围为frps.toml中allowPorts放行端口段（本文10001-50000）      </span></span>
<span class="line"><span>[[proxies]]</span></span>
<span class="line"><span>name = &quot;web2_xxxxx&quot;</span></span>
<span class="line"><span>type = &quot;https&quot;</span></span>
<span class="line"><span>localIP = &quot;192.168.1.2&quot;</span></span>
<span class="line"><span>localPort = 5001</span></span>
<span class="line"><span>remotePort = 12306 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[proxies]]</span></span>
<span class="line"><span>name = &quot;tcp1_xxxxx&quot;</span></span>
<span class="line"><span>type = &quot;tcp&quot;</span></span>
<span class="line"><span>localIP = &quot;192.168.1.3&quot;</span></span>
<span class="line"><span>localPort = 22</span></span>
<span class="line"><span>remotePort = 22222</span></span></code></pre></div><p><strong>Docker Compose</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\`\`\`yaml</span></span>
<span class="line"><span>services:  # 服务定义</span></span>
<span class="line"><span>  frpc:  # 服务名称</span></span>
<span class="line"><span>    image: stilleshan/frpc  # 镜像来源</span></span>
<span class="line"><span>    container_name: frpc  # 容器名称</span></span>
<span class="line"><span>    restart: always  # 容器重启策略</span></span>
<span class="line"><span>    privileged: true  # 允许容器获得特权</span></span>
<span class="line"><span>    network_mode: host  # 宿主机网络模式</span></span>
<span class="line"><span>    volumes:  # 挂载卷</span></span>
<span class="line"><span>      - /volume1/docker/AppData/frp/frpc.toml:/frp/frpc.toml  # 映射配置文件存储路径</span></span></code></pre></div><h2 id="第三步-将二级域名-dns-a-类型解析至-vps-的-ip" tabindex="-1">第三步：将二级域名 DNS A 类型解析至 VPS 的 IP <a class="header-anchor" href="#第三步-将二级域名-dns-a-类型解析至-vps-的-ip" aria-label="Permalink to &quot;第三步：将二级域名 DNS A 类型解析至 VPS 的 IP&quot;">​</a></h2><h2 id="域名解析" tabindex="-1">域名解析 <a class="header-anchor" href="#域名解析" aria-label="Permalink to &quot;域名解析&quot;">​</a></h2><ol><li>登录您的域名管理平台（如阿里云、腾讯云、Cloudflare 等）。</li><li>找到域名的 <strong>DNS 解析设置</strong>。</li><li>添加一条 <strong>A 记录</strong>，配置如下： <ul><li><strong>主机记录</strong>：<code>*</code>（表示通配符，匹配所有二级域名）</li><li><strong>记录类型</strong>：<code>A</code></li><li><strong>记录值</strong>：填写您的 VPS 的 IP 地址</li><li><strong>TTL</strong>：默认值或根据需求调整</li></ul></li></ol><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><p>以阿里云 DNS 解析为例：</p><ul><li><strong>主机记录</strong>：<code>*</code></li><li><strong>记录类型</strong>：<code>A</code></li><li><strong>记录值</strong>：<code>123.123.123.123</code>（替换为您的 VPS IP 地址）</li><li><strong>TTL</strong>：<code>600</code>（默认值）</li></ul><h3 id="注意事项-1" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项-1" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ul><li>通配符 <code>*</code> 表示所有二级域名，例如 <code>sub1.example.com</code>、<code>sub2.example.com</code> 等都会解析到该 IP。</li><li>解析生效时间取决于 TTL 设置，通常需要几分钟到几小时。</li></ul><p><img src="`+o+'" alt="本地图片"></p><h2 id="第四步-配置-nginx-proxy-manager" tabindex="-1">第四步：配置 Nginx Proxy Manager <a class="header-anchor" href="#第四步-配置-nginx-proxy-manager" aria-label="Permalink to &quot;第四步：配置 Nginx Proxy Manager&quot;">​</a></h2><h1 id="访问-nginx-proxy-manager" tabindex="-1">访问 Nginx Proxy Manager <a class="header-anchor" href="#访问-nginx-proxy-manager" aria-label="Permalink to &quot;访问 Nginx Proxy Manager&quot;">​</a></h1><ol><li>在浏览器中输入您的 VPS 的 IPv4 地址，并加上端口 <code>81</code>，例如：<a href="http://123.123.123.123:81" target="_blank" rel="noreferrer">http://123.123.123.123:81</a></li><li>打开后，进入 Nginx Proxy Manager 的 Web 界面。</li></ol><h1 id="注册账号" tabindex="-1">注册账号 <a class="header-anchor" href="#注册账号" aria-label="Permalink to &quot;注册账号&quot;">​</a></h1><ol><li>在登录页面，点击 <strong>Register</strong> 或 <strong>注册</strong>。</li><li>输入您的邮箱和密码，完成账号注册。</li></ol><h1 id="默认账号-可选" tabindex="-1">默认账号（可选） <a class="header-anchor" href="#默认账号-可选" aria-label="Permalink to &quot;默认账号（可选）&quot;">​</a></h1><p>如果您使用的是默认安装，可以直接使用以下默认账号登录：</p><ul><li><strong>默认账号</strong>：<code>admin@example.com</code></li><li><strong>默认密码</strong>：<code>changeme</code></li></ul><h2 id="登录并进入-web-服务" tabindex="-1">登录并进入 Web 服务 <a class="header-anchor" href="#登录并进入-web-服务" aria-label="Permalink to &quot;登录并进入 Web 服务&quot;">​</a></h2><ol><li>使用注册的账号或默认账号登录。</li><li>登录后，您将进入 Nginx Proxy Manager 的管理界面，可以开始配置反向代理、SSL 证书等。</li></ol><p><img src="'+h+'" alt="本地图片"></p><h2 id="申请证书" tabindex="-1">申请证书 <a class="header-anchor" href="#申请证书" aria-label="Permalink to &quot;申请证书&quot;">​</a></h2><p><img src="'+c+'" alt="本地图片"></p><h2 id="然后就可以访问了" tabindex="-1">然后就可以访问了 <a class="header-anchor" href="#然后就可以访问了" aria-label="Permalink to &quot;然后就可以访问了&quot;">​</a></h2><p><img src="'+k+'" alt="本地图片"></p>',54)]))}const P=a(d,[["render",g]]);export{f as __pageData,P as default};
