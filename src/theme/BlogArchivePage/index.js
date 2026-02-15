import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function createDisplayData(posts) {
  const groups = posts.reduce((acc, post) => {
    const d = new Date(post.metadata.date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(post);
    return acc;
  }, {});

  return Object.keys(groups).sort((a, b) => b - a).map(year => ({
    year,
    months: Object.keys(groups[year]).sort((a, b) => b - a).map(month => ({
      month,
      posts: groups[year][month]
    }))
  }));
}

export default function BlogArchivePage(props) {
  const archive = props.archive;
  let displayData = [];

  if (archive && archive.years) {
    displayData = archive.years.map(y => {
      const monthGroups = y.posts.reduce((acc, p) => {
        const m = new Date(p.metadata.date).getMonth() + 1;
        if (!acc[m]) acc[m] = [];
        acc[m].push(p);
        return acc;
      }, {});
      return {
        year: y.year,
        months: Object.keys(monthGroups).sort((a, b) => b - a).map(m => ({
          month: m,
          posts: monthGroups[m]
        }))
      };
    });
  } else if (archive && archive.blogPosts) {
    displayData = createDisplayData(archive.blogPosts);
  }

  const BLUE = '#429eee';
  const LIGHT_BLUE_BG = 'rgba(66, 158, 238, 0.05)';

  return (
    <Layout title="貼文列表">
      <main className="container margin-vert--xl" style={{ maxWidth: '1200px', minHeight: '85vh' }}>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2.5rem' }}>貼文列表</h1>

        {displayData.map((yearGroup) => (
          <details key={yearGroup.year} className="year-wrapper" open>
            <summary className="year-header">
              <span className="year-title" style={{ color: BLUE }}>{yearGroup.year} 年</span>
              <div className="year-info">
                <span className="count-label">{yearGroup.months.reduce((sum, m) => sum + m.posts.length, 0)} Posts</span>
                <span className="year-arrow">▼</span>
              </div>
            </summary>

            <div className="month-grid-container">
              {yearGroup.months.map((monthGroup) => (
                <details key={monthGroup.month} open className="month-card">
                  <summary className="month-summary">
                    <span className="dot" style={{ backgroundColor: BLUE }}></span>
                    {monthGroup.month} 月
                    <span className="month-arrow">▼</span>
                  </summary>
                  
                  <div className="post-list-content">
                    <ul className="post-list">
                      {monthGroup.posts.map((post) => {
                        const dateObj = new Date(post.metadata.date);
                        return (
                          <li key={post.metadata.permalink}>
                            <Link to={post.metadata.permalink} className="post-link">
                              <span className="post-date">{dateObj.getMonth() + 1}月{dateObj.getDate()}日</span>
                              <span className="post-title">{post.metadata.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </details>
              ))}
              {/* 桌面版右側留白補丁 */}
              <div className="scroll-spacer"></div>
            </div>
          </details>
        ))}
      </main>

      <style>{`
        /* 年份外殼 */
        .year-wrapper {
          margin-bottom: 3.5rem;
          border: 1px solid var(--ifm-border-color);
          border-radius: 16px;
          overflow: hidden;
          background: var(--ifm-background-surface-color);
        }
        
        .year-header {
          list-style: none;
          cursor: pointer;
          padding: 22px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--ifm-color-emphasis-100);
          border-bottom: 1px solid var(--ifm-border-color);
        }
        .year-header::-webkit-details-marker { display: none; }
        .year-title { font-size: 2rem; font-weight: 900; }
        .year-info { display: flex; align-items: center; gap: 15px; }
        .year-arrow { font-size: 1rem; opacity: 0.3; transition: 0.3s; }
        .year-wrapper[open] .year-arrow { transform: rotate(180deg); }

        /* --- 核心：預設為電腦版橫向滾動 --- */
        .month-grid-container {
          display: flex;
          flex-direction: row; /* 橫向 */
          flex-wrap: nowrap;
          overflow-x: auto;
          padding: 35px 30px;
          gap: 25px;
          background-color: ${LIGHT_BLUE_BG};
          scroll-behavior: smooth;
        }
        
        .scroll-spacer { min-width: 10px; display: block; }

        .month-card {
          flex: 0 0 340px; /* 固定寬度 */
          background: var(--ifm-background-surface-color);
          border: 1px solid var(--ifm-border-color);
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          height: fit-content;
        }

        /* --- 手機版適應 (螢幕小於 768px) --- */
        @media (max-width: 768px) {
          .month-grid-container {
            flex-direction: column; /* 改為上下堆疊 */
            overflow-x: hidden;     /* 關閉橫向滾動 */
            padding: 20px 15px;     /* 縮減內距 */
          }
          
          .month-card {
            flex: 1 1 auto;         /* 寬度填滿 */
            width: 100%;
          }

          .scroll-spacer { display: none; }
          .year-header { padding: 15px 20px; }
          .year-title { font-size: 1.6rem; }
        }

        /* 滾動條樣式 */
        .month-grid-container::-webkit-scrollbar { height: 8px; }
        .month-grid-container::-webkit-scrollbar-thumb { 
          background: ${BLUE}; 
          border-radius: 10px;
        }

        /* 其他元件樣式 */
        .month-summary {
          list-style: none;
          cursor: pointer;
          padding: 18px 20px;
          font-weight: 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
        }
        .month-card[open] .month-summary { border-bottom: 1px solid var(--ifm-border-color); }
        .month-summary::-webkit-details-marker { display: none; }
        .dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 12px; }
        .month-arrow { margin-left: auto; font-size: 0.8rem; opacity: 0.2; transition: 0.3s; }
        .month-card[open] .month-arrow { transform: rotate(180deg); }

        .post-list-content { padding: 20px; }
        .post-list { list-style: none; padding: 0; margin: 0; }
        .post-list li { margin-bottom: 15px; }
        .post-link { text-decoration: none !important; color: var(--ifm-font-color-base) !important; }
        .post-date { display: block; font-size: 0.8rem; color: ${BLUE}; font-weight: 800; margin-bottom: 4px; }
        .post-title { font-size: 1rem; line-height: 1.5; }
      `}</style>
    </Layout>
  );
}