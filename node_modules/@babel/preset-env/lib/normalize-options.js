"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeCoreJSOption = normalizeCoreJSOption;
exports.default = normalizeOptions;
exports.validateUseBuiltInsOption = exports.validateModulesOption = exports.validateIgnoreBrowserslistConfig = exports.validateBoolOption = exports.validateConfigPathOption = exports.checkDuplicateIncludeExcludes = exports.normalizePluginName = void 0;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
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
  const data = require("semver");

  _semver = function () {
    return data;
  };

  return data;
}

var _corejs2BuiltIns = _interopRequireDefault(require("../data/corejs2-built-ins.json"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _options = require("./options");

var _getPlatformSpecificDefault = require("./polyfills/corejs2/get-platform-specific-default");

var _targetsParser = require("./targets-parser");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateTopLevelOptions = options => {
  const validOptions = Object.keys(_options.TopLevelOptions);

  for (const option in options) {
    if (!_options.TopLevelOptions[option]) {
      throw new Error(`Invalid Option: ${option} is not a valid top-level option.
        Maybe you meant to use '${(0, _utils.findSuggestion)(validOptions, option)}'?`);
    }
  }
};

const allPluginsList = [...Object.keys(_plugins.default), ...Object.keys(_moduleTransformations.default).map(m => _moduleTransformations.default[m])];
const validIncludesAndExcludesWithoutCoreJS = new Set(allPluginsList);
const validIncludesAndExcludesWithCoreJS2 = new Set([...allPluginsList, ...Object.keys(_corejs2BuiltIns.default), ..._getPlatformSpecificDefault.defaultWebIncludes]);
const validIncludesAndExcludesWithCoreJS3 = new Set([...allPluginsList, ...Object.keys(_data().default)]);

const pluginToRegExp = plugin => {
  if (plugin instanceof RegExp) return plugin;

  try {
    return new RegExp(`^${normalizePluginName(plugin)}$`);
  } catch (e) {
    return null;
  }
};

const selectPlugins = (regexp, corejs) => Array.from(corejs ? corejs == 2 ? validIncludesAndExcludesWithCoreJS2 : validIncludesAndExcludesWithCoreJS3 : validIncludesAndExcludesWithoutCoreJS).filter(item => regexp instanceof RegExp && regexp.test(item));

const flatten = array => [].concat(...array);

const expandIncludesAndExcludes = (plugins = [], type, corejs) => {
  if (plugins.length === 0) return [];
  const selectedPlugins = plugins.map(plugin => selectPlugins(pluginToRegExp(plugin), corejs));
  const invalidRegExpList = plugins.filter((p, i) => selectedPlugins[i].length === 0);
  (0, _invariant().default)(invalidRegExpList.length === 0, `Invalid Option: The plugins/built-ins '${invalidRegExpList.join(", ")}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`);
  return flatten(selectedPlugins);
};

const normalizePluginName = plugin => plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");

exports.normalizePluginName = normalizePluginName;

const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
  const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);
  (0, _invariant().default)(duplicates.length === 0, `Invalid Option: The plugins/built-ins '${duplicates.join(", ")}' were found in both the "include" and
    "exclude" options.`);
};

exports.checkDuplicateIncludeExcludes = checkDuplicateIncludeExcludes;

const normalizeTargets = targets => {
  if ((0, _targetsParser.isBrowsersQueryValid)(targets)) {
    return {
      browsers: targets
    };
  }

  return Object.assign({}, targets);
};

const validateConfigPathOption = (configPath = process.cwd()) => {
  (0, _invariant().default)(typeof configPath === "string", `Invalid Option: The configPath option '${configPath}' is invalid, only strings are allowed.`);
  return configPath;
};

