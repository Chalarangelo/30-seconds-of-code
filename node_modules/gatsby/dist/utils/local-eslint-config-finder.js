"use strict";

const path = require(`path`);

const glob = require(`glob`);

const debug = require(`debug`)(`gatsby:webpack-eslint-config`);

const report = require(`gatsby-cli/lib/reporter`);

module.exports = directory => {
  try {
    debug(`Attempting to load package.json for eslint config check`);

    const pkg = require(path.resolve(directory, `package.json`));

    if (pkg.eslintConfig) {
      return true;
    }
  } catch (err) {
    report.error(`There was a problem processing the package.json file`, err);
  }

  debug(`Checking for eslint config file`);
  const eslintFiles = glob.sync(`.eslintrc?(.js|.json|.yaml|.yml)`, {
    cwd: directory
  });

  if (eslintFiles.length) {
    return true;
  }

  return false;
};
//# sourceMappingURL=local-eslint-config-finder.js.map