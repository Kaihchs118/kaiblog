import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const pages = [
      '/docs',
      '/kaiblog/blog/house-yt01',
      '/kaiblog/blog/about',
    ];

    const randomPath =
      pages[Math.floor(Math.random() * pages.length)];

    history.replace(withBaseUrl(randomPath));
  }, [history, withBaseUrl]);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}
