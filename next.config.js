const path = require('path');
const fse = require('fs-extra');
const withPlugins = require('next-compose-plugins');
const getClientEnvironment = require('./env');

/** Get paths aliases from "tsconfig.json" file. */
function getAliasesFromTsConfig() {
  const tsconfig = fse.readJsonSync(path.join(__dirname, 'tsconfig.json'));
  return Object.entries(tsconfig.compilerOptions.paths).reduce(
    (map, [key, value]) => {
      // @components/* => components
      const module = key.slice(1, -2);

      map[`@${module}`] = path.resolve(__dirname, 'src', module);
      return map;
    },
    {},
  );
}

const customAliases = getAliasesFromTsConfig();

/** Get environment variables to inject into our app. */
const env = getClientEnvironment();

module.exports = withPlugins([], {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    /** Support TS path aliases */
    config.resolve.alias = {
      ...config.resolve.alias,
      ...customAliases,
    };

    /** Support import svg as React component */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack?-svgo,+titleProp,+ref![path]', 'url-loader'],
    });

    /**
     * Fonts loader
     * Next.js can find font urls in css file and include them in build automatically.
     * So we don't need any extra config
     */
    // config.module.rules.push({
    //   test: /\.(woff|woff2|eot|ttf|otf)$/,
    //   use: {
    //     loader: 'file-loader',
    //     options: {
    //       name: '[name].[ext]',
    //       publicPath: `/_next/static/fonts/`,
    //       outputPath: `${isServer ? '../' : ''}static/fonts/`,
    //     },
    //   },
    // });

    /** Images loader */
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: 8192,
            name: '[name]-[contenthash].[ext]',
            publicPath: `/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
          },
        },
      ],
    });

    /**
     * Source - create-react-app/react-scripts v3.3.0
     * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
     */
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    config.plugins.push(new webpack.DefinePlugin(env.stringified));

    /**
     * How to add polyfills in Next.js
     * Source: https://github.com/zeit/next.js/tree/canary/examples/with-polyfills
     */
    // const originalEntry = config.entry;
    // config.entry = async () => {
    //   const entries = await originalEntry();
    //
    //   if (
    //     entries['main.js'] &&
    //     !entries['main.js'].includes('./polyfills/index.js')
    //   ) {
    //     entries['main.js'].unshift('./polyfills/index.js')
    //   }
    //
    //   return entries
    // };

    return config;
  },
});
