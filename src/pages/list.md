---
slug: /list
title: 部落格列表
---

import {usePluginData} from '@docusaurus/useGlobalData';

export const AutoArchive = () => {
  // 1. 自動從 Docusaurus 插件系統抓取所有部落格文章資料
  const blogData = usePluginData('docusaurus-plugin-content-blog');
  
  if (!blogData || !blogData.assets || !blogData.assets.blogPosts) {
    return <p>正在載入文章列表...</p>;
  }

  const posts = blogData.assets.blogPosts;

  // 2. 按年份與月份進行邏輯分組
  const groups = posts.reduce((acc, post) => {
    const date = new Date(post.metadata.date);
    const yearMonth = `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
    if (!acc[yearMonth]) acc[yearMonth] = [];
    acc[key = yearMonth] = [...acc[yearMonth], post];
    return acc;
  }, {});

  // 3. 排序月份（新的在前）
  const months = Object.keys(groups).sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));

  return (
    <div>
      {months.map(month => (
        <details key={month} style={{marginBottom: '1rem', borderBottom: '1px solid #eee'}} open>
          <summary style={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '10px 0', color: '#25c2a0'}}>
            {month} ({groups[month].length} 篇)
          </summary>
          <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
            {groups[month].map(post => (
              <li key={post.metadata.permalink} style={{margin: '12px 0'}}>
                <a href={post.metadata.permalink} style={{textDecoration: 'none'}}>
                   <span style={{color: '#888', marginRight: '10px'}}>
                     {new Date(post.metadata.date).getDate().toString().padStart(2, '0')}日
                   </span>
                   {post.metadata.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};

<AutoArchive />
