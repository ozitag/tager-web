const cp = require('child_process');

const packageJson = require('../package.json');

const tagerDependencySet = new Set();

Object.keys({
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
})
  .filter((packageName) => packageName.startsWith('@tager/'))
  .forEach((tagerDependency) => {
    tagerDependencySet.add(tagerDependency);
  });

const tagerDependencyList = Array.from(tagerDependencySet);

if (tagerDependencyList.length === 0) {
  console.log(`package.json doesn't have @tager dependencies.`);
  return;
}

const command = `yarn upgrade --latest ${tagerDependencyList.join(' ')}`;
console.log('$ ', command);

cp.execSync(command);
