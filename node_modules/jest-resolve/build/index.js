'use strict';

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

var _nodeModulesPaths = _interopRequireDefault(require('./nodeModulesPaths'));

var _isBuiltinModule = _interopRequireDefault(require('./isBuiltinModule'));

var _defaultResolver = _interopRequireWildcard(require('./defaultResolver'));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

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

const NATIVE_PLATFORM = 'native'; // We might be inside a symlink.

const cwd = process.cwd();
const resolvedCwd = (0, _realpathNative().sync)(cwd) || cwd;
const NODE_PATH = process.env.NODE_PATH;
const nodePaths = NODE_PATH
  ? NODE_PATH.split(_path().default.delimiter)
      .filter(Boolean) // The resolver expects absolute paths.
      .map(p => _path().default.resolve(resolvedCwd, p))
  : undefined;
/* eslint-disable-next-line no-redeclare */

class Resolver {
  constructor(moduleMap, options) {
    _defineProperty(this, '_options', void 0);

    _defineProperty(this, '_moduleMap', void 0);

    _defineProperty(this, '_moduleIDCache', void 0);

    _defineProperty(this, '_moduleNameCache', void 0);

    _defineProperty(this, '_modulePathCache', void 0);

    _defineProperty(this, '_supportsNativePlatform', void 0);

    this._options = {
      browser: options.browser,
      defaultPlatform: options.defaultPlatform,
      extensions: options.extensions,
      hasCoreModules:
        options.hasCoreModules === undefined ? true : options.hasCoreModules,
      moduleDirectories: options.moduleDirectories || ['node_modules'],
      moduleNameMapper: options.moduleNameMapper,
      modulePaths: options.modulePaths,
      platforms: options.platforms,
      resolver: options.resolver,
      rootDir: options.rootDir
    };
    this._supportsNativePlatform = options.platforms
      ? options.platforms.includes(NATIVE_PLATFORM)
      : false;
    this._moduleMap = moduleMap;
    this._moduleIDCache = new Map();
    this._moduleNameCache = new Map();
    this._modulePathCache = new Map();
  }

  static clearDefaultResolverCache() {
    (0, _defaultResolver.clearDefaultResolverCache)();
  }

  static findNodeModule(path, options) {
    const resolver = options.resolver
      ? require(options.resolver)
      : _defaultResolver.default;
    const paths = options.paths;

    try {
      return resolver(path, {
        basedir: options.basedir,
        browser: options.browser,
        defaultResolver: _defaultResolver.default,
        extensions: options.extensions,
        moduleDirectory: options.moduleDirectory,
        paths: paths ? (nodePaths || []).concat(paths) : nodePaths,
        rootDir: options.rootDir
      });
    } catch (e) {}

    return null;
  }

