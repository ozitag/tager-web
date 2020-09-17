const { STORYBOOK_REDIRECT } = require('./storybook');

function getRedirects() {
  const isProductionServer = process.env.NEXT_PUBLIC_ENV === 'production';

  const redirects = [
    {
      source: '/page/about',
      destination: '/about',
      permanent: true,
    },
    {
      source: '/page/rules',
      destination: '/rules',
      permanent: true,
    },
    {
      source: '/page/terms',
      destination: '/terms',
      permanent: true,
    },
    {
      source: '/page/doing',
      destination: '/iz-chego-sostoit-uborka',
      permanent: true,
    },
    {
      source: '/page/career',
      destination: '/career',
      permanent: true,
    },
    {
      source: '/profile',
      destination: '/dashboard',
      permanent: true,
    },
    {
      source: '/profile/orders',
      destination: '/dashboard',
      permanent: true,
    },
    {
      source: '/profile/settings',
      destination: '/dashboard/settings',
      permanent: true,
    },
  ];

  if (!isProductionServer) {
    redirects.push(STORYBOOK_REDIRECT);
  }

  return redirects;
}

module.exports = {
  getRedirects,
};
