module.exports = {
  extends: ['react-app', 'prettier', 'plugin:@next/next/recommended'],
  overrides: [
    {
      files: ['src/**/*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '@tager/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
  },
};
