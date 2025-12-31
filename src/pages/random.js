import { useEffect } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const pages = [
      '/docs/intro',
      '/blog/first-post',
    ];

    const randomPath = pages[Math.floor(Math.random() * pages.length)];
    history.replace(withBaseUrl(randomPath));
  }, []);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}