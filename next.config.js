const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps')();

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

module.exports = withPlugins(
  [
    /**
     * Use the hidden-source-map option when you don't want the source maps to be
     * publicly available on the servers, only to the error reporting
     */
    withSourceMaps,
  ],
  {
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
  }
);
