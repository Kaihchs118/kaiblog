import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// 分組處理：年份 -> 月份
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
        months: Object.keys(monthGroups).sort((a, b) => b - a).map(m => ({ month: m, posts: monthGroups[m] }))
      };
    });
  } else if (archive && archive.blogPosts) {
    displayData = createDisplayData(archive.blogPosts);
  }

  const BLUE = '#429eee';

  return (
    <Layout title="貼文列表">
      <main className="container margin-vert--xl" style={{ maxWidth: '1100px', minHeight: '85vh' }}>
        
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '3rem', color: '#333' }}>
          貼文列表
        </h1>

        {displayData.map((yearGroup) => (
          <details key={yearGroup.year} open className="year-collapsible">
            <summary className="year-summary">
              <span style={{ color: BLUE }}>{yearGroup.year} 年</span>
              <span className="count-label">{yearGroup.months.reduce((sum, m) => sum + m.posts.length, 0)} Posts</span>
            </summary>

            {/* 月份並排區域 */}
            <div className="month-grid">
              {yearGroup.months.map((monthGroup) => (
                <details key={monthGroup.month} open className="month-card">
                  <summary className="month-summary">
                    <span className="dot" style={{ backgroundColor: BLUE }}></span>
                    {monthGroup.month} 月
                  </summary>
                  
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
                </details>
              ))}
            </div>
          </details>
        ))}
      </main>

      <style>{`
        /* 基礎設置 */
        summary { list-style: none; cursor: pointer; }
        summary::-webkit-details-marker { display: none; }
        
        /* 年份折疊樣式 */
        .year-collapsible {
          margin-bottom: 4rem;
        }
        .year-summary {
          font-size: 2.2rem;
          font-weight: 900;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 25px;
        }
        .count-label {
          font-size: 0.9rem;
          font-weight: 400;
          color: #bbb;
        }

        /* 月份網格佈局 */
        .month-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          align-items: flex-start;
        }

        /* 月份卡片式折疊 */
        .month-card {
          flex: 1 1 300px;
          min-width: 280px;
          background-color: #fafafa;
          padding: 20px;
          border-radius: 12px;
          transition: background-color 0.2s;
        }
        .month-card[open] {
          background-color: transparent;
          border: 1px solid #eee;
        }
        .month-summary {
          font-size: 1.25rem;
          font-weight: 700;
          color: #333;
          display: flex;
          align-items: center;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 12px;
        }

        /* 文章清單樣式 */
        .post-list {
          list-style: none;
          padding: 0;
          margin: 15px 0 0 20px;
        }
        .post-list li {
          margin-bottom: 15px;
        }
        .post-link {
          text-decoration: none !important;
          color: inherit !important;
          display: block;
        }
        .post-date {
          display: block;
          font-size: 0.75rem;
          color: ${BLUE};
          font-weight: 800;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
        }
        .post-title {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .post-link:hover .post-title {
          color: ${BLUE};
          text-decoration: underline;
        }

        /* 手機優化 */
        @media (max-width: 768px) {
          .month-grid { gap: 15px; }
          .month-card { 
            flex: 1 1 100%; 
            padding: 15px;
          }
          .year-summary { font-size: 1.8rem; }
        }
      `}</style>
    </Layout>
  );
}