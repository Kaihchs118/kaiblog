import React from 'react';
import SearchPage from '@theme-original/SearchPage';

import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

export default function SearchPageWrapper(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q');

  return (
    <div className="custom_search_page">
      <SearchPage {...props} />
      
      {!q && (
        <div className="container margin-vert--lg recommended_section">
          <h3>✨ 推薦探索 (Recommended)</h3>
          <div className="recommended_grid">
            <Link to="/blog" className="recommended_card">
              <span className="recommended_icon">📝</span>
              <div>
                <h4>熱門貼文</h4>
                <p>查看最新的生活與開發心得</p>
              </div>
            </Link>
            <Link to="/docs" className="recommended_card">
              <span className="recommended_icon">📚</span>
              <div>
                <h4>技術筆記</h4>
                <p>深入淺出的開發經驗筆記</p>
              </div>
            </Link>
            <Link to="/random" className="recommended_card">
              <span className="recommended_icon">🎲</span>
              <div>
                <h4>試試手氣</h4>
                <p>隨機閱讀一篇有趣文章</p>
              </div>
            </Link>
            <Link to="/about" className="recommended_card">
              <span className="recommended_icon">👤</span>
              <div>
                <h4>關於 KAI</h4>
                <p>了解作者的故事與背景</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
