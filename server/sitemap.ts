import { SitemapStream, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { RequestHandler } from 'express';

function trimEndSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function getOrigin(): string {
  return trimEndSlash(process.env.REACT_APP_ORIGIN ?? '');
}

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
export const sitemapHandler: RequestHandler = async (req, res) => {
  if (!res) return {};
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
};

/**
 * Reference:
 * https://developers.google.com/search/reference/robots_txt
 */
export const robotsHandler: RequestHandler = (req, res) => {
  const isProduction = process.env.REACT_APP_ENV === 'production';

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
  res.send(content).status(200).end();
};
