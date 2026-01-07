// @ts-check
// 啟用 TypeScript 型別檢查（即使是 JS 檔）
// 好處：編輯器會提示錯誤、補全設定選項

import {themes as prismThemes} from 'prism-react-renderer';

// ⚠️ 這支檔案是在 Node.js 執行
// 不可以使用瀏覽器 API（例如 window、document）

/** @type {import('@docusaurus/types').Config} */
const config = {
  /* ========================
   * 站台基本資訊
   * ======================== */

  title: 'KAI BLOG',              // 網站標題（顯示在瀏覽器分頁）
  //tagline: 'KAI 部落格',   副標（首頁標語）
  favicon: 'img/channels4_profile.jpg',    // 網站 favicon

  /* ========================
   * 未來版本設定
   * ======================== */

  future: {
    v4: true, // 提前啟用 Docusaurus v4 相容模式
  },

  /* ========================
   * 部署網址設定（GitHub Pages）
   * ======================== */

  url: 'https://kaiblog.is-a.dev', // GitHub Pages 的使用者頁面
  baseUrl: '/',                // Repo 名稱（一定要有斜線）

  organizationName: 'kaihchs118', // GitHub 使用者或組織名稱
  projectName: 'kaiblog',         // GitHub repository 名稱

  /* ========================
   * 連結錯誤處理
   * ======================== */

  onBrokenLinks: 'throw', // 有壞連結就直接 build 失敗（嚴格模式）

  /* ========================
   * 語系設定（目前只用英文）
   * 之後要中文可再加 zh-Hant
   * ======================== */

  i18n: {
  defaultLocale: 'zh-Hant',
  locales: ['zh-Hant'],
  localeConfigs: {
    'zh-Hant': {
      label: '繁體中文',
      htmlLang: 'zh-Hant',
    },
  },
},


  /* ========================
   * 預設功能模組（Classic）
   * ======================== */

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        /* ---------- 文件系統（/docs） ---------- */
        docs: {
          sidebarPath: './sidebars.js', // 側邊欄設定檔
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },

        /* ---------- 部落格系統（/blog） ---------- */
        blog: {
          showReadingTime: true, // 顯示閱讀時間
          feedOptions: {
            type: ['rss', 'atom'], // RSS / Atom 訂閱
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        /* ---------- 主題設定 ---------- */
        theme: {
          customCss: './src/css/custom.css', // 自訂 CSS
        },
      }),
    ],
  ],

/* ========================
   * 插件區！搜尋功能
   * ======================== */

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
  /* ========================
   * 主題與 UI 設定
   * ======================== */

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg', // 社群分享圖

      /* ---------- 明暗模式 ---------- */
      colorMode: {
        respectPrefersColorScheme: false, // 跟隨系統亮/暗色
      },

      /* ---------- 導覽列（上方） ---------- */
      navbar: {
        title: 'KAI BLOG',
        logo: {
          alt: 'My Site Logo',
          src: 'img/channels4_profile.jpg',
        },
        items: [
          /* ----------
          // 📘 文件（/docs）
        {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '筆記',
          },
---------- */

          // 📰 部落格（/blog）
          {to: '/blog', label: '貼文', position: 'left'},

          // 📔 筆記（/docs）
          {to: '/docs', label: '筆記', position: 'left'},

   
          // 📔 隨機（/random）
          {to: '/blog/archive', label: '列表', position: 'left'},               
          {
            label: '隨機',
            to: '/random',
            position: 'left',
          },          
          // 🥶 近況（/now）
          {to: '/now', label: '近況', position: 'left'},


          // 📔 愛用（/use）
          {to: '/use', label: '愛用', position: 'left'},       


          // 👤 關於頁面（/about）
          // 👉 這是「Pages」功能，對應 src/pages/about.md
          {to: '/about', label: '關於', position: 'left'},

          // 🥶 近況（/now）
          {to: '/blog/web-change', label: '最新文章', position: 'right'},

          // GitHub 連結
          {
            href: 'https://github.com/Kaihchs118/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      /* =============================
 * 頁尾（Footer）設定
 * 目前僅顯示版權資訊
 * 其他區塊先註解保留，未來再啟用
 * ============================= */
footer: {
  // 頁尾樣式：dark = 深色底
  style: 'dark',

  // 頁尾連結區（目前不使用，保持空陣列）
  links: [
    /*
    =============================
    以下為未來可用的頁尾區塊範例
    目前全部停用（註解）
    =============================

    {
      title: 'Docs',
      items: [
        { label: '教學', to: '/docs/intro' },
      ],
    },

    {
      title: 'Community',
      items: [
        { label: 'YouTube', href: 'https://www.youtube.com/@kaistudio-621' },
        { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
        { label: 'X（Twitter）', href: 'https://x.com/docusaurus' },
      ],
    },

    {
      title: 'More',
      items: [
        { label: '文章', to: '/blog' },
        { label: 'GitHub', href: 'https://github.com/Kaihchs118/' },
      ],
    },
    */
  ],

  // 頁尾最底下的版權文字（會自動顯示當前年份）
  copyright:
    `Copyright © ${new Date().getFullYear()} KAI BLOG.`,
},
      /* ---------- 程式碼高亮 ---------- */
      prism: {
        theme: prismThemes.github,      // 亮色主題
        darkTheme: prismThemes.dracula, // 暗色主題
      },
    }),
};

export default config;