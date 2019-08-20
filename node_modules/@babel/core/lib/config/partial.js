"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadPrivatePartialConfig;
exports.loadPartialConfig = loadPartialConfig;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _plugin = _interopRequireDefault(require("./plugin"));

var _util = require("./util");

var _item = require("./item");

var _configChain = require("./config-chain");

var _environment = require("./helpers/environment");

var _options = require("./validation/options");

var _files = require("./files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveRootMode(rootDir, rootMode) {
  switch (rootMode) {
    case "root":
      return rootDir;

    case "upward-optional":
      {
        const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
        return upwardRootDir === null ? rootDir : upwardRootDir;
      }

    case "upward":
      {
        const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
        if (upwardRootDir !== null) return upwardRootDir;
        throw Object.assign(new Error(`Babel was run with rootMode:"upward" but a root could not ` + `be found when searching upward from "${rootDir}"`), {
          code: "BABEL_ROOT_NOT_FOUND",
          dirname: rootDir
        });
      }

    default:
      throw new Error(`Assertion failure - unknown rootMode value`);
  }
}

function loadPrivatePartialConfig(inputOpts) {
  if (inputOpts != null && (typeof inputOpts !== "object" || Array.isArray(inputOpts))) {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  const args = inputOpts ? (0, _options.validate)("arguments", inputOpts) : {};
  const {
    envName = (0, _environment.getEnv)(),
    cwd = ".",
    root: rootDir = ".",
    rootMode = "root",
    caller
  } = args;

  const absoluteCwd = _path().default.resolve(cwd);

  const absoluteRootDir = resolveRootMode(_path().default.resolve(absoluteCwd, rootDir), rootMode);
  const context = {
    filename: typeof args.filename === "string" ? _path().default.resolve(cwd, args.filename) : undefined,
    cwd: absoluteCwd,
    root: absoluteRootDir,
    envName,
    caller
  };
  const configChain = (0, _configChain.buildRootChain)(args, context);
  if (!configChain) return null;
  const options = {};
  configChain.options.forEach(opts => {
    (0, _util.mergeOptions)(options, opts);
  });
  options.babelrc = false;
  options.configFile = false;
  options.passPerPreset = false;
  options.envName = context.envName;
  options.cwd = context.cwd;
  options.root = context.root;
  options.filename = typeof context.filename === "string" ? context.filename : undefined;
  options.plugins = configChain.plugins.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor));
  options.presets = configChain.presets.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor));
  return {
    options,
    context,
    ignore: configChain.ignore,
    babelrc: configChain.babelrc,
    config: configChain.config
  };
}

function loadPartialConfig(inputOpts) {
  const result = loadPrivatePartialConfig(inputOpts);
  if (!result) return null;
  const {
    options,
    babelrc,
    ignore,
    config
  } = result;
  (options.plugins || []).forEach(item => {
    if (item.value instanceof _plugin.default) {
      throw new Error("Passing cached plugin instances is not supported in " + "babel.loadPartialConfig()");
    }
  });
  return new PartialConfig(options, babelrc ? babelrc.filepath : undefined, ignore ? ignore.filepath : undefined, config ? config.filepath : undefined);
}

class PartialConfig {
  constructor(options, babelrc, ignore, config) {
    this.options = options;
    this.babelignore = ignore;
    this.babelrc = babelrc;
    this.config = config;
    Object.freeze(this);
  }

  hasFilesystemConfig() {
    return this.babelrc !== undefined || this.config !== undefined;
  }

}

Object.freeze(PartialConfig.prototype);