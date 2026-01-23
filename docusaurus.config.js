// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KAI BLOG',
  favicon: 'img/channels4_profile.jpg',
  url: 'https://kaiblog.is-a.dev',
  baseUrl: '/',
  organizationName: 'kaihchs118',
  projectName: 'kaiblog',
  onBrokenLinks: 'throw',

  future: { v4: true },

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          onInlineTags: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        // 在這裡同時加入 "en" 和 "zh"
        language: ["en", "zh"], 
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        // 重要：這會影響 Enter 鍵的行為，部分版本需確保此項開啟
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurusd.jpg',
      
      announcementBar: {
        id: 'support_us',
        content: '🎉 歡迎來到我的部落格！<a href="/about">了解更多關於我</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },

      colorMode: { respectPrefersColorScheme: false },

      navbar: {
        title: 'KAI BLOG',
        logo: { alt: 'Logo', src: 'img/channels4_profile.jpg' },
        items: [
          {
            to: '/blog', 
            label: '📝 最新貼文', // 或是使用 <i class="fa-solid fa-pen-nib"></i> 📝
            position: 'left'
          },
          {
            to: '/docs', 
            label: '📚 筆記', 
            position: 'left'
          },
          {
            to: '/blog/archive', 
            label: '🗄️ 列表', 
            position: 'left'
          },
          {
            to: '/random', 
            label: '🎲 隨機', 
            position: 'left'
          },
          {
            to: '/now', 
            label: '🕒 近況', 
            position: 'left'
          },
          {
            to: '/use', 
            label: '🛠️ 愛用', 
            position: 'left'
          },
          {
            to: '/about', 
            label: '👤 關於', 
            position: 'left'
          },
          {
            to: '/search',
            label: '🔍 全站搜尋',
            position: 'right',
          },
          {
            href: 'https://github.com/Kaihchs118/', 
            // 如果你有引入 Font Awesome，可以用：
            // html: '<i class="fa-brands fa-github" style="font-size: 1.2rem"></i>',
            label: 'GitHub', 
            position: 'right'
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: '快速導覽',
            items: [
              { label: '最新貼文', to: '/blog' },
              { label: '筆記', to: '/docs' },
              { label: '列表', to: '/blog/archive' },
              { label: '隨機連結', to: '/random' },
            ],
          },
          {
            title: '個人資訊',
            items: [
              { label: '關於我', to: '/about' },
              { label: '近況', to: '/now' },
              { label: '愛用', to: '/use' },
            ],
          },
          {
            title: '社群媒體',
            items: [
              { label: 'GitHub', href: 'https://github.com/Kaihchs118/' },
              { label: 'YouTube (KAI STUDIO)', href: 'https://youtube.com/@kaistudio-621' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KAI BLOG. Built with Docusaurus.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;
