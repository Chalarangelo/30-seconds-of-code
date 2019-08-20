"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPresetChain = buildPresetChain;
exports.buildRootChain = buildRootChain;
exports.buildPresetChainWalker = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

var _options = require("./validation/options");

var _patternToRegex = _interopRequireDefault(require("./pattern-to-regex"));

var _files = require("./files");

var _caching = require("./caching");

var _configDescriptors = require("./config-descriptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:config:config-chain");

function buildPresetChain(arg, context) {
  const chain = buildPresetChainWalker(arg, context);
  if (!chain) return null;
  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => normalizeOptions(o))
  };
}

const buildPresetChainWalker = makeChainWalker({
  init: arg => arg,
  root: preset => loadPresetDescriptors(preset),
  env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
  overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
  overridesEnv: (preset, index, envName) => loadPresetOverridesEnvDescriptors(preset)(index)(envName)
});
exports.buildPresetChainWalker = buildPresetChainWalker;
const loadPresetDescriptors = (0, _caching.makeWeakCache)(preset => buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors));
const loadPresetEnvDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(envName => buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName)));
const loadPresetOverridesDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(index => buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index)));
const loadPresetOverridesEnvDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(index => (0, _caching.makeStrongCache)(envName => buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName))));

function buildRootChain(opts, context) {
  const programmaticChain = loadProgrammaticChain({
    options: opts,
    dirname: context.cwd
  }, context);
  if (!programmaticChain) return null;
  let configFile;

  if (typeof opts.configFile === "string") {
    configFile = (0, _files.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller);
  } else if (opts.configFile !== false) {
    configFile = (0, _files.findRootConfig)(context.root, context.envName, context.caller);
  }

  let {
    babelrc,
    babelrcRoots
  } = opts;
  let babelrcRootsDirectory = context.cwd;
  const configFileChain = emptyChain();

  if (configFile) {
    const validatedFile = validateConfigFile(configFile);
    const result = loadFileChain(validatedFile, context);
    if (!result) return null;

    if (babelrc === undefined) {
      babelrc = validatedFile.options.babelrc;
    }

    if (babelrcRoots === undefined) {
      babelrcRootsDirectory = validatedFile.dirname;
      babelrcRoots = validatedFile.options.babelrcRoots;
    }

    mergeChain(configFileChain, result);
  }

  const pkgData = typeof context.filename === "string" ? (0, _files.findPackageData)(context.filename) : null;
  let ignoreFile, babelrcFile;
  const fileChain = emptyChain();

  if ((babelrc === true || babelrc === undefined) && pkgData && babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory)) {
    ({
      ignore: ignoreFile,
      config: babelrcFile
    } = (0, _files.findRelativeConfig)(pkgData, context.envName, context.caller));

    if (ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) {
      return null;
    }

    if (babelrcFile) {
      const result = loadFileChain(validateBabelrcFile(babelrcFile), context);
      if (!result) return null;
      mergeChain(fileChain, result);
    }
  }

  const chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => normalizeOptions(o)),
    ignore: ignoreFile || undefined,
    babelrc: babelrcFile || undefined,
    config: configFile || undefined
  };
}

function babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
  if (typeof babelrcRoots === "boolean") return babelrcRoots;
  const absoluteRoot = context.root;

  if (babelrcRoots === undefined) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  let babelrcPatterns = babelrcRoots;
  if (!Array.isArray(babelrcPatterns)) babelrcPatterns = [babelrcPatterns];
  babelrcPatterns = babelrcPatterns.map(pat => {
    return typeof pat === "string" ? _path().default.resolve(babelrcRootsDirectory, pat) : pat;
  });

  if (babelrcPatterns.length === 1 && babelrcPatterns[0] === absoluteRoot) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  return babelrcPatterns.some(pat => {
    if (typeof pat === "string") {
      pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory);
    }

    return pkgData.directories.some(directory => {
      return matchPattern(pat, babelrcRootsDirectory, directory, context);
    });
  });
}

const validateConfigFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("configfile", file.options)
}));
const validateBabelrcFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("babelrcfile", file.options)
}));
const validateExtendFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("extendsfile", file.options)
}));
const loadProgrammaticChain = makeChainWalker({
  root: input => buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors),
  env: (input, envName) => buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName),
  overrides: (input, index) => buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index),
  overridesEnv: (input, index, envName) => buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName)
});
const loadFileChain = makeChainWalker({
  root: file => loadFileDescriptors(file),
  env: (file, envName) => loadFileEnvDescriptors(file)(envName),
  overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
  overridesEnv: (file, index, envName) => loadFileOverridesEnvDescriptors(file)(index)(envName)
});
const loadFileDescriptors = (0, _caching.makeWeakCache)(file => buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors));
const loadFileEnvDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(envName => buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName)));
const loadFileOverridesDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(index => buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index)));
const loadFileOverridesEnvDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(index => (0, _caching.makeStrongCache)(envName => buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName))));

function buildRootDescriptors({
  dirname,
  options
}, alias, descriptors) {
  return descriptors(dirname, options, alias);
}

function buildEnvDescriptors({
  dirname,
  options
}, alias, descriptors, envName) {
  const opts = options.env && options.env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
}

