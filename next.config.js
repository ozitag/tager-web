const withPlugins = require('next-compose-plugins');

const {
  supportSvg,
  supportImages,
  supportPolyfills,
  supportSentry,
  supportCaseSensitivePathsCheck,
  supportDisableScSpeedy,
} = require('./config/webpack');
const { getRewrites } = require('./config/rewrites');
const { getRedirects } = require('./config/redirects');

module.exports = withPlugins([], {
  swcMinify: true,
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  poweredByHeader: false,
  async rewrites() {
    return getRewrites();
  },
  async redirects() {
    return getRedirects();
  },
  webpack: (config, options) => {
    supportSvg(config, options);
    supportImages(config, options);
    supportPolyfills(config, options);
    supportSentry(config, options);
    supportCaseSensitivePathsCheck(config, options);
    supportDisableScSpeedy(config, options);

    return config;
  },
});
