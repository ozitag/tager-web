import { SitemapStream, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { getOrigin } from '@tager/web-core';
import { NextApiRequest, NextApiResponse } from 'next';

const CONSTANT_PAGES: Array<{
  path: string;
  priority: number;
}> = [
  {
    path: '/',
    priority: 0.8,
  },
];

/**
 * Reference:
 * https://annacoding.com/article/10Sarw7UOPidixIhFDtnY5/How-to-generate-sitemap.xml-with-Next.js-build-in-server-and-Typescript?
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set response header
    res.setHeader('content-type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');

    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
    // The readable stream it transforms must be in object mode.
    const smStream = new SitemapStream({
      hostname: getOrigin(),
    });

    const pipeline = smStream.pipe(createGzip());
    // Add any static entries here
    CONSTANT_PAGES.forEach((page) => {
      smStream.write({
        url: page.path,
        changefreq: EnumChangefreq.WEEKLY,
      });
    });

    smStream.end();

    // cache the response
    // streamToPromise.then(sm => sitemap = sm)
    // streamToPromise(pipeline);

    // stream the response
    pipeline.pipe(res).on('error', (error) => {
      throw error;
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export default handler;