function buildOverrideDescriptors({
  dirname,
  options
}, alias, descriptors, index) {
  const opts = options.overrides && options.overrides[index];
  if (!opts) throw new Error("Assertion failure - missing override");
  return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
}

function buildOverrideEnvDescriptors({
  dirname,
  options
}, alias, descriptors, index, envName) {
  const override = options.overrides && options.overrides[index];
  if (!override) throw new Error("Assertion failure - missing override");
  const opts = override.env && override.env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
}

function makeChainWalker({
  root,
  env,
  overrides,
  overridesEnv
}) {
  return (input, context, files = new Set()) => {
    const {
      dirname
    } = input;
    const flattenedConfigs = [];
    const rootOpts = root(input);

    if (configIsApplicable(rootOpts, dirname, context)) {
      flattenedConfigs.push(rootOpts);
      const envOpts = env(input, context.envName);

      if (envOpts && configIsApplicable(envOpts, dirname, context)) {
        flattenedConfigs.push(envOpts);
      }

      (rootOpts.options.overrides || []).forEach((_, index) => {
        const overrideOps = overrides(input, index);

        if (configIsApplicable(overrideOps, dirname, context)) {
          flattenedConfigs.push(overrideOps);
          const overrideEnvOpts = overridesEnv(input, index, context.envName);

          if (overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context)) {
            flattenedConfigs.push(overrideEnvOpts);
          }
        }
      });
    }

    if (flattenedConfigs.some(({
      options: {
        ignore,
        only
      }
    }) => shouldIgnore(context, ignore, only, dirname))) {
      return null;
    }

    const chain = emptyChain();

    for (const op of flattenedConfigs) {
      if (!mergeExtendsChain(chain, op.options, dirname, context, files)) {
        return null;
      }

      mergeChainOpts(chain, op);
    }

    return chain;
  };
}

function mergeExtendsChain(chain, opts, dirname, context, files) {
  if (opts.extends === undefined) return true;
  const file = (0, _files.loadConfig)(opts.extends, dirname, context.envName, context.caller);

  if (files.has(file)) {
    throw new Error(`Configuration cycle detected loading ${file.filepath}.\n` + `File already loaded following the config chain:\n` + Array.from(files, file => ` - ${file.filepath}`).join("\n"));
  }

  files.add(file);
  const fileChain = loadFileChain(validateExtendFile(file), context, files);
  files.delete(file);
  if (!fileChain) return false;
  mergeChain(chain, fileChain);
  return true;
}

function mergeChain(target, source) {
  target.options.push(...source.options);
  target.plugins.push(...source.plugins);
  target.presets.push(...source.presets);
  return target;
}

function mergeChainOpts(target, {
  options,
  plugins,
  presets
}) {
  target.options.push(options);
  target.plugins.push(...plugins());
  target.presets.push(...presets());
  return target;
}

function emptyChain() {
  return {
    options: [],
    presets: [],
    plugins: []
  };
}

function normalizeOptions(opts) {
  const options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.overrides;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;
  delete options.test;
  delete options.include;
  delete options.exclude;

  if (options.hasOwnProperty("sourceMap")) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }

  return options;
}

function dedupDescriptors(items) {
  const map = new Map();
  const descriptors = [];

  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);

      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }

      let desc = nameMap.get(item.name);

      if (!desc) {
        desc = {
          value: item
        };
        descriptors.push(desc);
        if (!item.ownPass) nameMap.set(item.name, desc);
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({
        value: item
      });
    }
  }

  return descriptors.reduce((acc, desc) => {
    acc.push(desc.value);
    return acc;
  }, []);
}

function configIsApplicable({
  options
}, dirname, context) {
  return (options.test === undefined || configFieldIsApplicable(context, options.test, dirname)) && (options.include === undefined || configFieldIsApplicable(context, options.include, dirname)) && (options.exclude === undefined || !configFieldIsApplicable(context, options.exclude, dirname));
}

function configFieldIsApplicable(context, test, dirname) {
  const patterns = Array.isArray(test) ? test : [test];
  return matchesPatterns(context, patterns, dirname);
}

function shouldIgnore(context, ignore, only, dirname) {
  if (ignore && matchesPatterns(context, ignore, dirname)) {
    debug("Ignored %o because it matched one of %O from %o", context.filename, ignore, dirname);
    return true;
  }

  if (only && !matchesPatterns(context, only, dirname)) {
    debug("Ignored %o because it failed to match one of %O from %o", context.filename, only, dirname);
    return true;
  }

  return false;
}

function matchesPatterns(context, patterns, dirname) {
  return patterns.some(pattern => matchPattern(pattern, dirname, context.filename, context));
}

function matchPattern(pattern, dirname, pathToTest, context) {
  if (typeof pattern === "function") {
    return !!pattern(pathToTest, {
      dirname,
      envName: context.envName,
      caller: context.caller
    });
  }

  if (typeof pathToTest !== "string") {
    throw new Error(`Configuration contains string/RegExp pattern, but no filename was passed to Babel`);
  }

  if (typeof pattern === "string") {
    pattern = (0, _patternToRegex.default)(pattern, dirname);
  }

  return pattern.test(pathToTest);
}