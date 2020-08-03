import path from 'path';
import serveHandler from 'serve-handler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.url = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;

  return serveHandler(req, res, {
    public: path.resolve('./storybook-static'),
    cleanUrls: false,
  });
}

export default handler;
