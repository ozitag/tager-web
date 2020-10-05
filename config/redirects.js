const {STORYBOOK_REDIRECT} = require('./storybook');

function getRedirects() {
  const isProductionServer = process.env.NEXT_PUBLIC_ENV === 'production';

  const redirects = [
    /* {
       source: '/page/about',
       destination: '/about',
       permanent: true,
     },*/
  ];

  if (!isProductionServer) {
    redirects.push(STORYBOOK_REDIRECT);
  }

  return redirects;
}

module.exports = {
  getRedirects,
};