exports.validateConfigPathOption = validateConfigPathOption;

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Preset env: '${name}' option must be a boolean.`);
  }

  return value;
};

exports.validateBoolOption = validateBoolOption;

const validateIgnoreBrowserslistConfig = ignoreBrowserslistConfig => validateBoolOption(_options.TopLevelOptions.ignoreBrowserslistConfig, ignoreBrowserslistConfig, false);

exports.validateIgnoreBrowserslistConfig = validateIgnoreBrowserslistConfig;

const validateModulesOption = (modulesOpt = _options.ModulesOption.auto) => {
  (0, _invariant().default)(_options.ModulesOption[modulesOpt.toString()] || _options.ModulesOption[modulesOpt.toString()] === _options.ModulesOption.false, `Invalid Option: The 'modules' option must be one of \n` + ` - 'false' to indicate no module processing\n` + ` - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs'` + ` - 'auto' (default) which will automatically select 'false' if the current\n` + `   process is known to support ES module syntax, or "commonjs" otherwise\n`);
  return modulesOpt;
};

exports.validateModulesOption = validateModulesOption;

const validateUseBuiltInsOption = (builtInsOpt = false) => {
  (0, _invariant().default)(_options.UseBuiltInsOption[builtInsOpt.toString()] || _options.UseBuiltInsOption[builtInsOpt.toString()] === _options.UseBuiltInsOption.false, `Invalid Option: The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`);
  return builtInsOpt;
};

exports.validateUseBuiltInsOption = validateUseBuiltInsOption;

function normalizeCoreJSOption(corejs, useBuiltIns) {
  let proposals = false;
  let rawVersion;

  if (useBuiltIns && corejs === undefined) {
    rawVersion = 2;
    console.warn("\nWARNING: We noticed you're using the `useBuiltIns` option without declaring a " + "core-js version. Currently, we assume version 2.x when no version " + "is passed. Since this default version will likely change in future " + "versions of Babel, we recommend explicitly setting the core-js version " + "you are using via the `corejs` option.\n" + "\nYou should also be sure that the version you pass to the `corejs` " + "option matches the version specified in your `package.json`'s " + "`dependencies` section. If it doesn't, you need to run one of the " + "following commands:\n\n" + "  npm install --save core-js@2    npm install --save core-js@3\n" + "  yarn add core-js@2              yarn add core-js@3\n");
  } else if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const version = rawVersion ? (0, _semver().coerce)(String(rawVersion)) : false;

  if (!useBuiltIns && version) {
    console.log("\nThe `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n");
  }

  if (useBuiltIns && (!version || version.major < 2 || version.major > 3)) {
    throw new RangeError("Invalid Option: The version passed to `corejs` is invalid. Currently, " + "only core-js@2 and core-js@3 are supported.");
  }

  return {
    version,
    proposals
  };
}

function normalizeOptions(opts) {
  validateTopLevelOptions(opts);
  const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns);
  const corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns);
  const include = expandIncludesAndExcludes(opts.include, _options.TopLevelOptions.include, !!corejs.version && corejs.version.major);
  const exclude = expandIncludesAndExcludes(opts.exclude, _options.TopLevelOptions.exclude, !!corejs.version && corejs.version.major);
  checkDuplicateIncludeExcludes(include, exclude);
  const shippedProposals = validateBoolOption(_options.TopLevelOptions.shippedProposals, opts.shippedProposals, false) || corejs.proposals;
  return {
    configPath: validateConfigPathOption(opts.configPath),
    corejs,
    debug: validateBoolOption(_options.TopLevelOptions.debug, opts.debug, false),
    include,
    exclude,
    forceAllTransforms: validateBoolOption(_options.TopLevelOptions.forceAllTransforms, opts.forceAllTransforms, false),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(opts.ignoreBrowserslistConfig),
    loose: validateBoolOption(_options.TopLevelOptions.loose, opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals,
    spec: validateBoolOption(_options.TopLevelOptions.spec, opts.spec, false),
    targets: normalizeTargets(opts.targets),
    useBuiltIns: useBuiltIns
  };
}