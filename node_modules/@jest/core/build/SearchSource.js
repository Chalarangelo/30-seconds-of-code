'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _micromatch() {
  const data = _interopRequireDefault(require('micromatch'));

  _micromatch = function _micromatch() {
    return data;
  };

  return data;
}

function _jestResolveDependencies() {
  const data = _interopRequireDefault(require('jest-resolve-dependencies'));

  _jestResolveDependencies = function _jestResolveDependencies() {
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

function _jestConfig() {
  const data = require('jest-config');

  _jestConfig = function _jestConfig() {
    return data;
  };

  return data;
}

function _jestSnapshot() {
  const data = require('jest-snapshot');

  _jestSnapshot = function _jestSnapshot() {
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

const globsToMatcher = globs => path =>
  _micromatch().default.some(
    (0, _jestUtil().replacePathSepForGlob)(path),
    globs,
    {
      dot: true
    }
  );

const regexToMatcher = testRegex => path =>
  testRegex.some(testRegex => new RegExp(testRegex).test(path));

const toTests = (context, tests) =>
  tests.map(path => ({
    context,
    duration: undefined,
    path
  }));

class SearchSource {
  constructor(context) {
    _defineProperty(this, '_context', void 0);

    _defineProperty(this, '_testPathCases', []);

    const config = context.config;
    this._context = context;
    const rootPattern = new RegExp(
      config.roots
        .map(dir =>
          (0, _jestRegexUtil().escapePathForRegex)(dir + _path().default.sep)
        )
        .join('|')
    );

    this._testPathCases.push({
      isMatch: path => rootPattern.test(path),
      stat: 'roots'
    });

    if (config.testMatch.length) {
      this._testPathCases.push({
        isMatch: globsToMatcher(config.testMatch),
        stat: 'testMatch'
      });
    }

    if (config.testPathIgnorePatterns.length) {
      const testIgnorePatternsRegex = new RegExp(
        config.testPathIgnorePatterns.join('|')
      );

      this._testPathCases.push({
        isMatch: path => !testIgnorePatternsRegex.test(path),
        stat: 'testPathIgnorePatterns'
      });
    }

    if (config.testRegex.length) {
      this._testPathCases.push({
        isMatch: regexToMatcher(config.testRegex),
        stat: 'testRegex'
      });
    }
  }

  _filterTestPathsWithStats(allPaths, testPathPattern) {
    const data = {
      stats: {
        roots: 0,
        testMatch: 0,
        testPathIgnorePatterns: 0,
        testRegex: 0
      },
      tests: [],
      total: allPaths.length
    };
    const testCases = Array.from(this._testPathCases); // clone

    if (testPathPattern) {
      const regex = (0, _jestUtil().testPathPatternToRegExp)(testPathPattern);
      testCases.push({
        isMatch: path => regex.test(path),
        stat: 'testPathPattern'
      });
      data.stats.testPathPattern = 0;
    }

    data.tests = allPaths.filter(test => {
      let filterResult = true;

      for (var _i = 0; _i < testCases.length; _i++) {
        const _testCases$_i = testCases[_i],
          isMatch = _testCases$_i.isMatch,
          stat = _testCases$_i.stat;

        if (isMatch(test.path)) {
          data.stats[stat]++;
        } else {
          filterResult = false;
        }
      }

      return filterResult;
    });
    return data;
  }

  _getAllTestPaths(testPathPattern) {
    return this._filterTestPathsWithStats(
      toTests(this._context, this._context.hasteFS.getAllFiles()),
      testPathPattern
    );
  }

  isTestFilePath(path) {
    return this._testPathCases.every(testCase => testCase.isMatch(path));
  }

  findMatchingTests(testPathPattern) {
    return this._getAllTestPaths(testPathPattern);
  }

  findRelatedTests(allPaths, collectCoverage) {
    const dependencyResolver = new (_jestResolveDependencies()).default(
      this._context.resolver,
      this._context.hasteFS,
      (0, _jestSnapshot().buildSnapshotResolver)(this._context.config)
    );

    if (!collectCoverage) {
      return {
        tests: toTests(
          this._context,
          dependencyResolver.resolveInverse(
            allPaths,
            this.isTestFilePath.bind(this),
            {
              skipNodeResolution: this._context.config.skipNodeResolution
            }
          )
        )
      };
    }

    const testModulesMap = dependencyResolver.resolveInverseModuleMap(
      allPaths,
      this.isTestFilePath.bind(this),
      {
        skipNodeResolution: this._context.config.skipNodeResolution
      }
    );
    const allPathsAbsolute = Array.from(allPaths).map(p =>
      _path().default.resolve(p)
    );
    const collectCoverageFrom = new Set();
    testModulesMap.forEach(testModule => {
      if (!testModule.dependencies) {
        return;
      }

      testModule.dependencies
        .filter(p => allPathsAbsolute.includes(p))
        .map(filename => {
          filename = (0, _jestConfig().replaceRootDirInPath)(
            this._context.config.rootDir,
            filename
          );
          return _path().default.isAbsolute(filename)
            ? _path().default.relative(this._context.config.rootDir, filename)
            : filename;
        })
        .forEach(filename => collectCoverageFrom.add(filename));
    });
    return {
      collectCoverageFrom,
      tests: toTests(
        this._context,
        testModulesMap.map(testModule => testModule.file)
      )
    };
  }

  findTestsByPaths(paths) {
    return {
      tests: toTests(
        this._context,
        paths
          .map(p => _path().default.resolve(this._context.config.cwd, p))
          .filter(this.isTestFilePath.bind(this))
      )
    };
  }

  findRelatedTestsFromPattern(paths, collectCoverage) {
    if (Array.isArray(paths) && paths.length) {
      const resolvedPaths = paths.map(p =>
        _path().default.resolve(this._context.config.cwd, p)
      );
      return this.findRelatedTests(new Set(resolvedPaths), collectCoverage);
    }

    return {
      tests: []
    };
  }

  findTestRelatedToChangedFiles(changedFilesInfo, collectCoverage) {
    const repos = changedFilesInfo.repos,
      changedFiles = changedFilesInfo.changedFiles; // no SCM (git/hg/...) is found in any of the roots.

    const noSCM = Object.keys(repos).every(scm => repos[scm].size === 0);
    return noSCM
      ? {
          noSCM: true,
          tests: []
        }
      : this.findRelatedTests(changedFiles, collectCoverage);
  }

  _getTestPaths(globalConfig, changedFiles) {
    const paths = globalConfig.nonFlagArgs;

    if (globalConfig.onlyChanged) {
      if (!changedFiles) {
        throw new Error('Changed files must be set when running with -o.');
      }

      return this.findTestRelatedToChangedFiles(
        changedFiles,
        globalConfig.collectCoverage
      );
    } else if (globalConfig.runTestsByPath && paths && paths.length) {
      return this.findTestsByPaths(paths);
    } else if (globalConfig.findRelatedTests && paths && paths.length) {
      return this.findRelatedTestsFromPattern(
        paths,
        globalConfig.collectCoverage
      );
    } else if (globalConfig.testPathPattern != null) {
      return this.findMatchingTests(globalConfig.testPathPattern);
    } else {
      return {
        tests: []
      };
    }
  }

  getTestPaths(globalConfig, changedFiles, filter) {
    var _this = this;

    return _asyncToGenerator(function*() {
      const searchResult = _this._getTestPaths(globalConfig, changedFiles);

      const filterPath = globalConfig.filter;

      if (filter) {
        const tests = searchResult.tests;
        const filterResult = yield filter(tests.map(test => test.path));

        if (!Array.isArray(filterResult.filtered)) {
          throw new Error(
            `Filter ${filterPath} did not return a valid test list`
          );
        }

        const filteredSet = new Set(
          filterResult.filtered.map(result => result.test)
        );
        return _objectSpread({}, searchResult, {
          tests: tests.filter(test => filteredSet.has(test.path))
        });
      }

      return searchResult;
    })();
  }
}

exports.default = SearchSource;
