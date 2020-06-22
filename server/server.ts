import path from 'path';
import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';

import nextI18next from './i18n';
import { robotsHandler, sitemapHandler } from './sitemap';
import config from './config';

function parsePort(value: string | undefined): number | null {
  if (!value) return null;

  const parsedValue = Number.parseInt(value);

  return Number.isNaN(parsedValue) ? null : parsedValue;
}

/** yarn start -p 3001 */
function getPortFromArgs(): number | null {
  const portArgIndex = process.argv.indexOf('-p');
  const portArgValue =
    portArgIndex !== -1 ? process.argv[portArgIndex + 1] : undefined;

  return parsePort(portArgValue);
}

const port = parsePort(process.env.PORT) || getPortFromArgs() || 3000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const redirectMiddleware: express.Handler = (req, res, next) => {
  const trimmedPath = req.path.endsWith('/') ? req.path.slice(0, -1) : req.path;
  const location = config.redirectMap.get(trimmedPath);

  if (location) {
    res.redirect(location);
  } else {
    next();
  }
};

function startServer() {
  app.prepare().then(() => {
    const server = express();

    const isProductionServer = process.env.NEXT_PUBLIC_ENV === 'production';

    if (!isProductionServer) {
      server.use(
        '/storybook',
        express.static(path.resolve(__dirname, '..', 'storybook-static'))
      );
    }

    server.get('/sitemap.xml', sitemapHandler);
    server.get('/robots.txt', robotsHandler);

    server.use(redirectMiddleware);
    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, () =>
      console.log(`> Ready on http://localhost:${port}`)
    );
  });
}

export default startServer;
