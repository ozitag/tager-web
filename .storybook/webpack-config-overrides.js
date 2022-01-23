const path = require('path');

/** Support TS path aliases */
function supportPathAlias(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src/'),
  };
}

function addNodeUtilFallback(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: false,
  };
}

/** Support import svg as React component */
function supportSvgAsReactComponents(config) {
  /** Fix built-in svg loader */
  const builtInSvgRule = config.module.rules.find((rule) =>
    rule.test.toString().includes('svg')
  );

  /**
   * Reference: {@link https://github.com/storybookjs/storybook/blob/v6.4.14/lib/builder-webpack5/src/preview/base-webpack.config.ts#L61}
   */
  builtInSvgRule.test =
    /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

  /** Add custom svg loader */
  config.module.rules.push({
    test: /\.svg$/i,
    oneOf: [
      {
        type: 'asset',
        resourceQuery: /url/,
      },
      /**
       * Support import svg as React component
       * Reference: {@link https://github.com/facebook/create-react-app/blob/v5.0.0/packages/react-scripts/config/webpack.config.js#L389-L400}
       */
      {
        loader: require.resolve('@svgr/webpack'),
        issuer: /\.[jt]sx?$/,
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      },
    ],
  });
}

module.exports = {
  supportPathAlias,
  addNodeUtilFallback,
  supportSvgAsReactComponents,
};
