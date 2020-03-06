const path = require('path');
const fse = require('fs-extra');

const projectRoot = path.resolve(__dirname, '..');

function trimTrailingGlob(value) {
  return value.endsWith('/*') ? value.slice(0, -2) : value;
}

/** Get paths aliases from "tsconfig.json" file. */
function getAliasesFromTsConfig() {
  const tsconfig = fse.readJsonSync(path.join(projectRoot, 'tsconfig.json'));

  return Object.entries(tsconfig.compilerOptions.paths).reduce(
    (map, [key, value]) => {
      // key = @alias/*
      // value = ["path-to-folder/*"]
      const alias = trimTrailingGlob(key);
      map[alias] = path.resolve(projectRoot, trimTrailingGlob(value[0]));
      return map;
    },
    {},
  );
}

exports.getAliasesFromTsConfig = getAliasesFromTsConfig;
