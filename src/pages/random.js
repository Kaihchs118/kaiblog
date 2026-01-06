import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const pages = [
      '/docs',
      '/blog/house-yt01',
      '/blog/about',
      '/docs/resolve/resolvepackV1-update',
      '/docs/resolve/resolvepackV2-update',
      '/docs/Docusaurus/tabs',
      '/blog/happy-new-year',
      '/blog/HBD',
    ];

    const randomPath =
      pages[Math.floor(Math.random() * pages.length)];

    history.replace(withBaseUrl(randomPath));
  }, [history, withBaseUrl]);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}
