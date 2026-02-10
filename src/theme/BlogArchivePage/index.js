import React from 'react';
import Layout from '@theme/Layout';
import Link from '@theme/Link';

export default function BlogArchivePage({archive}) {
  // 1. 將文章按年份與月份分組
  const postsByMonth = archive.blogPosts.reduce((acc, post) => {
    const date = new Date(post.metadata.date);
    const yearMonth = `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(post);
    return acc;
  }, {});

  // 2. 取得排序後的月份清單（最新月份在最上面）
  const months = Object.keys(postsByMonth).sort().reverse();

  return (
    <Layout title="內容封存">
      <main className="container margin-vert--lg">
        <h1>部落格列表</h1>
        
        {months.map((month) => (
          <details key={month} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }} open>
            <summary style={{ fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', outline: 'none', listStyle: 'none' }}>
              ▶ {month} ({postsByMonth[month].length} 篇)
            </summary>
            
            <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem', marginTop: '1rem' }}>
              {postsByMonth[month].map((post) => {
                const date = new Date(post.metadata.date);
                const displayDate = `${date.getMonth() + 1}月${date.getDate()}日`;
                return (
                  <li key={post.metadata.permalink} style={{ marginBottom: '0.8rem' }}>
                    <Link to={post.metadata.permalink}>
                      {displayDate} - {post.metadata.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </main>
    </Layout>
  );
}
