import path from 'path';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import serveHandler from 'serve-handler';

export function createStorybookHandler(): NextApiHandler {
  return async function storybookHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    req.url = Array.isArray(req.query.slug)
      ? req.query.slug[0]
      : req.query.slug;

    return serveHandler(req, res, {
      public: path.resolve('./storybook-static'),
      cleanUrls: false,
    });
  };
}
