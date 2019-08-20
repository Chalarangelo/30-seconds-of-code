'use strict';

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
    return data;
  };

  return data;
}

function _jestResolve() {
  const data = _interopRequireDefault(require('jest-resolve'));

  _jestResolve = function _jestResolve() {
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

function _jestRegexUtil() {
  const data = require('jest-regex-util');

  _jestRegexUtil = function _jestRegexUtil() {
    return data;
  };

  return data;
}

function _jestSnapshot() {
  const data = _interopRequireDefault(require('jest-snapshot'));

  _jestSnapshot = function _jestSnapshot() {
    return data;
  };

  return data;
}

function _transform() {
  const data = require('@jest/transform');

  _transform = function _transform() {
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

function _stripBom() {
  const data = _interopRequireDefault(require('strip-bom'));

  _stripBom = function _stripBom() {
    return data;
  };

  return data;
}

var _cli = require('./cli');

var _args = require('./cli/args');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
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

const testTimeoutSymbol = Symbol.for('TEST_TIMEOUT_SYMBOL');
const retryTimesSymbol = Symbol.for('RETRY_TIMES');

const NODE_MODULES = _path().default.sep + 'node_modules' + _path().default.sep;

const getModuleNameMapper = config => {
  if (
    Array.isArray(config.moduleNameMapper) &&
    config.moduleNameMapper.length
  ) {
    return config.moduleNameMapper.map(([regex, moduleName]) => ({
      moduleName,
      regex: new RegExp(regex)
    }));
  }

  return null;
};

const unmockRegExpCache = new WeakMap();
/* eslint-disable-next-line no-redeclare */

class Runtime {
  constructor(config, environment, resolver, cacheFS, coverageOptions) {
    _defineProperty(this, '_cacheFS', void 0);

    _defineProperty(this, '_config', void 0);

    _defineProperty(this, '_coverageOptions', void 0);

    _defineProperty(this, '_currentlyExecutingModulePath', void 0);

    _defineProperty(this, '_environment', void 0);

    _defineProperty(this, '_explicitShouldMock', void 0);

    _defineProperty(this, '_internalModuleRegistry', void 0);

    _defineProperty(this, '_isCurrentlyExecutingManualMock', void 0);

    _defineProperty(this, '_mockFactories', void 0);

    _defineProperty(this, '_mockMetaDataCache', void 0);

    _defineProperty(this, '_mockRegistry', void 0);

    _defineProperty(this, '_isolatedMockRegistry', void 0);

    _defineProperty(this, '_moduleMocker', void 0);

    _defineProperty(this, '_isolatedModuleRegistry', void 0);

    _defineProperty(this, '_moduleRegistry', void 0);

    _defineProperty(this, '_needsCoverageMapped', void 0);

    _defineProperty(this, '_resolver', void 0);

    _defineProperty(this, '_shouldAutoMock', void 0);

    _defineProperty(this, '_shouldMockModuleCache', void 0);

    _defineProperty(this, '_shouldUnmockTransitiveDependenciesCache', void 0);

    _defineProperty(this, '_sourceMapRegistry', void 0);

    _defineProperty(this, '_scriptTransformer', void 0);

    _defineProperty(this, '_transitiveShouldMock', void 0);

    _defineProperty(this, '_unmockList', void 0);

    _defineProperty(this, '_virtualMocks', void 0);

    this._cacheFS = cacheFS || Object.create(null);
    this._config = config;
    this._coverageOptions = coverageOptions || {
      changedFiles: undefined,
      collectCoverage: false,
      collectCoverageFrom: [],
      collectCoverageOnlyFrom: null
    };
    this._currentlyExecutingModulePath = '';
    this._environment = environment;
    this._explicitShouldMock = Object.create(null);
    this._internalModuleRegistry = new Map();
    this._isCurrentlyExecutingManualMock = null;
    this._mockFactories = Object.create(null);
    this._mockRegistry = new Map(); // during setup, this cannot be null (and it's fine to explode if it is)

    this._moduleMocker = this._environment.moduleMocker;
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;
    this._moduleRegistry = new Map();
    this._needsCoverageMapped = new Set();
    this._resolver = resolver;
    this._scriptTransformer = new (_transform()).ScriptTransformer(config);
    this._shouldAutoMock = config.automock;
    this._sourceMapRegistry = Object.create(null);
    this._virtualMocks = Object.create(null);
    this._mockMetaDataCache = Object.create(null);
    this._shouldMockModuleCache = Object.create(null);
    this._shouldUnmockTransitiveDependenciesCache = Object.create(null);
    this._transitiveShouldMock = Object.create(null);
    this._unmockList = unmockRegExpCache.get(config);

    if (!this._unmockList && config.unmockedModulePathPatterns) {
      this._unmockList = new RegExp(
        config.unmockedModulePathPatterns.join('|')
      );
      unmockRegExpCache.set(config, this._unmockList);
    }

    if (config.automock) {
      config.setupFiles.forEach(filePath => {
        if (filePath && filePath.includes(NODE_MODULES)) {
          const moduleID = this._resolver.getModuleID(
            this._virtualMocks,
            filePath
          );

          this._transitiveShouldMock[moduleID] = false;
        }
      });
    }

    this.resetModules();

    if (config.setupFiles.length) {
      for (let i = 0; i < config.setupFiles.length; i++) {
        this.requireModule(config.setupFiles[i]);
      }
    }
  } // TODO: Make this `static shouldInstrument = shouldInstrument;` after https://github.com/facebook/jest/issues/7846

  static shouldInstrument(filename, options, config) {
    return (0, _transform().shouldInstrument)(filename, options, config);
  }

  static createContext(config, options) {
    (0, _jestUtil().createDirectory)(config.cacheDirectory);
    const instance = Runtime.createHasteMap(config, {
      console: options.console,
      maxWorkers: options.maxWorkers,
      resetCache: !config.cache,
      watch: options.watch,
      watchman: options.watchman
    });
    return instance.build().then(
      hasteMap => ({
        config,
        hasteFS: hasteMap.hasteFS,
        moduleMap: hasteMap.moduleMap,
        resolver: Runtime.createResolver(config, hasteMap.moduleMap)
      }),
      error => {
        throw error;
      }
    );
  }

  static createHasteMap(config, options) {
    const ignorePatternParts = [
      ...config.modulePathIgnorePatterns,
      ...(options && options.watch ? config.watchPathIgnorePatterns : []),
      config.cacheDirectory.startsWith(config.rootDir + _path().default.sep) &&
        config.cacheDirectory
    ].filter(Boolean);
    const ignorePattern =
      ignorePatternParts.length > 0
        ? new RegExp(ignorePatternParts.join('|'))
        : undefined;
    return new (_jestHasteMap()).default({
      cacheDirectory: config.cacheDirectory,
      computeSha1: config.haste.computeSha1,
      console: options && options.console,
      dependencyExtractor: config.dependencyExtractor,
      extensions: [_jestSnapshot().default.EXTENSION].concat(
        config.moduleFileExtensions
      ),
      hasteImplModulePath: config.haste.hasteImplModulePath,
      ignorePattern,
      maxWorkers: (options && options.maxWorkers) || 1,
      mocksPattern: (0, _jestRegexUtil().escapePathForRegex)(
        _path().default.sep + '__mocks__' + _path().default.sep
      ),
      name: config.name,
      platforms: config.haste.platforms || ['ios', 'android'],
      providesModuleNodeModules: config.haste.providesModuleNodeModules,
      resetCache: options && options.resetCache,
      retainAllFiles: false,
      rootDir: config.rootDir,
      roots: config.roots,
      throwOnModuleCollision: config.haste.throwOnModuleCollision,
      useWatchman: options && options.watchman,
      watch: options && options.watch
    });
  }

  static createResolver(config, moduleMap) {
    return new (_jestResolve()).default(moduleMap, {
      browser: config.browser,
      defaultPlatform: config.haste.defaultPlatform,
      extensions: config.moduleFileExtensions.map(extension => '.' + extension),
      hasCoreModules: true,
      moduleDirectories: config.moduleDirectories,
      moduleNameMapper: getModuleNameMapper(config),
      modulePaths: config.modulePaths,
      platforms: config.haste.platforms,
      resolver: config.resolver,
      rootDir: config.rootDir
    });
  }

  static runCLI(args, info) {
    return (0, _cli.run)(args, info);
  }

  static getCLIOptions() {
    return _args.options;
  }

  requireModule(from, moduleName, options, isRequireActual) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    let modulePath; // Some old tests rely on this mocking behavior. Ideally we'll change this
    // to be more explicit.

    const moduleResource = moduleName && this._resolver.getModule(moduleName);

    const manualMock =
      moduleName && this._resolver.getMockModule(from, moduleName);

    if (
      (!options || !options.isInternalModule) &&
      !isRequireActual &&
      !moduleResource &&
      manualMock &&
      manualMock !== this._isCurrentlyExecutingManualMock &&
      this._explicitShouldMock[moduleID] !== false
    ) {
      modulePath = manualMock;
    }

    if (moduleName && this._resolver.isCoreModule(moduleName)) {
      return this._requireCoreModule(moduleName);
    }

    if (!modulePath) {
      modulePath = this._resolveModule(from, moduleName);
    }

    let moduleRegistry;

    if (!options || !options.isInternalModule) {
      if (
        this._moduleRegistry.get(modulePath) ||
        !this._isolatedModuleRegistry
      ) {
        moduleRegistry = this._moduleRegistry;
      } else {
        moduleRegistry = this._isolatedModuleRegistry;
      }
    } else {
      moduleRegistry = this._internalModuleRegistry;
    }

    const module = moduleRegistry.get(modulePath);

    if (module) {
      return module.exports;
    } // We must register the pre-allocated module object first so that any
    // circular dependencies that may arise while evaluating the module can
    // be satisfied.

    const localModule = {
      children: [],
      exports: {},
      filename: modulePath,
      id: modulePath,
      loaded: false
    };
    moduleRegistry.set(modulePath, localModule);

    this._loadModule(
      localModule,
      from,
      moduleName,
      modulePath,
      options,
      moduleRegistry
    );

    return localModule.exports;
  }

  requireInternalModule(from, to) {
    return this.requireModule(from, to, {
      isInternalModule: true
    });
  }

  requireActual(from, moduleName) {
    return this.requireModule(from, moduleName, undefined, true);
  }

  requireMock(from, moduleName) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    if (
      this._isolatedMockRegistry &&
      this._isolatedMockRegistry.get(moduleID)
    ) {
      return this._isolatedMockRegistry.get(moduleID);
    } else if (this._mockRegistry.get(moduleID)) {
      return this._mockRegistry.get(moduleID);
    }

    const mockRegistry = this._isolatedMockRegistry || this._mockRegistry;

    if (moduleID in this._mockFactories) {
      const module = this._mockFactories[moduleID]();

      mockRegistry.set(moduleID, module);
      return module;
    }

    const manualMockOrStub = this._resolver.getMockModule(from, moduleName);

    let modulePath;

    if (manualMockOrStub) {
      modulePath = this._resolveModule(from, manualMockOrStub);
    } else {
      modulePath = this._resolveModule(from, moduleName);
    }

    let isManualMock =
      manualMockOrStub &&
      !this._resolver.resolveStubModuleName(from, moduleName);

    if (!isManualMock) {
      // If the actual module file has a __mocks__ dir sitting immediately next
      // to it, look to see if there is a manual mock for this file.
      //
      // subDir1/my_module.js
      // subDir1/__mocks__/my_module.js
      // subDir2/my_module.js
      // subDir2/__mocks__/my_module.js
      //
      // Where some other module does a relative require into each of the
      // respective subDir{1,2} directories and expects a manual mock
      // corresponding to that particular my_module.js file.
      const moduleDir = _path().default.dirname(modulePath);

      const moduleFileName = _path().default.basename(modulePath);

      const potentialManualMock = _path().default.join(
        moduleDir,
        '__mocks__',
        moduleFileName
      );

      if (_gracefulFs().default.existsSync(potentialManualMock)) {
        isManualMock = true;
        modulePath = potentialManualMock;
      }
    }

    if (isManualMock) {
      const localModule = {
        children: [],
        exports: {},
        filename: modulePath,
        id: modulePath,
        loaded: false
      };

      this._loadModule(
        localModule,
        from,
        moduleName,
        modulePath,
        undefined,
        mockRegistry
      );

      mockRegistry.set(moduleID, localModule.exports);
    } else {
      // Look for a real module to generate an automock from
      mockRegistry.set(moduleID, this._generateMock(from, moduleName));
    }

    return mockRegistry.get(moduleID);
  }

  _loadModule(
    localModule,
    from,
    moduleName,
    modulePath,
    options,
    moduleRegistry
  ) {
    if (_path().default.extname(modulePath) === '.json') {
      const text = (0, _stripBom().default)(
        _gracefulFs().default.readFileSync(modulePath, 'utf8')
      );

      const transformedFile = this._scriptTransformer.transformJson(
        modulePath,
        this._getFullTransformationOptions(options),
        text
      );

      localModule.exports = this._environment.global.JSON.parse(
        transformedFile
      );
    } else if (_path().default.extname(modulePath) === '.node') {
      localModule.exports = require(modulePath);
    } else {
      // Only include the fromPath if a moduleName is given. Else treat as root.
      const fromPath = moduleName ? from : null;

      this._execModule(localModule, options, moduleRegistry, fromPath);
    }

    localModule.loaded = true;
  }

  _getFullTransformationOptions(options) {
    return _objectSpread({}, options, {
      changedFiles: this._coverageOptions.changedFiles,
      collectCoverage: this._coverageOptions.collectCoverage,
      collectCoverageFrom: this._coverageOptions.collectCoverageFrom,
      collectCoverageOnlyFrom: this._coverageOptions.collectCoverageOnlyFrom,
      extraGlobals: this._config.extraGlobals || []
    });
  }

  requireModuleOrMock(from, moduleName) {
    try {
      if (this._shouldMock(from, moduleName)) {
        return this.requireMock(from, moduleName);
      } else {
        return this.requireModule(from, moduleName);
      }
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        const appendedMessage = (0, _helpers.findSiblingsWithFileExtension)(
          this._config.moduleFileExtensions,
          from,
          moduleName
        );

        if (appendedMessage) {
          e.message += appendedMessage;
        }
      }

      throw e;
    }
  }

  isolateModules(fn) {
    if (this._isolatedModuleRegistry || this._isolatedMockRegistry) {
      throw new Error(
        'isolateModules cannot be nested inside another isolateModules.'
      );
    }

    this._isolatedModuleRegistry = new Map();
    this._isolatedMockRegistry = new Map();
    fn();
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;
  }

  resetModules() {
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;

    this._mockRegistry.clear();

    this._moduleRegistry.clear();

    if (this._environment) {
      if (this._environment.global) {
        const envGlobal = this._environment.global;
        Object.keys(envGlobal).forEach(key => {
          const globalMock = envGlobal[key];

          if (
            ((typeof globalMock === 'object' && globalMock !== null) ||
              typeof globalMock === 'function') &&
            globalMock._isMockFunction === true
          ) {
            globalMock.mockClear();
          }
        });
      }

      if (this._environment.fakeTimers) {
        this._environment.fakeTimers.clearAllTimers();
      }
    }
  }

  getAllCoverageInfoCopy() {
    return (0, _jestUtil().deepCyclicCopy)(
      this._environment.global.__coverage__
    );
  }

  getSourceMapInfo(coveredFiles) {
    return Object.keys(this._sourceMapRegistry).reduce((result, sourcePath) => {
      if (
        coveredFiles.has(sourcePath) &&
        this._needsCoverageMapped.has(sourcePath) &&
        _gracefulFs().default.existsSync(this._sourceMapRegistry[sourcePath])
      ) {
        result[sourcePath] = this._sourceMapRegistry[sourcePath];
      }

      return result;
    }, {});
  }

  getSourceMaps() {
    return this._sourceMapRegistry;
  }

  setMock(from, moduleName, mockFactory, options) {
    if (options && options.virtual) {
      const mockPath = this._resolver.getModulePath(from, moduleName);

      this._virtualMocks[mockPath] = true;
    }

    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    this._explicitShouldMock[moduleID] = true;
    this._mockFactories[moduleID] = mockFactory;
  }

  restoreAllMocks() {
    this._moduleMocker.restoreAllMocks();
  }

  resetAllMocks() {
    this._moduleMocker.resetAllMocks();
  }

  clearAllMocks() {
    this._moduleMocker.clearAllMocks();
  }

  _resolveModule(from, to) {
    return to ? this._resolver.resolveModule(from, to) : from;
  }

  _requireResolve(from, moduleName, options = {}) {
    if (moduleName == null) {
      throw new Error(
        'The first argument to require.resolve must be a string. Received null or undefined.'
      );
    }

    const paths = options.paths;

    if (paths) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = paths[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const p = _step.value;

          const absolutePath = _path().default.resolve(from, '..', p);

          const module = this._resolver.resolveModuleFromDirIfExists(
            absolutePath,
            moduleName, // required to also resolve files without leading './' directly in the path
            {
              paths: [absolutePath]
            }
          );

          if (module) {
            return module;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      throw new Error(
        `Cannot resolve module '${moduleName}' from paths ['${paths.join(
          "', '"
        )}'] from ${from}`
      );
    }

    try {
      return this._resolveModule(from, moduleName);
    } catch (err) {
      const module = this._resolver.getMockModule(from, moduleName);

      if (module) {
        return module;
      } else {
        throw err;
      }
    }
  }

  _requireResolvePaths(from, moduleName) {
    if (moduleName == null) {
      throw new Error(
        'The first argument to require.resolve.paths must be a string. Received null or undefined.'
      );
    }

    if (!moduleName.length) {
      throw new Error(
        'The first argument to require.resolve.paths must not be the empty string.'
      );
    }

    if (moduleName[0] === '.') {
      return [_path().default.resolve(from, '..')];
    }

    if (this._resolver.isCoreModule(moduleName)) {
      return null;
    }

    return this._resolver.getModulePaths(_path().default.resolve(from, '..'));
  }

  _execModule(localModule, options, moduleRegistry, from) {
    // If the environment was disposed, prevent this module from being executed.
    if (!this._environment.global) {
      return;
    }

    const filename = localModule.filename;
    const lastExecutingModulePath = this._currentlyExecutingModulePath;
    this._currentlyExecutingModulePath = filename;
    const origCurrExecutingManualMock = this._isCurrentlyExecutingManualMock;
    this._isCurrentlyExecutingManualMock = filename;

    const dirname = _path().default.dirname(filename);

    localModule.children = [];
    Object.defineProperty(localModule, 'parent', {
      enumerable: true,

      get() {
        const key = from || '';
        return moduleRegistry.get(key) || null;
      }
    });
    localModule.paths = this._resolver.getModulePaths(dirname);
    Object.defineProperty(localModule, 'require', {
      value: this._createRequireImplementation(localModule, options)
    });
    const extraGlobals = this._config.extraGlobals || [];

    const transformedFile = this._scriptTransformer.transform(
      filename,
      this._getFullTransformationOptions(options),
      this._cacheFS[filename]
    );

    if (transformedFile.sourceMapPath) {
      this._sourceMapRegistry[filename] = transformedFile.sourceMapPath;

      if (transformedFile.mapCoverage) {
        this._needsCoverageMapped.add(filename);
      }
    }

    const runScript = this._environment.runScript(transformedFile.script);

    if (runScript === null) {
      this._logFormattedReferenceError(
        'You are trying to `import` a file after the Jest environment has been torn down.'
      );

      process.exitCode = 1;
      return;
    } //Wrapper

    runScript[_transform().ScriptTransformer.EVAL_RESULT_VARIABLE].call(
      localModule.exports,
      localModule, // module object
      localModule.exports, // module exports
      localModule.require, // require implementation
      dirname, // __dirname
      filename, // __filename
      this._environment.global, // global object
      this._createJestObjectFor(filename, localModule.require), // jest object
      ...extraGlobals.map(globalVariable => {
        if (this._environment.global[globalVariable]) {
          return this._environment.global[globalVariable];
        }

        throw new Error(
          `You have requested '${globalVariable}' as a global variable, but it was not present. Please check your config or your global environment.`
        );
      })
    );

    this._isCurrentlyExecutingManualMock = origCurrExecutingManualMock;
    this._currentlyExecutingModulePath = lastExecutingModulePath;
  }

  _requireCoreModule(moduleName) {
    if (moduleName === 'process') {
      return this._environment.global.process;
    }

    return require(moduleName);
  }

  _generateMock(from, moduleName) {
    const modulePath =
      this._resolver.resolveStubModuleName(from, moduleName) ||
      this._resolveModule(from, moduleName);

    if (!(modulePath in this._mockMetaDataCache)) {
      // This allows us to handle circular dependencies while generating an
      // automock
      this._mockMetaDataCache[modulePath] =
        this._moduleMocker.getMetadata({}) || {}; // In order to avoid it being possible for automocking to potentially
      // cause side-effects within the module environment, we need to execute
      // the module in isolation. This could cause issues if the module being
      // mocked has calls into side-effectful APIs on another module.

      const origMockRegistry = this._mockRegistry;
      const origModuleRegistry = this._moduleRegistry;
      this._mockRegistry = new Map();
      this._moduleRegistry = new Map();
      const moduleExports = this.requireModule(from, moduleName); // Restore the "real" module/mock registries

      this._mockRegistry = origMockRegistry;
      this._moduleRegistry = origModuleRegistry;

      const mockMetadata = this._moduleMocker.getMetadata(moduleExports);

      if (mockMetadata == null) {
        throw new Error(
          `Failed to get mock metadata: ${modulePath}\n\n` +
            `See: https://jestjs.io/docs/manual-mocks.html#content`
        );
      }

      this._mockMetaDataCache[modulePath] = mockMetadata;
    }

    return this._moduleMocker.generateFromMetadata(
      this._mockMetaDataCache[modulePath]
    );
  }

  _shouldMock(from, moduleName) {
    const explicitShouldMock = this._explicitShouldMock;

    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    const key = from + _path().default.delimiter + moduleID;

    if (moduleID in explicitShouldMock) {
      return explicitShouldMock[moduleID];
    }

    if (
      !this._shouldAutoMock ||
      this._resolver.isCoreModule(moduleName) ||
      this._shouldUnmockTransitiveDependenciesCache[key]
    ) {
      return false;
    }

    if (moduleID in this._shouldMockModuleCache) {
      return this._shouldMockModuleCache[moduleID];
    }

    let modulePath;

    try {
      modulePath = this._resolveModule(from, moduleName);
    } catch (e) {
      const manualMock = this._resolver.getMockModule(from, moduleName);

      if (manualMock) {
        this._shouldMockModuleCache[moduleID] = true;
        return true;
      }

      throw e;
    }

    if (this._unmockList && this._unmockList.test(modulePath)) {
      this._shouldMockModuleCache[moduleID] = false;
      return false;
    } // transitive unmocking for package managers that store flat packages (npm3)

    const currentModuleID = this._resolver.getModuleID(
      this._virtualMocks,
      from
    );

    if (
      this._transitiveShouldMock[currentModuleID] === false ||
      (from.includes(NODE_MODULES) &&
        modulePath.includes(NODE_MODULES) &&
        ((this._unmockList && this._unmockList.test(from)) ||
          explicitShouldMock[currentModuleID] === false))
    ) {
      this._transitiveShouldMock[moduleID] = false;
      this._shouldUnmockTransitiveDependenciesCache[key] = true;
      return false;
    }

    return (this._shouldMockModuleCache[moduleID] = true);
  }

  _createRequireImplementation(from, options) {
    // TODO: somehow avoid having to type the arguments - they should come from `NodeRequire/LocalModuleRequire.resolve`
    const resolve = (moduleName, options) =>
      this._requireResolve(from.filename, moduleName, options);

    resolve.paths = moduleName =>
      this._requireResolvePaths(from.filename, moduleName);

    const moduleRequire =
      options && options.isInternalModule
        ? moduleName => this.requireInternalModule(from.filename, moduleName)
        : this.requireModuleOrMock.bind(this, from.filename);
    moduleRequire.cache = Object.create(null);
    moduleRequire.extensions = Object.create(null);
    moduleRequire.requireActual = this.requireActual.bind(this, from.filename);
    moduleRequire.requireMock = this.requireMock.bind(this, from.filename);
    moduleRequire.resolve = resolve;
    Object.defineProperty(moduleRequire, 'main', {
      enumerable: true,

      get() {
        let mainModule = from.parent;

        while (
          mainModule &&
          mainModule.parent &&
          mainModule.id !== mainModule.parent.id
        ) {
          mainModule = mainModule.parent;
        }

        return mainModule;
      }
    });
    return moduleRequire;
  }

  _createJestObjectFor(from, localRequire) {
    const disableAutomock = () => {
      this._shouldAutoMock = false;
      return jestObject;
    };

    const enableAutomock = () => {
      this._shouldAutoMock = true;
      return jestObject;
    };

    const unmock = moduleName => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = false;
      return jestObject;
    };

    const deepUnmock = moduleName => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = false;
      this._transitiveShouldMock[moduleID] = false;
      return jestObject;
    };

    const mock = (moduleName, mockFactory, options) => {
      if (mockFactory !== undefined) {
        return setMockFactory(moduleName, mockFactory, options);
      }

      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = true;
      return jestObject;
    };

    const setMockFactory = (moduleName, mockFactory, options) => {
      this.setMock(from, moduleName, mockFactory, options);
      return jestObject;
    };

    const clearAllMocks = () => {
      this.clearAllMocks();
      return jestObject;
    };

    const resetAllMocks = () => {
      this.resetAllMocks();
      return jestObject;
    };

    const restoreAllMocks = () => {
      this.restoreAllMocks();
      return jestObject;
    };

    const useFakeTimers = () => {
      _getFakeTimers().useFakeTimers();

      return jestObject;
    };

    const useRealTimers = () => {
      _getFakeTimers().useRealTimers();

      return jestObject;
    };

    const resetModules = () => {
      this.resetModules();
      return jestObject;
    };

    const isolateModules = fn => {
      this.isolateModules(fn);
      return jestObject;
    };

    const fn = this._moduleMocker.fn.bind(this._moduleMocker);

    const spyOn = this._moduleMocker.spyOn.bind(this._moduleMocker);

    const setTimeout = timeout => {
      if (this._environment.global.jasmine) {
        this._environment.global.jasmine._DEFAULT_TIMEOUT_INTERVAL = timeout;
      } else {
        // @ts-ignore: https://github.com/Microsoft/TypeScript/issues/24587
        this._environment.global[testTimeoutSymbol] = timeout;
      }

      return jestObject;
    };

    const retryTimes = numTestRetries => {
      // @ts-ignore: https://github.com/Microsoft/TypeScript/issues/24587
      this._environment.global[retryTimesSymbol] = numTestRetries;
      return jestObject;
    };

    const _getFakeTimers = () => {
      if (!this._environment.fakeTimers) {
        this._logFormattedReferenceError(
          'You are trying to access a property or method of the Jest environment after it has been torn down.'
        );

        process.exitCode = 1;
      } // We've logged a user message above, so it doesn't matter if we return `null` here

      return this._environment.fakeTimers;
    };

    const jestObject = {
      addMatchers: matchers =>
        this._environment.global.jasmine.addMatchers(matchers),
      advanceTimersByTime: msToRun =>
        _getFakeTimers().advanceTimersByTime(msToRun),
      advanceTimersToNextTimer: steps =>
        _getFakeTimers().advanceTimersToNextTimer(steps),
      autoMockOff: disableAutomock,
      autoMockOn: enableAutomock,
      clearAllMocks,
      clearAllTimers: () => _getFakeTimers().clearAllTimers(),
      deepUnmock,
      disableAutomock,
      doMock: mock,
      dontMock: unmock,
      enableAutomock,
      fn,
      genMockFromModule: moduleName => this._generateMock(from, moduleName),
      getTimerCount: () => _getFakeTimers().getTimerCount(),
      isMockFunction: this._moduleMocker.isMockFunction,
      isolateModules,
      mock,
      requireActual: localRequire.requireActual,
      requireMock: localRequire.requireMock,
      resetAllMocks,
      resetModuleRegistry: resetModules,
      resetModules,
      restoreAllMocks,
      retryTimes,
      runAllImmediates: () => _getFakeTimers().runAllImmediates(),
      runAllTicks: () => _getFakeTimers().runAllTicks(),
      runAllTimers: () => _getFakeTimers().runAllTimers(),
      runOnlyPendingTimers: () => _getFakeTimers().runOnlyPendingTimers(),
      runTimersToTime: msToRun => _getFakeTimers().advanceTimersByTime(msToRun),
      setMock: (moduleName, mock) => setMockFactory(moduleName, () => mock),
      setTimeout,
      spyOn,
      unmock,
      useFakeTimers,
      useRealTimers
    };
    return jestObject;
  }

  _logFormattedReferenceError(errorMessage) {
    const originalStack = new ReferenceError(errorMessage).stack
      .split('\n') // Remove this file from the stack (jest-message-utils will keep one line)
      .filter(line => line.indexOf(__filename) === -1)
      .join('\n');

    const _separateMessageFromS = (0,
      _jestMessageUtil().separateMessageFromStack)(originalStack),
      message = _separateMessageFromS.message,
      stack = _separateMessageFromS.stack;

    console.error(
      `\n${message}\n` +
        (0, _jestMessageUtil().formatStackTrace)(stack, this._config, {
          noStackTrace: false
        })
    );
  }
}

_defineProperty(Runtime, 'ScriptTransformer', void 0);

Runtime.ScriptTransformer = _transform().ScriptTransformer;
module.exports = Runtime;
