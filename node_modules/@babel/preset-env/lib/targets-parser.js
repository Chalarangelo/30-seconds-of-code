"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.semverMin = exports.isBrowsersQueryValid = void 0;

function _browserslist() {
  const data = _interopRequireDefault(require("browserslist"));

  _browserslist = function () {
    return data;
  };

  return data;
}

function _invariant() {
  const data = _interopRequireDefault(require("invariant"));

  _invariant = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

var _builtInModules = _interopRequireDefault(require("../data/built-in-modules.json"));

var _options = require("./options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const browserslistDefaults = _browserslist().default.defaults;

const validBrowserslistTargets = [...Object.keys(_browserslist().default.data), ...Object.keys(_browserslist().default.aliases)];

const objectToBrowserslist = object => {
  return Object.keys(object).reduce((list, targetName) => {
    if (validBrowserslistTargets.indexOf(targetName) >= 0) {
      const targetVersion = object[targetName];
      return list.concat(`${targetName} ${targetVersion}`);
    }

    return list;
  }, []);
};

const validateTargetNames = targets => {
  const validTargets = Object.keys(_options.TargetNames);

  for (const target in targets) {
    if (!_options.TargetNames[target]) {
      throw new Error(`Invalid Option: '${target}' is not a valid target
        Maybe you meant to use '${(0, _utils.findSuggestion)(validTargets, target)}'?`);
    }
  }
};

const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ie_mob: "ie",
  ios_saf: "ios",
  node: "node",
  op_mob: "opera",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};

const isBrowsersQueryValid = browsers => typeof browsers === "string" || Array.isArray(browsers);

exports.isBrowsersQueryValid = isBrowsersQueryValid;

const validateBrowsers = browsers => {
  (0, _invariant().default)(typeof browsers === "undefined" || isBrowsersQueryValid(browsers), `Invalid Option: '${browsers}' is not a valid browserslist query`);
  return browsers;
};

const semverMin = (first, second) => {
  return first && _semver().default.lt(first, second) ? first : second;
};

exports.semverMin = semverMin;

const mergeBrowsers = (fromQuery, fromTarget) => {
  return Object.keys(fromTarget).reduce((queryObj, targKey) => {
    if (targKey !== _options.TargetNames.browsers) {
      queryObj[targKey] = fromTarget[targKey];
    }

    return queryObj;
  }, fromQuery);
};

const getLowestVersions = browsers => {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      const splitVersion = browserVersion.split("-")[0].toLowerCase();
      const isSplitUnreleased = (0, _utils.isUnreleasedVersion)(splitVersion, browserName);

      if (!all[normalizedBrowserName]) {
        all[normalizedBrowserName] = isSplitUnreleased ? splitVersion : (0, _utils.semverify)(splitVersion);
        return all;
      }

      const version = all[normalizedBrowserName];
      const isUnreleased = (0, _utils.isUnreleasedVersion)(version, browserName);

      if (isUnreleased && isSplitUnreleased) {
        all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(version, splitVersion, browserName);
      } else if (isUnreleased) {
        all[normalizedBrowserName] = (0, _utils.semverify)(splitVersion);
      } else if (!isUnreleased && !isSplitUnreleased) {
        const parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
        all[normalizedBrowserName] = semverMin(version, parsedBrowserVersion);
      }
    } catch (e) {}

    return all;
  }, {});
};

const outputDecimalWarning = decimalTargets => {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(({
    target,
    value
  }) => console.log(`  ${target}: ${value}`));
  console.log("");
  console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10");
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

const semverifyTarget = (target, value) => {
  try {
    return (0, _utils.semverify)(value);
  } catch (error) {
    throw new Error(`Invalid Option: '${value}' is not a valid value for 'targets.${target}'.`);
  }
};

const targetParserMap = {
  __default: (target, value) => {
    const version = (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value);
    return [target, version];
  },
  node: (target, value) => {
    const parsed = value === true || value === "current" ? process.versions.node : semverifyTarget(target, value);
    return [target, parsed];
  }
};

const getTargets = (targets = {}, options = {}) => {
  const targetOpts = {};
  validateTargetNames(targets);

  if (targets.esmodules) {
    const supportsESModules = _builtInModules.default["es6.module"];
    targets.browsers = Object.keys(supportsESModules).map(browser => `${browser} ${supportsESModules[browser]}`).join(", ");
  }

  const browsersquery = validateBrowsers(targets.browsers);
  const hasTargets = Object.keys(targets).length > 0;
  const shouldParseBrowsers = !!targets.browsers;
  const shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;

  if (shouldParseBrowsers || shouldSearchForConfig) {
    if (!hasTargets) {
      _browserslist().default.defaults = objectToBrowserslist(targets);
    }

    const browsers = (0, _browserslist().default)(browsersquery, {
      path: options.configPath,
      mobileToDesktop: true
    });
    const queryBrowsers = getLowestVersions(browsers);
    targets = mergeBrowsers(queryBrowsers, targets);
    _browserslist().default.defaults = browserslistDefaults;
  }

  const parsed = Object.keys(targets).filter(value => value !== _options.TargetNames.esmodules).sort().reduce((results, target) => {
    if (target !== _options.TargetNames.browsers) {
      const value = targets[target];

      if (typeof value === "number" && value % 1 !== 0) {
        results.decimalWarnings.push({
          target,
          value
        });
      }

      const parser = targetParserMap[target] || targetParserMap.__default;
      const [parsedTarget, parsedValue] = parser(target, value);

      if (parsedValue) {
        results.targets[parsedTarget] = parsedValue;
      }
    }

    return results;
  }, {
    targets: targetOpts,
    decimalWarnings: []
  });
  outputDecimalWarning(parsed.decimalWarnings);
  return parsed.targets;
};

var _default = getTargets;
exports.default = _default;