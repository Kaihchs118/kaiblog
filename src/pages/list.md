---
slug: /list
title: 部落格列表
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import {useGlobalData} from '@docusaurus/useGlobalData';

export const ArchiveManager = () => {
  const globalData = useGlobalData();
  // 這裡自動尋找你的部落格插件數據
  const blogData = globalData['docusaurus-plugin-content-blog']?.default;

  if (!blogData) {
    return <p>找不到部落格數據，請確認插件配置。</p>;
  }

  const posts = blogData.blogPosts;

  // 按月份分組邏輯
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
        <details key={month} style={{marginBottom: '1rem', borderBottom: '1px solid #eee'}} open>
          <summary style={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '10px 0', color: '#25c2a0'}}>
            ▼ {month} ({groups[month].length} 篇)
          </summary>
          <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
            {groups[month].map(post => (
              <li key={post.metadata.permalink} style={{margin: '12px 0'}}>
                <a href={post.metadata.permalink} style={{textDecoration: 'none'}}>
                   <span style={{color: '#888', marginRight: '10px'}}>
                     {new Date(post.metadata.date).getDate()}日
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

<BrowserOnly>
  {() => <ArchiveManager />}
</BrowserOnly>
