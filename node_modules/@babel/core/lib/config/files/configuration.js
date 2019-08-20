"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findConfigUpwards = findConfigUpwards;
exports.findRelativeConfig = findRelativeConfig;
exports.findRootConfig = findRootConfig;
exports.loadConfig = loadConfig;

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _json() {
  const data = _interopRequireDefault(require("json5"));

  _json = function () {
    return data;
  };

  return data;
}

function _resolve() {
  const data = _interopRequireDefault(require("resolve"));

  _resolve = function () {
    return data;
  };

  return data;
}

var _caching = require("../caching");

var _configApi = _interopRequireDefault(require("../helpers/config-api"));

var _utils = require("./utils");

var _patternToRegex = _interopRequireDefault(require("../pattern-to-regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:config:loading:files:configuration");
const BABEL_CONFIG_JS_FILENAME = "babel.config.js";
const BABELRC_FILENAME = ".babelrc";
const BABELRC_JS_FILENAME = ".babelrc.js";
const BABELIGNORE_FILENAME = ".babelignore";

function findConfigUpwards(rootDir) {
  let dirname = rootDir;

  while (true) {
    if (_fs().default.existsSync(_path().default.join(dirname, BABEL_CONFIG_JS_FILENAME))) {
      return dirname;
    }

    const nextDir = _path().default.dirname(dirname);

    if (dirname === nextDir) break;
    dirname = nextDir;
  }

  return null;
}

function findRelativeConfig(packageData, envName, caller) {
  let config = null;
  let ignore = null;

  const dirname = _path().default.dirname(packageData.filepath);

  for (const loc of packageData.directories) {
    if (!config) {
      config = [BABELRC_FILENAME, BABELRC_JS_FILENAME].reduce((previousConfig, name) => {
        const filepath = _path().default.join(loc, name);

        const config = readConfig(filepath, envName, caller);

        if (config && previousConfig) {
          throw new Error(`Multiple configuration files found. Please remove one:\n` + ` - ${_path().default.basename(previousConfig.filepath)}\n` + ` - ${name}\n` + `from ${loc}`);
        }

        return config || previousConfig;
      }, null);
      const pkgConfig = packageData.pkg && packageData.pkg.dirname === loc ? packageToBabelConfig(packageData.pkg) : null;

      if (pkgConfig) {
        if (config) {
          throw new Error(`Multiple configuration files found. Please remove one:\n` + ` - ${_path().default.basename(pkgConfig.filepath)}#babel\n` + ` - ${_path().default.basename(config.filepath)}\n` + `from ${loc}`);
        }

        config = pkgConfig;
      }

      if (config) {
        debug("Found configuration %o from %o.", config.filepath, dirname);
      }
    }

    if (!ignore) {
      const ignoreLoc = _path().default.join(loc, BABELIGNORE_FILENAME);

      ignore = readIgnoreConfig(ignoreLoc);

      if (ignore) {
        debug("Found ignore %o from %o.", ignore.filepath, dirname);
      }
    }
  }

  return {
    config,
    ignore
  };
}

function findRootConfig(dirname, envName, caller) {
  const filepath = _path().default.resolve(dirname, BABEL_CONFIG_JS_FILENAME);

  const conf = readConfig(filepath, envName, caller);

  if (conf) {
    debug("Found root config %o in %o.", BABEL_CONFIG_JS_FILENAME, dirname);
  }

  return conf;
}

function loadConfig(name, dirname, envName, caller) {
  const filepath = _resolve().default.sync(name, {
    basedir: dirname
  });

  const conf = readConfig(filepath, envName, caller);

  if (!conf) {
    throw new Error(`Config file ${filepath} contains no configuration data`);
  }

  debug("Loaded config %o from %o.", name, dirname);
  return conf;
}

function readConfig(filepath, envName, caller) {
  return _path().default.extname(filepath) === ".js" ? readConfigJS(filepath, {
    envName,
    caller
  }) : readConfigJSON5(filepath);
}

const LOADING_CONFIGS = new Set();
const readConfigJS = (0, _caching.makeStrongCache)((filepath, cache) => {
  if (!_fs().default.existsSync(filepath)) {
    cache.forever();
    return null;
  }

  if (LOADING_CONFIGS.has(filepath)) {
    cache.never();
    debug("Auto-ignoring usage of config %o.", filepath);
    return {
      filepath,
      dirname: _path().default.dirname(filepath),
      options: {}
    };
  }

  let options;

  try {
    LOADING_CONFIGS.add(filepath);

    const configModule = require(filepath);

    options = configModule && configModule.__esModule ? configModule.default || undefined : configModule;
  } catch (err) {
    err.message = `${filepath}: Error while loading config - ${err.message}`;
    throw err;
  } finally {
    LOADING_CONFIGS.delete(filepath);
  }

  if (typeof options === "function") {
    options = options((0, _configApi.default)(cache));
    if (!cache.configured()) throwConfigError();
  }

  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new Error(`${filepath}: Configuration should be an exported JavaScript object.`);
  }

  if (typeof options.then === "function") {
    throw new Error(`You appear to be using an async configuration, ` + `which your current version of Babel does not support. ` + `We may add support for this in the future, ` + `but if you're on the most recent version of @babel/core and still ` + `seeing this error, then you'll need to synchronously return your config.`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});
const packageToBabelConfig = (0, _caching.makeWeakCache)(file => {
  const babel = file.options["babel"];
  if (typeof babel === "undefined") return null;

  if (typeof babel !== "object" || Array.isArray(babel) || babel === null) {
    throw new Error(`${file.filepath}: .babel property must be an object`);
  }

  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: babel
  };
});
const readConfigJSON5 = (0, _utils.makeStaticFileCache)((filepath, content) => {
  let options;

  try {
    options = _json().default.parse(content);
  } catch (err) {
    err.message = `${filepath}: Error while parsing config - ${err.message}`;
    throw err;
  }

  if (!options) throw new Error(`${filepath}: No config detected`);

  if (typeof options !== "object") {
    throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
  }

  if (Array.isArray(options)) {
    throw new Error(`${filepath}: Expected config object but found array`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});
const readIgnoreConfig = (0, _utils.makeStaticFileCache)((filepath, content) => {
  const ignoreDir = _path().default.dirname(filepath);

  const ignorePatterns = content.split("\n").map(line => line.replace(/#(.*?)$/, "").trim()).filter(line => !!line);

  for (const pattern of ignorePatterns) {
    if (pattern[0] === "!") {
      throw new Error(`Negation of file paths is not supported.`);
    }
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    ignore: ignorePatterns.map(pattern => (0, _patternToRegex.default)(pattern, ignoreDir))
  };
});

function throwConfigError() {
  throw new Error(`\
Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured
for various types of caching, using the first param of their handler functions:

module.exports = function(api) {
  // The API exposes the following:

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // Don't cache at all. Not recommended because it will be very slow.
  api.cache(false);

  // Cached based on the value of some function. If this function returns a value different from
  // a previously-encountered value, the plugins will re-evaluate.
  var env = api.cache(() => process.env.NODE_ENV);

  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for
  // any possible NODE_ENV value that might come up during plugin execution.
  var isProd = api.cache(() => process.env.NODE_ENV === "production");

  // .cache(fn) will perform a linear search though instances to find the matching plugin based
  // based on previous instantiated plugins. If you want to recreate the plugin and discard the
  // previous instance whenever something changes, you may use:
  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");

  // Note, we also expose the following more-verbose versions of the above examples:
  api.cache.forever(); // api.cache(true)
  api.cache.never();   // api.cache(false)
  api.cache.using(fn); // api.cache(fn)

  // Return the value that will be cached.
  return { };
};`);
}