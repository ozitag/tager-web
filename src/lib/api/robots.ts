import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getOrigin } from '@tager/web-core';

/**
 * Reference:
 * https://developers.google.com/search/reference/robots_txt
 */
export function createRobotsHandler(): NextApiHandler {
  return async function robotsHandler(
    _req: NextApiRequest,
    res: NextApiResponse
  ) {
    const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

    const content = isProduction
      ? [
          `Sitemap: ${getOrigin()}/sitemap.xml`,
          `Host: ${getOrigin()}`,
          'User-agent: *',
          'Allow: /',
          'Disallow: /api/*',
        ].join('\n')
      : ['User-agent: *', 'Disallow: /'].join('\n');

    if (!isProduction) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive');
    }

    res.setHeader('content-type', 'text/plain');
    res.send(content);
    res.status(200).end();
  };
}
