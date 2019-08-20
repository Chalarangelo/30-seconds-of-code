'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _vm() {
  const data = _interopRequireDefault(require('vm'));

  _vm = function _vm() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _gracefulFs() {
  const data = _interopRequireDefault(require('graceful-fs'));

  _gracefulFs = function _gracefulFs() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _babelPluginIstanbul() {
  const data = _interopRequireDefault(require('babel-plugin-istanbul'));

  _babelPluginIstanbul = function _babelPluginIstanbul() {
    return data;
  };

  return data;
}

function _convertSourceMap() {
  const data = _interopRequireDefault(require('convert-source-map'));

  _convertSourceMap = function _convertSourceMap() {
    return data;
  };

  return data;
}

function _jestHasteMap() {
  const data = _interopRequireDefault(require('jest-haste-map'));

  _jestHasteMap = function _jestHasteMap() {
    return data;
  };

  return data;
}

function _fastJsonStableStringify() {
  const data = _interopRequireDefault(require('fast-json-stable-stringify'));

  _fastJsonStableStringify = function _fastJsonStableStringify() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _writeFileAtomic() {
  const data = _interopRequireDefault(require('write-file-atomic'));

  _writeFileAtomic = function _writeFileAtomic() {
    return data;
  };

  return data;
}

function _realpathNative() {
  const data = require('realpath-native');

  _realpathNative = function _realpathNative() {
    return data;
  };

  return data;
}

function _pirates() {
  const data = require('pirates');

  _pirates = function _pirates() {
    return data;
  };

  return data;
}

var _shouldInstrument = _interopRequireDefault(require('./shouldInstrument'));

var _enhanceUnexpectedTokenMessage = _interopRequireDefault(
  require('./enhanceUnexpectedTokenMessage')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

// Use `require` to avoid TS rootDir
const _require = require('../package.json'),
  VERSION = _require.version; // This data structure is used to avoid recalculating some data every time that
// we need to transform a file. Since ScriptTransformer is instantiated for each
// file we need to keep this object in the local scope of this module.

const projectCaches = new WeakMap(); // To reset the cache for specific changesets (rather than package version).

const CACHE_VERSION = '1';

function waitForPromiseWithCleanup(_x, _x2) {
  return _waitForPromiseWithCleanup.apply(this, arguments);
}

function _waitForPromiseWithCleanup() {
  _waitForPromiseWithCleanup = _asyncToGenerator(function*(promise, cleanup) {
    try {
      yield promise;
    } finally {
      cleanup();
    }
  });
  return _waitForPromiseWithCleanup.apply(this, arguments);
}

class ScriptTransformer {
  constructor(config) {
    _defineProperty(this, '_cache', void 0);

    _defineProperty(this, '_config', void 0);

    _defineProperty(this, '_transformCache', void 0);

    _defineProperty(this, '_transformConfigCache', void 0);

    this._config = config;
    this._transformCache = new Map();
    this._transformConfigCache = new Map();
    let projectCache = projectCaches.get(config);

    if (!projectCache) {
      projectCache = {
        configString: (0, _fastJsonStableStringify().default)(this._config),
        ignorePatternsRegExp: calcIgnorePatternRegExp(this._config),
        transformRegExp: calcTransformRegExp(this._config),
        transformedFiles: new Map()
      };
      projectCaches.set(config, projectCache);
    }

    this._cache = projectCache;
  }

  _getCacheKey(fileData, filename, instrument) {
    const configString = this._cache.configString;

    const transformer = this._getTransformer(filename);

    if (transformer && typeof transformer.getCacheKey === 'function') {
      return _crypto()
        .default.createHash('md5')
        .update(
          transformer.getCacheKey(fileData, filename, configString, {
            config: this._config,
            instrument,
            rootDir: this._config.rootDir
          })
        )
        .update(CACHE_VERSION)
        .digest('hex');
    } else {
      return _crypto()
        .default.createHash('md5')
        .update(fileData)
        .update(configString)
        .update(instrument ? 'instrument' : '')
        .update(filename)
        .update(CACHE_VERSION)
        .digest('hex');
    }
  }

  _getFileCachePath(filename, content, instrument) {
    const baseCacheDir = _jestHasteMap().default.getCacheFilePath(
      this._config.cacheDirectory,
      'jest-transform-cache-' + this._config.name,
      VERSION
    );

    const cacheKey = this._getCacheKey(content, filename, instrument); // Create sub folders based on the cacheKey to avoid creating one
    // directory with many files.

    const cacheDir = _path().default.join(
      baseCacheDir,
      cacheKey[0] + cacheKey[1]
    );

    const cacheFilenamePrefix = _path()
      .default.basename(filename, _path().default.extname(filename))
      .replace(/\W/g, '');

    const cachePath = (0, _slash().default)(
      _path().default.join(cacheDir, cacheFilenamePrefix + '_' + cacheKey)
    );
    (0, _jestUtil().createDirectory)(cacheDir);
    return cachePath;
  }

  _getTransformPath(filename) {
    const transformRegExp = this._cache.transformRegExp;

    if (!transformRegExp) {
      return undefined;
    }

    for (let i = 0; i < transformRegExp.length; i++) {
      if (transformRegExp[i][0].test(filename)) {
        const transformPath = transformRegExp[i][1];

        this._transformConfigCache.set(transformPath, transformRegExp[i][2]);

        return transformPath;
      }
    }

    return undefined;
  }

  _getTransformer(filename) {
    let transform = null;

    if (!this._config.transform || !this._config.transform.length) {
      return null;
    }

    const transformPath = this._getTransformPath(filename);

    if (transformPath) {
      const transformer = this._transformCache.get(transformPath);

      if (transformer != null) {
        return transformer;
      }

      transform = require(transformPath);

      const transformerConfig = this._transformConfigCache.get(transformPath);

      if (typeof transform.createTransformer === 'function') {
        transform = transform.createTransformer(transformerConfig);
      }

      if (typeof transform.process !== 'function') {
        throw new TypeError(
          'Jest: a transform must export a `process` function.'
        );
      }

      this._transformCache.set(transformPath, transform);
    }

    return transform;
  }

  _instrumentFile(filename, content) {
    const result = (0, _core().transformSync)(content, {
      auxiliaryCommentBefore: ' istanbul ignore next ',
      babelrc: false,
      caller: {
        name: '@jest/transform',
        supportsStaticESM: false
      },
      configFile: false,
      filename,
      plugins: [
        [
          _babelPluginIstanbul().default,
          {
            compact: false,
            // files outside `cwd` will not be instrumented
            cwd: this._config.rootDir,
            exclude: [],
            useInlineSourceMaps: false
          }
        ]
      ]
    });

    if (result) {
      const code = result.code;

      if (code) {
        return code;
      }
    }

    return content;
  }

  _getRealPath(filepath) {
    try {
      return (0, _realpathNative().sync)(filepath) || filepath;
    } catch (err) {
      return filepath;
    }
  } // We don't want to expose transformers to the outside - this function is just
  // to warm up `this._transformCache`

  preloadTransformer(filepath) {
    this._getTransformer(filepath);
  }

  transformSource(filepath, content, instrument) {
    const filename = this._getRealPath(filepath);

    const transform = this._getTransformer(filename);

    const cacheFilePath = this._getFileCachePath(filename, content, instrument);

    let sourceMapPath = cacheFilePath + '.map'; // Ignore cache if `config.cache` is set (--no-cache)

    let code = this._config.cache ? readCodeCacheFile(cacheFilePath) : null;
    const shouldCallTransform = transform && this.shouldTransform(filename); // That means that the transform has a custom instrumentation
    // logic and will handle it based on `config.collectCoverage` option

    const transformWillInstrument =
      shouldCallTransform && transform && transform.canInstrument; // If we handle the coverage instrumentation, we should try to map code
    // coverage against original source with any provided source map

    const mapCoverage = instrument && !transformWillInstrument;

    if (code) {
      // This is broken: we return the code, and a path for the source map
      // directly from the cache. But, nothing ensures the source map actually
      // matches that source code. They could have gotten out-of-sync in case
      // two separate processes write concurrently to the same cache files.
      return {
        code,
        mapCoverage,
        sourceMapPath
      };
    }

    let transformed = {
      code: content,
      map: null
    };

    if (transform && shouldCallTransform) {
      const processed = transform.process(content, filename, this._config, {
        instrument
      });

      if (typeof processed === 'string') {
        transformed.code = processed;
      } else if (processed != null && typeof processed.code === 'string') {
        transformed = processed;
      } else {
        throw new TypeError(
          "Jest: a transform's `process` function must return a string, " +
            'or an object with `code` key containing this string.'
        );
      }
    }

    if (!transformed.map) {
      //Could be a potential freeze here.
      //See: https://github.com/facebook/jest/pull/5177#discussion_r158883570
      const inlineSourceMap = _convertSourceMap().default.fromSource(
        transformed.code
      );

      if (inlineSourceMap) {
        transformed.map = inlineSourceMap.toJSON();
      }
    }

    if (!transformWillInstrument && instrument) {
      code = this._instrumentFile(filename, transformed.code);
    } else {
      code = transformed.code;
    }

    if (transformed.map) {
      const sourceMapContent =
        typeof transformed.map === 'string'
          ? transformed.map
          : JSON.stringify(transformed.map);
      writeCacheFile(sourceMapPath, sourceMapContent);
    } else {
      sourceMapPath = null;
    }

    writeCodeCacheFile(cacheFilePath, code);
    return {
      code,
      mapCoverage,
      sourceMapPath
    };
  }

  _transformAndBuildScript(filename, options, instrument, fileSource) {
    const isInternalModule = !!(options && options.isInternalModule);
    const isCoreModule = !!(options && options.isCoreModule);
    const content = stripShebang(
      fileSource || _gracefulFs().default.readFileSync(filename, 'utf8')
    );
    let wrappedCode;
    let sourceMapPath = null;
    let mapCoverage = false;
    const willTransform =
      !isInternalModule &&
      !isCoreModule &&
      (this.shouldTransform(filename) || instrument);

    try {
      const extraGlobals = (options && options.extraGlobals) || [];

      if (willTransform) {
        const transformedSource = this.transformSource(
          filename,
          content,
          instrument
        );
        wrappedCode = wrap(transformedSource.code, ...extraGlobals);
        sourceMapPath = transformedSource.sourceMapPath;
        mapCoverage = transformedSource.mapCoverage;
      } else {
        wrappedCode = wrap(content, ...extraGlobals);
      }

      return {
        mapCoverage,
        script: new (_vm()).default.Script(wrappedCode, {
          displayErrors: true,
          filename: isCoreModule ? 'jest-nodejs-core-' + filename : filename
        }),
        sourceMapPath
      };
    } catch (e) {
      if (e.codeFrame) {
        e.stack = e.message + '\n' + e.codeFrame;
      }

      if (
        e instanceof SyntaxError &&
        e.message.includes('Unexpected token') &&
        !e.message.includes(' expected')
      ) {
        throw (0, _enhanceUnexpectedTokenMessage.default)(e);
      }

      throw e;
    }
  }

  transform(filename, options, fileSource) {
    let scriptCacheKey = undefined;
    let instrument = false;

    if (!options.isCoreModule) {
      instrument = (0, _shouldInstrument.default)(
        filename,
        options,
        this._config
      );
      scriptCacheKey = getScriptCacheKey(filename, instrument);

      const result = this._cache.transformedFiles.get(scriptCacheKey);

      if (result) {
        return result;
      }
    }

    const result = this._transformAndBuildScript(
      filename,
      options,
      instrument,
      fileSource
    );

    if (scriptCacheKey) {
      this._cache.transformedFiles.set(scriptCacheKey, result);
    }

    return result;
  }

  transformJson(filename, options, fileSource) {
    const isInternalModule = options.isInternalModule;
    const isCoreModule = options.isCoreModule;
    const willTransform =
      !isInternalModule && !isCoreModule && this.shouldTransform(filename);

    if (willTransform) {
      const _this$transformSource = this.transformSource(
          filename,
          fileSource,
          false
        ),
        transformedJsonSource = _this$transformSource.code;

      return transformedJsonSource;
    }

    return fileSource;
  }

  requireAndTranspileModule(moduleName, callback) {
    // Load the transformer to avoid a cycle where we need to load a
    // transformer in order to transform it in the require hooks
    this.preloadTransformer(moduleName);
    let transforming = false;
    const revertHook = (0, _pirates().addHook)(
      (code, filename) => {
        try {
          transforming = true;
          return this.transformSource(filename, code, false).code || code;
        } finally {
          transforming = false;
        }
      },
      {
        exts: [_path().default.extname(moduleName)],
        ignoreNodeModules: false,
        matcher: filename => {
          if (transforming) {
            // Don't transform any dependency required by the transformer itself
            return false;
          }

          return this.shouldTransform(filename);
        }
      }
    );

    const module = require(moduleName);

    if (!callback) {
      revertHook();
      return module;
    }

    try {
      const cbResult = callback(module);

      if ((0, _jestUtil().isPromise)(cbResult)) {
        return waitForPromiseWithCleanup(cbResult, revertHook).then(
          () => module
        );
      }
    } finally {
      revertHook();
    }

    return module;
  }
  /**
   * @deprecated use `this.shouldTransform` instead
   */
  // @ts-ignore: Unused and private - remove in Jest 25

  _shouldTransform(filename) {
    return this.shouldTransform(filename);
  }

  shouldTransform(filename) {
    const ignoreRegexp = this._cache.ignorePatternsRegExp;
    const isIgnored = ignoreRegexp ? ignoreRegexp.test(filename) : false;
    return (
      !!this._config.transform && !!this._config.transform.length && !isIgnored
    );
  }
}

exports.default = ScriptTransformer;

_defineProperty(ScriptTransformer, 'EVAL_RESULT_VARIABLE', void 0);

const removeFile = path => {
  try {
    _gracefulFs().default.unlinkSync(path);
  } catch (e) {}
};

const stripShebang = content => {
  // If the file data starts with a shebang remove it. Leaves the empty line
  // to keep stack trace line numbers correct.
  if (content.startsWith('#!')) {
    return content.replace(/^#!.*/, '');
  } else {
    return content;
  }
};
/**
 * This is like `writeCacheFile` but with an additional sanity checksum. We
 * cannot use the same technique for source maps because we expose source map
 * cache file paths directly to callsites, with the expectation they can read
 * it right away. This is not a great system, because source map cache file
 * could get corrupted, out-of-sync, etc.
 */

function writeCodeCacheFile(cachePath, code) {
  const checksum = _crypto()
    .default.createHash('md5')
    .update(code)
    .digest('hex');

  writeCacheFile(cachePath, checksum + '\n' + code);
}
/**
 * Read counterpart of `writeCodeCacheFile`. We verify that the content of the
 * file matches the checksum, in case some kind of corruption happened. This
 * could happen if an older version of `jest-runtime` writes non-atomically to
 * the same cache, for example.
 */

function readCodeCacheFile(cachePath) {
  const content = readCacheFile(cachePath);

  if (content == null) {
    return null;
  }

  const code = content.substr(33);

  const checksum = _crypto()
    .default.createHash('md5')
    .update(code)
    .digest('hex');

  if (checksum === content.substr(0, 32)) {
    return code;
  }

  return null;
}
/**
 * Writing to the cache atomically relies on 'rename' being atomic on most
 * file systems. Doing atomic write reduces the risk of corruption by avoiding
 * two processes to write to the same file at the same time. It also reduces
 * the risk of reading a file that's being overwritten at the same time.
 */

const writeCacheFile = (cachePath, fileData) => {
  try {
    _writeFileAtomic().default.sync(cachePath, fileData, {
      encoding: 'utf8'
    });
  } catch (e) {
    if (cacheWriteErrorSafeToIgnore(e, cachePath)) {
      return;
    }

    e.message =
      'jest: failed to cache transform results in: ' +
      cachePath +
      '\nFailure message: ' +
      e.message;
    removeFile(cachePath);
    throw e;
  }
};
/**
 * On Windows, renames are not atomic, leading to EPERM exceptions when two
 * processes attempt to rename to the same target file at the same time.
 * If the target file exists we can be reasonably sure another process has
 * legitimately won a cache write race and ignore the error.
 */

const cacheWriteErrorSafeToIgnore = (e, cachePath) =>
  process.platform === 'win32' &&
  e.code === 'EPERM' &&
  _gracefulFs().default.existsSync(cachePath);

const readCacheFile = cachePath => {
  if (!_gracefulFs().default.existsSync(cachePath)) {
    return null;
  }

  let fileData;

  try {
    fileData = _gracefulFs().default.readFileSync(cachePath, 'utf8');
  } catch (e) {
    e.message =
      'jest: failed to read cache file: ' +
      cachePath +
      '\nFailure message: ' +
      e.message;
    removeFile(cachePath);
    throw e;
  }

  if (fileData == null) {
    // We must have somehow created the file but failed to write to it,
    // let's delete it and retry.
    removeFile(cachePath);
  }

  return fileData;
};

const getScriptCacheKey = (filename, instrument) => {
  const mtime = _gracefulFs().default.statSync(filename).mtime;

  return filename + '_' + mtime.getTime() + (instrument ? '_instrumented' : '');
};

const calcIgnorePatternRegExp = config => {
  if (
    !config.transformIgnorePatterns ||
    config.transformIgnorePatterns.length === 0
  ) {
    return undefined;
  }

  return new RegExp(config.transformIgnorePatterns.join('|'));
};

const calcTransformRegExp = config => {
  if (!config.transform.length) {
    return undefined;
  }

  const transformRegexp = [];

  for (let i = 0; i < config.transform.length; i++) {
    transformRegexp.push([
      new RegExp(config.transform[i][0]),
      config.transform[i][1],
      config.transform[i][2]
    ]);
  }

  return transformRegexp;
};

const wrap = (content, ...extras) => {
  const globals = new Set([
    'module',
    'exports',
    'require',
    '__dirname',
    '__filename',
    'global',
    'jest',
    ...extras
  ]);
  return (
    '({"' +
    ScriptTransformer.EVAL_RESULT_VARIABLE +
    `":function(${Array.from(globals).join(',')}){` +
    content +
    '\n}});'
  );
}; // TODO: Can this be added to the static property?

ScriptTransformer.EVAL_RESULT_VARIABLE = 'Object.<anonymous>';
