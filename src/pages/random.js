import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
// 導入 Docusaurus 自動生成的路由配置，達成完全自動化
import generatedRoutes from '@generated/routes';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    // 1. 自動提取所有有效路徑
    const allPaths = generatedRoutes
      .map(route => route.path)
      .filter(path => 
        path !== '/' &&                // 排除首頁
        path !== '/404.html' &&        // 排除 404
        !path.includes('tags') &&      // 排除標籤彙整頁
        !path.includes('search') && 
        !path.includes('*') &&   // 排除*頁
        !path.includes('author') && 
        !path.includes('/about') && 
        !path.includes('/love) && 
        !path.includes('/__docusaurus/')    // 排除/__docusaurus/頁
      );

    // 2. 隨機選取一個路徑
    if (allPaths.length > 0) {
      const randomPath = allPaths[Math.floor(Math.random() * allPaths.length)];
      
      // 稍微延遲一點點時間（例如 100ms），讓使用者看得到跳轉動畫，體驗更好
      const timer = setTimeout(() => {
        history.replace(withBaseUrl(randomPath));
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsRedirecting(false);
    }
  }, [history, withBaseUrl]);

  return (
    <Layout title="隨機跳轉中...">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh', // 讓內容居中，佔據畫面一半高度
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🎲 正在跳轉到隨機頁面...
        </h1>
        <p style={{ color: 'var(--ifm-color-emphasis-600)' }}>
          請稍候，正在為您從所有文章中隨機挑選精選內容。
        </p>
        <h4 style={{ color: '#ff0000' }}>
          如果網頁當機的話，請重新載入
        </h4>
        
        {/* 加載動畫（選配，CSS 效果） */}
        <div className="loading-dots">
          <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>

        {!isRedirecting && (
          <p style={{ color: 'red' }}>找不到可以跳轉的頁面，請確認內容是否存在。</p>
        )}
      </div>

      <style jsx>{`
        .loading-dots {
          font-size: 2.5rem;
          font-weight: bold;
          color: #429eee;
        }
        .dot {
          animation: blink 1s infinite;
          margin: 0 2px;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </Layout>
  );
}

