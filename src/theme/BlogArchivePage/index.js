import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function BlogArchivePage({archive}) {
  // 將文章按「月/日」分組排序
  const posts = archive.blogPosts;

  return (
    <Layout title="部落格列表">
      <main className="container margin-vert--lg">
        <h1>部落格列表</h1>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {posts.map((post) => {
            const date = new Date(post.metadata.date);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            
            return (
              <li key={post.metadata.permalink} style={{ marginBottom: '10px' }}>
                <Link to={post.metadata.permalink}>
                  {`${month}月${day}日`} - {post.metadata.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
}
