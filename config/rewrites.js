const { STORYBOOK_REWRITE } = require('./storybook');

function getRewrites() {
  const isProductionServer = process.env.NEXT_PUBLIC_ENV === 'production';

  const rewrites = [
    {
      source: `/sitemap.xml`,
      destination: `/api/sitemap`,
    },
    {
      source: `/robots.txt`,
      destination: `/api/robots`,
    },
  ];

  if (!isProductionServer) {
    rewrites.push(STORYBOOK_REWRITE);
  }

  return rewrites;
}

module.exports = {
  getRewrites,
};
