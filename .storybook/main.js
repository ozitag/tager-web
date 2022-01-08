const path = require('path');
const svgr = require('@svgr/rollup');

function resolvePath(filePath) {
  return path.resolve(__dirname, '..', filePath);
}

module.exports = {
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: async (config) => {
    config.resolve.alias = [
      /** Support TS path aliases */
      { find: /@\/(.+)/, replacement: resolvePath('src/$1') },
      /**
       * Support importing css files from `node_modules` via `~`.
       * e.g. `@import "~normalize.css";`
       */
      {
        find: /^~(.+)/,
        replacement: resolvePath('node_modules/$1'),
      },
    ];

    /**
     * Hack to fix import of next.js router utils
     */
    config.define = {
      ...config.define,
      __dirname: JSON.stringify(__dirname),
    };

    config.plugins = [
      ...config.plugins,
      svgr({
        svgo: false,
        titleProp: true,
        ref: true,
      }),
    ];

    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite',
  },
};
