// @ts-check
// 開啟 TypeScript 型別檢查（就算是 JS 檔也能提示錯誤）

import { themes as prismThemes } from 'prism-react-renderer';
// 引入程式碼高亮主題（用在 prism）

/** @type {import('@docusaurus/types').Config} */
const config = {

  /* ================= 基本網站資訊 ================= */

  title: 'KAI BLOG',                // 網站標題（左上角 + 瀏覽器標題）
  tagline: '紀錄學習、剪輯與技術',   // 副標（SEO 用）
  favicon: 'img/favicon.ico',       // 網站小圖示

  future: {
    v4: true,                       // 提前相容未來 Docusaurus v4
  },

  /* ================= GitHub Pages 設定 ================= */

  url: 'https://kaihchs118.github.io', // 你的 GitHub Pages 網域（不能有子路徑）
  baseUrl: '/',                // Repo 名稱，一定要前後 /

  organizationName: 'Kaihchs118',      // GitHub 使用者名稱
  projectName: 'kaiblog',              // Repo 名稱（⚠️不要有空白）

  /* ================= 錯誤處理 ================= */

  onBrokenLinks: 'throw',              // 連結壞掉就直接報錯
  onBrokenMarkdownLinks: 'warn',       // Markdown 壞連結只警告

  /* ================= 語言設定 ================= */

  i18n: {
    defaultLocale: 'zh-Hant',          // 預設語言：繁體中文
    locales: ['zh-Hant'],              // 可用語言列表
  },

  /* ================= 外掛（搜尋功能在這） ================= */

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,               // 搜尋 Docs
        indexBlog: true,               // 搜尋 Blog
        indexPages: true,              // 搜尋 pages（包含 /random）
        language: ['zh', 'en'],        // 支援中英文
        highlightSearchTermsOnTargetPage: true, // 點進去會高亮關鍵字
      },
    ],
  ],

  /* ================= 額外主題 ================= */

  themes: [
    require.resolve('@docusaurus/theme-live-codeblock'),
    // 讓你可以用互動式程式碼區塊（之後教你玩）
  ],

  /* ================= 預設功能（classic） ================= */

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // 指定側邊欄設定檔
        },
        blog: {
          showReadingTime: true,       // 顯示閱讀時間
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          // 自訂 CSS
        },
      },
    ],
  ],

  /* ================= 外觀設定 ================= */

  themeConfig: {

    image: 'img/docusaurus-social-card.jpg', // 社群分享圖

    colorMode: {
      respectPrefersColorScheme: false, // 跟隨系統深色 / 淺色
    },

    /* ---------- 上方導覽列 ---------- */
    navbar: {
      title: 'KAI BLOG',
      logo: {
        alt: 'KAI BLOG Logo',
        src: 'img/channels4_profile.jpg',
      },
      items: [
        { to: '/about', label: '關於', position: 'left' },
        { to: '/docs', label: '文件', position: 'left' },
        { to: '/blog', label: '文章', position: 'left' },
        { to: '/random', label: '隨機', position: 'left' },
        {
          href: 'https://github.com/Kaihchs118',
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
          title: '內容',
          items: [
            { label: '文件', to: '/docs' },
            { label: '文章', to: '/blog' },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Kaihchs118',
            },
          ],
        },
      ],
      copyright:
        `Copyright © ${new Date().getFullYear()} KAI BLOG`,
    },

    /* ---------- 程式碼高亮 ---------- */
    prism: {
      theme: prismThemes.github,       // 淺色主題
      darkTheme: prismThemes.dracula,  // 深色主題
    },
  },
};

export default config;