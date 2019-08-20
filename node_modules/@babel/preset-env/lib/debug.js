"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logUsagePolyfills = exports.logEntryPolyfills = exports.logPluginOrPolyfill = void 0;

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wordEnds = size => {
  return size > 1 ? "s" : "";
};

const logPluginOrPolyfill = (item, targetVersions, list) => {
  const minVersions = list[item] || {};
  const filteredList = Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = minVersions[env];
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = (0, _utils.prettifyVersion)(targetVersion);
    } else {
      const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
      const targetIsUnreleased = (0, _utils.isUnreleasedVersion)(targetVersion, env);

      if (!targetIsUnreleased && (minIsUnreleased || _semver().default.lt(targetVersion.toString(), (0, _utils.semverify)(minVersion)))) {
        result[env] = (0, _utils.prettifyVersion)(targetVersion);
      }
    }

    return result;
  }, {});
  const formattedTargets = JSON.stringify(filteredList).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
  console.log(`  ${item} ${formattedTargets}`);
};

exports.logPluginOrPolyfill = logPluginOrPolyfill;

const logEntryPolyfills = (polyfillName, importPolyfillIncluded, polyfills, filename, polyfillTargets, allBuiltInsList) => {
  if (!importPolyfillIncluded) {
    console.log(`\n[${filename}] Import of ${polyfillName} was not found.`);
    return;
  }

  if (!polyfills.size) {
    console.log(`\n[${filename}] Based on your targets, polyfills were not added.`);
    return;
  }

  console.log(`\n[${filename}] Replaced ${polyfillName} entries with the following polyfill${wordEnds(polyfills.size)}:`);

  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

exports.logEntryPolyfills = logEntryPolyfills;

const logUsagePolyfills = (polyfills, filename, polyfillTargets, allBuiltInsList) => {
  if (!polyfills.size) {
    console.log(`\n[${filename}] Based on your code and targets, core-js polyfills were not added.`);
    return;
  }

  console.log(`\n[${filename}] Added following core-js polyfill${wordEnds(polyfills.size)}:`);

  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

exports.logUsagePolyfills = logUsagePolyfills;