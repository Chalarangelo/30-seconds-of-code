"use strict";

var _redux = require("../redux");

var _lodash = require("lodash");

const createRequireFromPath = require(`./create-require-from-path`);

const {
  join,
  dirname
} = require(`path`);

const fs = require(`fs`);

const {
  promisify
} = require(`util`);

const readFile = promisify(fs.readFile);

const getAllDependencies = (pkg, {
  noDev
} = {}) => new Set([...Object.entries(pkg.dependencies || {}), ...Object.entries(!noDev && pkg.devDependencies || {}), ...Object.entries(pkg.optionalDependencies || {})]);

const readJSON = async file => {
  const buffer = await readFile(file);
  return JSON.parse(buffer.toString());
};

const getTreeFromNodeModules = async (dir, filterFn = () => true, results = new Map()) => {
  const requireFromHere = createRequireFromPath(`${dir}/:internal:`);
  let packageJSON;

  try {
    packageJSON = await readJSON(require.resolve(join(dir, `package.json`)));
  } catch (error) {
    packageJSON = {};
  }

  await Promise.all(Array.from(getAllDependencies(packageJSON)).map(async ([name, version]) => {
    try {
      const currentDependency = {
        name,
        version,
        path: dirname(requireFromHere.resolve(`${name}/package.json`))
      };

      if (filterFn(currentDependency)) {
        await getTreeFromNodeModules(currentDependency.path, filterFn, results);
        if (!results.has(currentDependency.name)) results.set(currentDependency.name, currentDependency);
      }
    } catch (error) {// Sometimes dev dependencies of dependencies aren't installed
      // when using `yarn`. This is okay and safe to ignore.
    }
  }));
  return Array.from(results.values());
}; // Returns [Object] with name and path


module.exports = (0, _lodash.memoize)(async () => {
  const {
    program
  } = _redux.store.getState();

  const nodeModules = await getTreeFromNodeModules(program.directory, // Include anything that has `gatsby` in its name but not `gatsby` itself
  dependency => /gatsby/.test(dependency.name) && dependency.name !== `gatsby`);
  return nodeModules;
});
//# sourceMappingURL=gatsby-dependents.js.map