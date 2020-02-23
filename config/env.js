const path = require('path');
const dotenv = require('dotenv');

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
    return result.parsed;
  }
}

module.exports = getClientEnvironment;
