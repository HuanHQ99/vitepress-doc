import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "HuanHQ技术栈",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/img/icon/logo.png",
    outlineTitle: "文章目录",
    outline: [1, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Docker-Compose汇总', link: '/work/Docker-Compose汇总' },
      { text: '友链', link: '/work/友链.md' },
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
        text: "Nas",
        collapsed: false,
        items: set_sidebar("/work/NAS"),
      },
      {
        text: "Symedia",
        collapsed: false,
        items: set_sidebar("/work/Symedia"),
      },
      {
        text: "VPS",
        collapsed: false,
        items: set_sidebar("/work/VPS"),
      },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HuanHQ99/vitepress-doc' }
    ]
  }
})

