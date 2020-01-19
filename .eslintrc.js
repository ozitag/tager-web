/** react-app config already use "@typescript-eslint" for "*.ts(x)" files */

module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
  },
};
