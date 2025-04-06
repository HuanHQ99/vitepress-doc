import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HuanHQ技术栈",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/img/icon/logo.png",
    outlineTitle: "文章目录",
    outline: [1, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '联系方式', link: '/work/联系方式' },
      {
        text: '公益项目',
        items: [
          {
            text: '公益图床',
            link: 'https://img.5100.hk',
          },
          {
            text: '公益GPT',
            link: 'https://gpt.5100.hk',
          },
          {
            text: '公益Music',
            link: 'https://music.5100.hk',
          },
          {
            text: '公益图标库',
            link: 'https://icon.huanhq.com',
          },
          {
            items: [
              {
                text: 'bilbil',
                link: 'https://space.bilibili.com/3493118026451330?spm_id_from=333.337.search-card.all.click',
              },
            ],
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
        ],
      },
      {
        text: 'NAS',
        items: [
          { text: '什么是项目（Docker-Compose）', link: '/work/什么是docker-compose' },
          { text: 'NAS内网穿透frpc+frps', link: '/work/NAS内网穿透frpc+frps.md' },
          { text: 'NAS搭建Navidrome打造私有音乐库-享受极致音乐体验', link: '/work/NAS搭建Navidrome打造私有音乐库-享受极致音乐体验.md' },
          { text: 'NAS部署密码管理器Vaultwarden（原bitwarden）', link: '/work/绿联云部署密码管理器Vaultwarden（原bitwarden）.md' },
          { text: 'Docker-Compose汇总', link: '/work/Docker-Compose汇总.md' },
          { text: '绿联云使用Lucky轻松实现反向代理+Https外网访问家庭NAS', link: '/work/Lucky轻松实现反向代理.md' },
          { text: '优化网络体验：V2Ray+和+Clash+的部署方法', link: '/work/优化网络体验：V2Ray+和+Clash+的部署方法.md' },
          { text: 'MoviePilot-V2，实现全自动化订阅+整理+削刮+搜索下载的观影一条龙', link: '/work/MoviePilot-V2，实现全自动化订阅+整理+削刮+搜索下载的观影一条龙.md' },
          { text: 'MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网', link: '/work/MoviePilot企业微信推送教程适用V1、V2版本，公网&无公网.md' },
          { text: '无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）', link: '/work/无需数据库支持，Docker部署开箱即用的简单图床（EasyImage）.md' },
          { text: 'Lucky轻松实现反向代理', link: '/work/Lucky轻松实现反向代理.md' },

        ],
      },
      {
        text: 'VPS',
        items: [
          { text: 'Debian手动安装docker、docker compose命令', link: '/work/Debian手动安装docker、docker compose命令.md' },
          { text: 'NezhaV1部署教程+Nginx反代', link: '/work/NezhaV1部署教程+Nginx反代.md' },
          { text: 'Cloudflare搭建免费的Docker镜像加速器', link: '/work/Cloudflare搭建免费的Docker镜像加速器.md' },
        ],
      },
      {
        text: 'Symedia、FastEmby专区',
        items: [
          { text: 'Emby直链115神器，削刮、整理、重命名（Symedia+FastEmby）', link: '/work/Emby直链115神器，削刮、整理、重命名（Symedia+FastEmby）.md' },
          { text: 'Symedia—插件使用', link: '/work/Symedia—插件使用.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HuanHQ99/vitepress-doc' }
    ]
  }
})

