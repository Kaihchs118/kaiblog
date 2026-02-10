---
slug: /list
title: 部落格列表
---

import BrowserOnly from '@docusaurus/BrowserOnly';

export const SafeArchive = () => {
  return (
    <BrowserOnly>
      {() => {
        // 安全地獲取全域資料
        const globalData = window?.docusaurus?.siteData?.globalData;
        const blogData = globalData?.['docusaurus-plugin-content-blog']?.default;

        if (!blogData || !blogData.blogPosts) {
          return <p>⚠️ 正在搜尋部落格資料，請稍候或重新整理...</p>;
        }

        const posts = blogData.blogPosts;

        // 按年月分組邏輯
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
                <summary style={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '12px 0', color: '#25c2a0'}}>
                  ▼ {month} ({groups[month].length} 篇)
                </summary>
                <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
                  {groups[month].map(post => (
                    <li key={post.metadata.permalink} style={{margin: '15px 0'}}>
                      <a href={post.metadata.permalink} style={{textDecoration: 'none', display: 'flex', alignItems: 'baseline'}}>
                         <span style={{color: '#888', marginRight: '15px', fontSize: '0.9rem', minWidth: '45px'}}>
                           {new Date(post.metadata.date).getDate()}日
                         </span>
                         <span style={{fontWeight: '500'}}>{post.metadata.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        );
      }}
    </BrowserOnly>
  );
};

<SafeArchive />
