"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isPluginRequired", {
  enumerable: true,
  get: function () {
    return _filterItems.isPluginRequired;
  }
});
exports.default = exports.transformIncludesAndExcludes = void 0;

var _debug = require("./debug");

var _getOptionSpecificExcludes = _interopRequireDefault(require("./get-option-specific-excludes"));

var _filterItems = _interopRequireWildcard(require("./filter-items"));

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _normalizeOptions = _interopRequireDefault(require("./normalize-options"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

var _shippedProposals = require("../data/shipped-proposals");

var _usagePlugin = _interopRequireDefault(require("./polyfills/corejs2/usage-plugin"));

var _usagePlugin2 = _interopRequireDefault(require("./polyfills/corejs3/usage-plugin"));

var _usagePlugin3 = _interopRequireDefault(require("./polyfills/regenerator/usage-plugin"));

var _entryPlugin = _interopRequireDefault(require("./polyfills/corejs2/entry-plugin"));

var _entryPlugin2 = _interopRequireDefault(require("./polyfills/corejs3/entry-plugin"));

var _entryPlugin3 = _interopRequireDefault(require("./polyfills/regenerator/entry-plugin"));

var _targetsParser = _interopRequireDefault(require("./targets-parser"));

var _availablePlugins = _interopRequireDefault(require("./available-plugins"));

var _utils = require("./utils");

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pluginListWithoutProposals = (0, _utils.filterStageFromList)(_plugins.default, _shippedProposals.proposalPlugins);

const getPlugin = pluginName => {
  const plugin = _availablePlugins.default[pluginName];

  if (!plugin) {
    throw new Error(`Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`);
  }

  return plugin;
};

const transformIncludesAndExcludes = opts => {
  return opts.reduce((result, opt) => {
    const target = opt.match(/^(es|es6|es7|esnext|web)\./) ? "builtIns" : "plugins";
    result[target].add(opt);
    return result;
  }, {
    all: opts,
    plugins: new Set(),
    builtIns: new Set()
  });
};

exports.transformIncludesAndExcludes = transformIncludesAndExcludes;

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

function supportsDynamicImport(caller) {
  return !!(caller && caller.supportsDynamicImport);
}

var _default = (0, _helperPluginUtils().declare)((api, opts) => {
  api.assertVersion(7);
  const {
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
    corejs: {
      version: corejs,
      proposals
    }
  } = (0, _normalizeOptions.default)(opts);
  let hasUglifyTarget = false;

  if (optionsTargets && optionsTargets.uglify) {
    hasUglifyTarget = true;
    delete optionsTargets.uglify;
    console.log("");
    console.log("The uglify target has been deprecated. Set the top level");
    console.log("option `forceAllTransforms: true` instead.");
    console.log("");
  }

  if (optionsTargets && optionsTargets.esmodules && optionsTargets.browsers) {
    console.log("");
    console.log("@babel/preset-env: esmodules and browsers targets have been specified together.");
    console.log(`\`browsers\` target, \`${optionsTargets.browsers}\` will be ignored.`);
    console.log("");
  }

  const targets = (0, _targetsParser.default)(optionsTargets, {
    ignoreBrowserslistConfig,
    configPath
  });
  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);
  const transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;
  const transformations = (0, _filterItems.default)(shippedProposals ? _plugins.default : pluginListWithoutProposals, include.plugins, exclude.plugins, transformTargets, null, (0, _getOptionSpecificExcludes.default)({
    loose
  }), _shippedProposals.pluginSyntaxMap);
  const plugins = [];
  const pluginUseBuiltIns = useBuiltIns !== false;

  if (modules !== false && _moduleTransformations.default[modules]) {
    const shouldTransformESM = modules !== "auto" || !api.caller || !api.caller(supportsStaticESM);
    const shouldTransformDynamicImport = modules !== "auto" || !api.caller || !api.caller(supportsDynamicImport);

    if (shouldTransformESM) {
      plugins.push([getPlugin(_moduleTransformations.default[modules]), {
        loose
      }]);
    }

    if (shouldTransformDynamicImport && shouldTransformESM && modules !== "umd") {
      plugins.push([getPlugin("proposal-dynamic-import"), {
        loose
      }]);
    } else {
      if (shouldTransformDynamicImport) {
        console.warn("Dynamic import can only be supported when transforming ES modules" + " to AMD, CommonJS or SystemJS. Only the parser plugin will be enabled.");
      }

      plugins.push(getPlugin("syntax-dynamic-import"));
    }
  } else {
    plugins.push(getPlugin("syntax-dynamic-import"));
  }

  transformations.forEach(pluginName => plugins.push([getPlugin(pluginName), {
    spec,
    loose,
    useBuiltIns: pluginUseBuiltIns
  }]));

  if (debug) {
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify((0, _utils.prettifyTargets)(targets), null, 2));
    console.log(`\nUsing modules transform: ${modules.toString()}`);
    console.log("\nUsing plugins:");
    transformations.forEach(transform => {
      (0, _debug.logPluginOrPolyfill)(transform, targets, _plugins.default);
    });

    if (!useBuiltIns) {
      console.log("\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.");
    } else {
      console.log(`\nUsing polyfills with \`${useBuiltIns}\` option:`);
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    const regenerator = transformations.has("transform-regenerator");
    const pluginOptions = {
      corejs,
      polyfillTargets: targets,
      include: include.builtIns,
      exclude: exclude.builtIns,
      proposals,
      shippedProposals,
      regenerator,
      debug
    };

    if (corejs) {
      if (useBuiltIns === "usage") {
        if (corejs.major === 2) {
          plugins.push([_usagePlugin.default, pluginOptions]);
        } else {
          plugins.push([_usagePlugin2.default, pluginOptions]);
        }

        if (regenerator) {
          plugins.push([_usagePlugin3.default, pluginOptions]);
        }
      } else {
        if (corejs.major === 2) {
          plugins.push([_entryPlugin.default, pluginOptions]);
        } else {
          plugins.push([_entryPlugin2.default, pluginOptions]);

          if (!regenerator) {
            plugins.push([_entryPlugin3.default, pluginOptions]);
          }
        }
      }
    }
  }

  return {
    plugins
  };
});

exports.default = _default;