  resolveModuleFromDirIfExists(dirname, moduleName, options) {
    const paths = (options && options.paths) || this._options.modulePaths;
    const moduleDirectory = this._options.moduleDirectories;
    const key = dirname + _path().default.delimiter + moduleName;
    const defaultPlatform = this._options.defaultPlatform;

    const extensions = this._options.extensions.slice();

    let module;

    if (this._supportsNativePlatform) {
      extensions.unshift(
        ...this._options.extensions.map(ext => '.' + NATIVE_PLATFORM + ext)
      );
    }

    if (defaultPlatform) {
      extensions.unshift(
        ...this._options.extensions.map(ext => '.' + defaultPlatform + ext)
      );
    } // 1. If we have already resolved this module for this directory name,
    // return a value from the cache.

    const cacheResult = this._moduleNameCache.get(key);

    if (cacheResult) {
      return cacheResult;
    } // 2. Check if the module is a haste module.

    module = this.getModule(moduleName);

    if (module) {
      this._moduleNameCache.set(key, module);

      return module;
    } // 3. Check if the module is a node module and resolve it based on
    // the node module resolution algorithm. If skipNodeResolution is given we
    // ignore all modules that look like node modules (ie. are not relative
    // requires). This enables us to speed up resolution when we build a
    // dependency graph because we don't have to look at modules that may not
    // exist and aren't mocked.

    const skipResolution =
      options &&
      options.skipNodeResolution &&
      !moduleName.includes(_path().default.sep);

    const resolveNodeModule = name =>
      Resolver.findNodeModule(name, {
        basedir: dirname,
        browser: this._options.browser,
        extensions,
        moduleDirectory,
        paths,
        resolver: this._options.resolver,
        rootDir: this._options.rootDir
      });

    if (!skipResolution) {
      module = resolveNodeModule(moduleName);

      if (module) {
        this._moduleNameCache.set(key, module);

        return module;
      }
    } // 4. Resolve "haste packages" which are `package.json` files outside of
    // `node_modules` folders anywhere in the file system.

    const parts = moduleName.split('/');
    const hastePackage = this.getPackage(parts.shift());

    if (hastePackage) {
      try {
        const module = _path().default.join.apply(
          _path().default,
          [_path().default.dirname(hastePackage)].concat(parts)
        ); // try resolving with custom resolver first to support extensions,
        // then fallback to require.resolve

        const resolvedModule =
          resolveNodeModule(module) || require.resolve(module);

        this._moduleNameCache.set(key, resolvedModule);

        return resolvedModule;
      } catch (ignoredError) {}
    }

    return null;
  }

  resolveModule(from, moduleName, options) {
    const dirname = _path().default.dirname(from);

    const module =
      this.resolveStubModuleName(from, moduleName) ||
      this.resolveModuleFromDirIfExists(dirname, moduleName, options);
    if (module) return module; // 5. Throw an error if the module could not be found. `resolve.sync` only
    // produces an error based on the dirname but we have the actual current
    // module name available.

    const relativePath = _path().default.relative(dirname, from);

    const err = new Error(
      `Cannot find module '${moduleName}' from '${relativePath || '.'}'`
    );
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }

  isCoreModule(moduleName) {
    return (
      this._options.hasCoreModules && (0, _isBuiltinModule.default)(moduleName)
    );
  }

  getModule(name) {
    return this._moduleMap.getModule(
      name,
      this._options.defaultPlatform,
      this._supportsNativePlatform
    );
  }

  getModulePath(from, moduleName) {
    if (moduleName[0] !== '.' || _path().default.isAbsolute(moduleName)) {
      return moduleName;
    }

    return _path().default.normalize(
      _path().default.dirname(from) + '/' + moduleName
    );
  }

  getPackage(name) {
    return this._moduleMap.getPackage(
      name,
      this._options.defaultPlatform,
      this._supportsNativePlatform
    );
  }

  getMockModule(from, name) {
    const mock = this._moduleMap.getMockModule(name);

    if (mock) {
      return mock;
    } else {
      const moduleName = this.resolveStubModuleName(from, name);

      if (moduleName) {
        return this.getModule(moduleName) || moduleName;
      }
    }

    return null;
  }

  getModulePaths(from) {
    const cachedModule = this._modulePathCache.get(from);

    if (cachedModule) {
      return cachedModule;
    }

    const moduleDirectory = this._options.moduleDirectories;
    const paths = (0, _nodeModulesPaths.default)(from, {
      moduleDirectory
    });

    if (paths[paths.length - 1] === undefined) {
      // circumvent node-resolve bug that adds `undefined` as last item.
      paths.pop();
    }

    this._modulePathCache.set(from, paths);

    return paths;
  }

