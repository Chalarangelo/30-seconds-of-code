"use strict";

const levenshtein = require(`fast-levenshtein`);

const fs = require(`fs-extra`);

const testRequireError = require(`../utils/test-require-error`).default;

const report = require(`gatsby-cli/lib/reporter`);

const path = require(`path`);

const existsSync = require(`fs-exists-cached`).sync;

function isNearMatch(fileName, configName, distance) {
  return levenshtein.get(fileName, configName) <= distance;
}

module.exports = async function getConfigFile(rootDir, configName, distance = 3) {
  const configPath = path.join(rootDir, configName);
  let configModule;

  try {
    configModule = require(configPath);
  } catch (err) {
    const nearMatch = await fs.readdir(rootDir).then(files => files.find(file => {
      const fileName = file.split(rootDir).pop();
      return isNearMatch(fileName, configName, distance);
    }));

    if (!testRequireError(configPath, err)) {
      report.panic({
        id: `10123`,
        error: err,
        context: {
          configName,
          message: err.message
        }
      });
    } else if (nearMatch) {
      report.panic({
        id: `10124`,
        error: err,
        context: {
          configName,
          nearMatch
        }
      });
    } else if (existsSync(path.join(rootDir, `src`, configName + `.js`))) {
      report.panic({
        id: `10125`,
        context: {
          configName
        }
      });
    }
  }

  return configModule;
};
//# sourceMappingURL=get-config-file.js.map