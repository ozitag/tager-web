import { createGzip } from 'zlib';

import { NextApiHandler } from 'next';
import { SitemapItemLoose, SitemapStream } from 'sitemap';

import { getOrigin } from '@tager/web-core';

export type SitemapItemType = SitemapItemLoose;

/**
 * Reference:
 * https://annacoding.com/article/10Sarw7UOPidixIhFDtnY5/How-to-generate-sitemap.xml-with-Next.js-build-in-server-and-Typescript?
 */
export function createSitemapHandler(options: {
  getSitemapItemList?: () => Promise<Array<SitemapItemType>>;
}): NextApiHandler {
  return async function sitemapHandler(_req, res) {
    try {
      // Set response header
      res.setHeader('content-type', 'application/xml');
      res.setHeader('content-encoding', 'gzip');

      // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
      // The readable stream it transforms must be in object mode.
      const smStream = new SitemapStream({
        hostname: getOrigin(),
      });

      const pipeline = smStream.pipe(createGzip());

      const sitemapItemList = await (options.getSitemapItemList
        ? options.getSitemapItemList()
        : Promise.resolve([]));

      sitemapItemList.forEach((sitemapItem) => {
        smStream.write(sitemapItem);
      });

      smStream.end();

      // cache the response
      // streamToPromise.then(sm => sitemap = sm)
      // streamToPromise(pipeline);

      // stream the response
      pipeline.pipe(res).on('error', (error: any) => {
        throw error;
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  };
}
