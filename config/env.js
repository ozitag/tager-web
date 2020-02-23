const path = require('path');
const dotenv = require('dotenv');

/**
 * Only variables that started with REACT_APP_* are allowed (like in create-react-app)
 * Discussion: https://github.com/facebook/create-react-app/issues/865#issuecomment-252199527
 */
const REACT_APP = /^REACT_APP_/i;

function filterVariables(env) {
  return Object.keys(env)
    .filter(key => REACT_APP.test(key))
    .reduce((filteredEnv, key) => {
      filteredEnv[key] = env[key];
      return filteredEnv;
    }, {});
}

function getClientEnvironment() {
  const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.warn('".env" file is not found');
      return {};
    } else {
      throw result.error;
    }
  } else {
    return filterVariables(result.parsed);
  }
}

module.exports = getClientEnvironment;
