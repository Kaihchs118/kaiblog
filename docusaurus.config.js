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
          // 編輯此頁已刪除
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          // 編輯此頁已刪除
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
        language: ["zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurusd.jpg',
      
      // 新增：公告欄（可選，如不需要可整段刪除）
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
          {to: '/blog', label: '貼文', position: 'left'},
          {to: '/docs', label: '筆記', position: 'left'},
          {to: '/blog/archive', label: '列表', position: 'left'},
          {to: '/random', label: '隨機', position: 'left'},
          {to: '/now', label: '近況', position: 'left'},
          {to: '/use', label: '愛用', position: 'left'},
          {to: '/about', label: '關於', position: 'left'},
          {to: '/blog/web-change', label: '最新文章', position: 'right'},
          {href: 'https://github.com/Kaihchs118/', label: 'GitHub', position: 'right'},
        ],
      },

      footer: {
        style: 'dark',
        links: [], // 保持簡潔
        copyright: `Copyright © ${new Date().getFullYear()} KAI BLOG.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      // 新增：側邊欄互動優化
      docs: {
        sidebar: {
          hideable: true, // 側邊欄可以手動收起
          autoCollapseCategories: true, // 自動收起不相關的分類
        },
      },
    }),
};

export default config;
