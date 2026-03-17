import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function groupByYearMonth(posts) {
  const map = posts.reduce((acc, post) => {
    const d = new Date(post.metadata.date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    if (!acc[y]) acc[y] = {};
    if (!acc[y][m]) acc[y][m] = [];
    acc[y][m].push(post);
    return acc;
  }, {});

  return Object.keys(map)
    .sort((a, b) => b - a)
    .map(y => ({
      year: y,
      months: Object.keys(map[y])
        .sort((a, b) => b - a)
        .map(m => ({ month: m, posts: map[y][m] })),
    }));
}

export default function BlogArchivePage({ archive }) {
  const years = archive?.years
    ? archive.years.map(y => ({
        year: y.year,
        months: Object.values(
          y.posts.reduce((acc, p) => {
            const m = new Date(p.metadata.date).getMonth() + 1;
            acc[m] = acc[m] || [];
            acc[m].push(p);
            return acc;
          }, {})
        ).map((posts, i) => ({ month: i + 1, posts })),
      }))
    : groupByYearMonth(archive?.blogPosts || []);

  return (
    <Layout title="所有貼文">
      <main className="margin-vert--lg container" style={{ maxWidth: '1280px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700 }}>所有貼文</h1>

        {years.map(({ year, months }) => (
          <section key={year} className="year-block">
            <h2 className="year-title">
              {year} 年 <small>({months.reduce((s, m) => s + m.posts.length, 0)} 篇)</small>
            </h2>

            <div className="months-row">
              {months.map(({ month, posts }) => (
                <div key={month} className="month-card">
                  <h3 className="month-title">{month} 月</h3>
                  <ul className="post-items">
                    {posts.map(post => {
                      const d = new Date(post.metadata.date);
                      return (
                        <li key={post.metadata.permalink}>
                          <Link to={post.metadata.permalink}>
                            <span className="post-date">
                              {d.getMonth() + 1}月{d.getDate()}日
                            </span>
                            {post.metadata.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {/* 防止最後一排太擠的補白 */}
              <div className="spacer" />
            </div>
          </section>
        ))}
      </main>

      <style jsx>{`
        .year-block {
          margin-bottom: 3rem;
          padding: 1.5rem;
          border-radius: 12px;
          background: var(--ifm-background-color);
          border: 1px solid var(--ifm-color-emphasis-200);
        }

        .year-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 1.25rem;
          color: var(--ifm-color-primary);
        }
        .year-title small {
          font-weight: 400;
          color: var(--ifm-color-emphasis-600);
          font-size: 1rem;
        }

        .months-row {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 1.5rem;
          padding-bottom: 0.5rem;
          scroll-behavior: smooth;
        }
        .months-row::-webkit-scrollbar {
          height: 6px;
        }
        .months-row::-webkit-scrollbar-thumb {
          background: var(--ifm-color-primary-light);
          border-radius: 3px;
        }

        .month-card {
          flex: 0 0 340px;
          min-width: 300px;
          background: var(--ifm-background-surface-color);
          border: 1px solid var(--ifm-color-emphasis-200);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .month-title {
          margin: 0;
          padding: 1rem 1.25rem;
          font-size: 1.25rem;
          font-weight: 600;
          background: var(--ifm-color-emphasis-100);
          color: var(--ifm-color-primary-dark);
          border-bottom: 1px solid var(--ifm-color-emphasis-200);
        }

        .post-items {
          list-style: none;
          margin: 0;
          padding: 1rem 1.25rem;
        }
        .post-items li {
          margin: 0.75rem 0;
        }
        .post-items a {
          color: var(--ifm-font-color-base);
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }
        .post-items a:hover {
          color: var(--ifm-color-primary);
        }
        .post-date {
          display: block;
          font-size: 0.85rem;
          color: var(--ifm-color-emphasis-600);
          margin-bottom: 0.2rem;
        }

        .spacer {
          flex: 0 0 1px;
          width: 1px;
        }

        @media (max-width: 996px) {
          .months-row {
            flex-direction: column;
            overflow-x: hidden;
            gap: 1.25rem;
          }
          .month-card {
            flex: none;
            width: 100%;
            min-width: auto;
            box-shadow: none;
            border-radius: 8px