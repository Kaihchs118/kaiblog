import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const pages = [
      '/about',
      '/sing-danger',
      '/affinity',
      '/happy-new-year',
      '/HBD',
      '/2026-tokyo-day2',
      '/2026-tokyo-day1',
      '/online-day',
      '/computwr-score',
      '/731pc',
      '/house-yt01',
      '/taipei-101-climb',
      '/web-change',
      '/new-arrange',
      '/winter-2026',
      '/daily-life-0127',
      '/macbook',
      '/test-lable',
      '/crossover-piano',
      '/yt-video-01',
      '/mac-app',
      '/go-abroad',
      '/itch.io',
      '/itch.io',
      '/index',
      '/'
    ];

    const randomPath =
      pages[Math.floor(Math.random() * pages.length)];

    history.replace(withBaseUrl(randomPath));
  }, [history, withBaseUrl]);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}
