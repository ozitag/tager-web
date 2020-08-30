import { EnumChangefreq } from 'sitemap';

import { createSitemapHandler } from '@/lib/api/sitemap';

export default createSitemapHandler({
  async getSitemapItemList() {
    return [
      {
        url: '/',
        priority: 0.8,
        changefreq: EnumChangefreq.WEEKLY,
      },
    ];
  },
});
