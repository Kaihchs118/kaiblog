---
slug: archive
title: 部落格列表
---

import {usePluginData} from '@docusaurus/useGlobalData';

export const ArchiveList = () => {
  // 獲取所有部落格文章數據
  const blogData = usePluginData('docusaurus-plugin-content-blog');
  const posts = blogData.assets.blogPosts;

  // 按年份月份分組
  const groups = posts.reduce((acc, post) => {
    const date = new Date(post.metadata.date);
    const key = `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  const months = Object.keys(groups).sort().reverse();

  return (
    <div>
      {months.map(month => (
        <details key={month} style={{marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}} open>
          <summary style={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '0.5rem 0'}}>
            {month} ({groups[month].length} 篇)
          </summary>
          <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
            {groups[month].map(post => (
              <li key={post.metadata.permalink} style={{margin: '10px 0'}}>
                <a href={post.metadata.permalink}>
                   {new Date(post.metadata.date).getMonth() + 1}月{new Date(post.metadata.date).getDate()}日 - {post.metadata.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};

<ArchiveList />
