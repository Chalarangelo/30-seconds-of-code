"use strict";

const path = require(`path`);

const browserslist = require(`browserslist/node`);

function installedGatsbyVersion(directory) {
  try {
    const {
      version
    } = require(path.join(directory, `node_modules`, `gatsby`, `package.json`));

    return parseInt(version.split(`.`)[0], 10);
  } catch (e) {
    return undefined;
  }
}

module.exports = function getBrowsersList(directory) {
  const fallback = installedGatsbyVersion(directory) === 1 ? [`>1%`, `last 2 versions`, `IE >= 9`] : [`>0.25%`, `not dead`];
  const config = browserslist.findConfig(directory);

  if (config && config.defaults) {
    return config.defaults;
  }

  return fallback;
};
//# sourceMappingURL=browserslist.js.map