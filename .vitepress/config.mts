import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HuanHQ技术栈",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle: "文章目录",
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'NAS相关',
        items: [
          { text: '什么是项目（Docker-Compose）', link: '/work/什么是docker-compose' },
          { text: 'NAS内网穿透frpc+frps', link: '/work/NAS内网穿透frpc+frps.md' },
          { text: 'Docker-Compose汇总', link: '/work/Docker-Compose汇总.md' },
          { text: '绿联云使用Lucky轻松实现反向代理+Https外网访问家庭NAS', link: '/work/Lucky轻松实现反向代理.md' },
          { text: 'NAS搭建Navidrome打造私有音乐库-享受极致音乐体验', link: '/work/NAS搭建Navidrome打造私有音乐库-享受极致音乐体验.md' },
          { text: '优化网络体验：V2Ray+和+Clash+的部署方法', link: '/work/优化网络体验：V2Ray+和+Clash+的部署方法.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
