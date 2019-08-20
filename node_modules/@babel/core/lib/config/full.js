"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadFullConfig;

var _util = require("./util");

var context = _interopRequireWildcard(require("../index"));

var _plugin = _interopRequireDefault(require("./plugin"));

var _item = require("./item");

var _configChain = require("./config-chain");

function _traverse() {
  const data = _interopRequireDefault(require("@babel/traverse"));

  _traverse = function () {
    return data;
  };

  return data;
}

var _caching = require("./caching");

var _options = require("./validation/options");

var _plugins = require("./validation/plugins");

var _configApi = _interopRequireDefault(require("./helpers/config-api"));

var _partial = _interopRequireDefault(require("./partial"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function loadFullConfig(inputOpts) {
  const result = (0, _partial.default)(inputOpts);

  if (!result) {
    return null;
  }

  const {
    options,
    context
  } = result;
  const optionDefaults = {};
  const passes = [[]];

  try {
    const {
      plugins,
      presets
    } = options;

    if (!plugins || !presets) {
      throw new Error("Assertion failure - plugins and presets exist");
    }

    const ignored = function recurseDescriptors(config, pass) {
      const plugins = config.plugins.reduce((acc, descriptor) => {
        if (descriptor.options !== false) {
          acc.push(loadPluginDescriptor(descriptor, context));
        }

        return acc;
      }, []);
      const presets = config.presets.reduce((acc, descriptor) => {
        if (descriptor.options !== false) {
          acc.push({
            preset: loadPresetDescriptor(descriptor, context),
            pass: descriptor.ownPass ? [] : pass
          });
        }

        return acc;
      }, []);

      if (presets.length > 0) {
        passes.splice(1, 0, ...presets.map(o => o.pass).filter(p => p !== pass));

        for (const _ref of presets) {
          const {
            preset,
            pass
          } = _ref;
          if (!preset) return true;
          const ignored = recurseDescriptors({
            plugins: preset.plugins,
            presets: preset.presets
          }, pass);
          if (ignored) return true;
          preset.options.forEach(opts => {
            (0, _util.mergeOptions)(optionDefaults, opts);
          });
        }
      }

      if (plugins.length > 0) {
        pass.unshift(...plugins);
      }
    }({
      plugins: plugins.map(item => {
        const desc = (0, _item.getItemDescriptor)(item);

        if (!desc) {
          throw new Error("Assertion failure - must be config item");
        }

        return desc;
      }),
      presets: presets.map(item => {
        const desc = (0, _item.getItemDescriptor)(item);

        if (!desc) {
          throw new Error("Assertion failure - must be config item");
        }

        return desc;
      })
    }, passes[0]);

    if (ignored) return null;
  } catch (e) {
    if (!/^\[BABEL\]/.test(e.message)) {
      e.message = `[BABEL] ${context.filename || "unknown"}: ${e.message}`;
    }

    throw e;
  }

  const opts = optionDefaults;
  (0, _util.mergeOptions)(opts, options);
  opts.plugins = passes[0];
  opts.presets = passes.slice(1).filter(plugins => plugins.length > 0).map(plugins => ({
    plugins
  }));
  opts.passPerPreset = opts.presets.length > 0;
  return {
    options: opts,
    passes: passes
  };
}

const loadDescriptor = (0, _caching.makeWeakCache)(({
  value,
  options,
  dirname,
  alias
}, cache) => {
  if (options === false) throw new Error("Assertion failure");
  options = options || {};
  let item = value;

  if (typeof value === "function") {
    const api = Object.assign({}, context, (0, _configApi.default)(cache));

    try {
      item = value(api, options, dirname);
    } catch (e) {
      if (alias) {
        e.message += ` (While processing: ${JSON.stringify(alias)})`;
      }

      throw e;
    }
  }

  if (!item || typeof item !== "object") {
    throw new Error("Plugin/Preset did not return an object.");
  }

  if (typeof item.then === "function") {
    throw new Error(`You appear to be using an async plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version.`);
  }

  return {
    value: item,
    options,
    dirname,
    alias
  };
});

function loadPluginDescriptor(descriptor, context) {
  if (descriptor.value instanceof _plugin.default) {
    if (descriptor.options) {
      throw new Error("Passed options to an existing Plugin instance will not work.");
    }

    return descriptor.value;
  }

  return instantiatePlugin(loadDescriptor(descriptor, context), context);
}

const instantiatePlugin = (0, _caching.makeWeakCache)(({
  value,
  options,
  dirname,
  alias
}, cache) => {
  const pluginObj = (0, _plugins.validatePluginObject)(value);
  const plugin = Object.assign({}, pluginObj);

  if (plugin.visitor) {
    plugin.visitor = _traverse().default.explode(Object.assign({}, plugin.visitor));
  }

  if (plugin.inherits) {
    const inheritsDescriptor = {
      name: undefined,
      alias: `${alias}$inherits`,
      value: plugin.inherits,
      options,
      dirname
    };
    const inherits = cache.invalidate(data => loadPluginDescriptor(inheritsDescriptor, data));
    plugin.pre = chain(inherits.pre, plugin.pre);
    plugin.post = chain(inherits.post, plugin.post);
    plugin.manipulateOptions = chain(inherits.manipulateOptions, plugin.manipulateOptions);
    plugin.visitor = _traverse().default.visitors.merge([inherits.visitor || {}, plugin.visitor || {}]);
  }

  return new _plugin.default(plugin, options, alias);
});

const loadPresetDescriptor = (descriptor, context) => {
  return (0, _configChain.buildPresetChain)(instantiatePreset(loadDescriptor(descriptor, context)), context);
};

const instantiatePreset = (0, _caching.makeWeakCache)(({
  value,
  dirname,
  alias
}) => {
  return {
    options: (0, _options.validate)("preset", value),
    alias,
    dirname
  };
});

function chain(a, b) {
  const fns = [a, b].filter(Boolean);
  if (fns.length <= 1) return fns[0];
  return function (...args) {
    for (const fn of fns) {
      fn.apply(this, args);
    }
  };
}