  getModuleID(virtualMocks, from, _moduleName) {
    const moduleName = _moduleName || '';
    const key = from + _path().default.delimiter + moduleName;

    const cachedModuleID = this._moduleIDCache.get(key);

    if (cachedModuleID) {
      return cachedModuleID;
    }

    const moduleType = this._getModuleType(moduleName);

    const absolutePath = this._getAbsolutePath(virtualMocks, from, moduleName);

    const mockPath = this._getMockPath(from, moduleName);

    const sep = _path().default.delimiter;

    const id =
      moduleType +
      sep +
      (absolutePath ? absolutePath + sep : '') +
      (mockPath ? mockPath + sep : '');

    this._moduleIDCache.set(key, id);

    return id;
  }

  _getModuleType(moduleName) {
    return this.isCoreModule(moduleName) ? 'node' : 'user';
  }

  _getAbsolutePath(virtualMocks, from, moduleName) {
    if (this.isCoreModule(moduleName)) {
      return moduleName;
    }

    return this._isModuleResolved(from, moduleName)
      ? this.getModule(moduleName)
      : this._getVirtualMockPath(virtualMocks, from, moduleName);
  }

  _getMockPath(from, moduleName) {
    return !this.isCoreModule(moduleName)
      ? this.getMockModule(from, moduleName)
      : null;
  }

  _getVirtualMockPath(virtualMocks, from, moduleName) {
    const virtualMockPath = this.getModulePath(from, moduleName);
    return virtualMocks[virtualMockPath]
      ? virtualMockPath
      : moduleName
      ? this.resolveModule(from, moduleName)
      : from;
  }

  _isModuleResolved(from, moduleName) {
    return !!(
      this.getModule(moduleName) || this.getMockModule(from, moduleName)
    );
  }

  resolveStubModuleName(from, moduleName) {
    const dirname = _path().default.dirname(from);

    const paths = this._options.modulePaths;

    const extensions = this._options.extensions.slice();

    const moduleDirectory = this._options.moduleDirectories;
    const moduleNameMapper = this._options.moduleNameMapper;
    const resolver = this._options.resolver;
    const defaultPlatform = this._options.defaultPlatform;

    if (this._supportsNativePlatform) {
      extensions.unshift(
        ...this._options.extensions.map(ext => '.' + NATIVE_PLATFORM + ext)
      );
    }

    if (defaultPlatform) {
      extensions.unshift(
        ...this._options.extensions.map(ext => '.' + defaultPlatform + ext)
      );
    }

    if (moduleNameMapper) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = moduleNameMapper[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const _step$value = _step.value,
            mappedModuleName = _step$value.moduleName,
            regex = _step$value.regex;

          if (regex.test(moduleName)) {
            // Note: once a moduleNameMapper matches the name, it must result
            // in a module, or else an error is thrown.
            const matches = moduleName.match(regex);
            const updatedName = matches
              ? mappedModuleName.replace(
                  /\$([0-9]+)/g,
                  (_, index) => matches[parseInt(index, 10)]
                )
              : mappedModuleName;
            const module =
              this.getModule(updatedName) ||
              Resolver.findNodeModule(updatedName, {
                basedir: dirname,
                browser: this._options.browser,
                extensions,
                moduleDirectory,
                paths,
                resolver,
                rootDir: this._options.rootDir
              });

            if (!module) {
              throw createNoMappedModuleFoundError(
                moduleName,
                updatedName,
                mappedModuleName,
                regex,
                resolver
              );
            }

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
    }

    return null;
  }
}

const createNoMappedModuleFoundError = (
  moduleName,
  updatedName,
  mappedModuleName,
  regex,
  resolver
) => {
  const error = new Error(
    _chalk().default.red(`${_chalk().default.bold('Configuration error')}:

Could not locate module ${_chalk().default.bold(moduleName)} mapped as:
${_chalk().default.bold(updatedName)}.

Please check your configuration for these entries:
{
  "moduleNameMapper": {
    "${regex.toString()}": "${_chalk().default.bold(mappedModuleName)}"
  },
  "resolver": ${_chalk().default.bold(String(resolver))}
}`)
  );
  error.name = '';
  return error;
};

module.exports = Resolver;
