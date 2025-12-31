import { useEffect } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    // ✅ 只放「確定存在」的頁面
    /* ---------- 
    const pages = [
      '/blog',
      '/docs',
      '/',
    ];
    ---------- */

    const randomPath = pages[Math.floor(Math.random() * pages.length)];
    history.replace(withBaseUrl(randomPath));
  }, [history, withBaseUrl]);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}
