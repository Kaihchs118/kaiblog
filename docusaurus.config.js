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
  tagline: 'KAI 部落格',  // 副標（首頁標語）
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

  url: 'https://kaihchs118.github.io', // GitHub Pages 的使用者頁面
  baseUrl: '/kaiblog/',                // Repo 名稱（一定要有斜線）

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
    defaultLocale: 'en',
    locales: ['en'],
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
   * 主題與 UI 設定
   * ======================== */

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg', // 社群分享圖

      /* ---------- 明暗模式 ---------- */
      colorMode: {
        respectPrefersColorScheme: true, // 跟隨系統亮/暗色
      },

      /* ---------- 導覽列（上方） ---------- */
      navbar: {
        title: 'KAI BLOG',
        logo: {
          alt: 'My Site Logo',
          src: 'img/channels4_profile.jpg',
        },
        items: [
          // 📘 文件（/docs）
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },

          // 📰 部落格（/blog）
          {to: '/blog', label: '文章', position: 'left'},

          // 👤 關於頁面（/about）
          // 👉 這是「Pages」功能，對應 src/pages/about.md
          {to: '/about', label: '關於', position: 'left'},

          // GitHub 連結
          {
            href: 'https://github.com/Kaihchs118/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      /* ---------- 頁尾 ---------- */
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Tutorial', to: '/docs/intro'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'Youtube', href: 'https://www.youtube.com/@kaistudio-621'},
              {label: 'Discord', href: 'https://discordapp.com/invite/docusaurus'},
              {label: 'X', href: 'https://x.com/docusaurus'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: '文章', to: '/blog'},
              {label: 'GitHub', href: 'https://github.com/Kaihchs118/'},
            ],
          },
        ],
        copyright:
          `Copyright © ${new Date().getFullYear()} My Project.`,
      },

      /* ---------- 程式碼高亮 ---------- */
      prism: {
        theme: prismThemes.github,      // 亮色主題
        darkTheme: prismThemes.dracula, // 暗色主題
      },
    }),
};

export default config;