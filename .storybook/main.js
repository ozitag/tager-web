const {
  addNodeUtilFallback,
  supportPathAlias,
  supportSvgAsReactComponents,
} = require('./webpack-config-overrides');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  addons: ['@storybook/addon-essentials'],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    supportPathAlias(config);
    addNodeUtilFallback(config);
    supportSvgAsReactComponents(config);

    return config;
  },
};
