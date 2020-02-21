const path = require('path');
const fse = require('fs-extra');

const projectRoot = path.resolve(__dirname, '..');

/** Get paths aliases from "tsconfig.json" file. */
function getAliasesFromTsConfig() {
  const tsconfig = fse.readJsonSync(path.join(projectRoot, 'tsconfig.json'));
  return Object.entries(tsconfig.compilerOptions.paths).reduce(
    (map, [key, value]) => {
      // @components/* => components
      const module = key.slice(1, -2);

      map[`@${module}`] = path.resolve(projectRoot, 'src', module);
      return map;
    },
    {},
  );
}

exports.getAliasesFromTsConfig = getAliasesFromTsConfig;
