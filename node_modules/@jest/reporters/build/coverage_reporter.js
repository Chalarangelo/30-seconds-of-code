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

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _istanbulLibReport() {
  const data = _interopRequireDefault(require('istanbul-lib-report'));

  _istanbulLibReport = function _istanbulLibReport() {
    return data;
  };

  return data;
}

function _istanbulReports() {
  const data = _interopRequireDefault(require('istanbul-reports'));

  _istanbulReports = function _istanbulReports() {
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

function _istanbulLibCoverage() {
  const data = _interopRequireDefault(require('istanbul-lib-coverage'));

  _istanbulLibCoverage = function _istanbulLibCoverage() {
    return data;
  };

  return data;
}

function _istanbulLibSourceMaps() {
  const data = _interopRequireDefault(require('istanbul-lib-source-maps'));

  _istanbulLibSourceMaps = function _istanbulLibSourceMaps() {
    return data;
  };

  return data;
}

function _jestWorker() {
  const data = _interopRequireDefault(require('jest-worker'));

  _jestWorker = function _jestWorker() {
    return data;
  };

  return data;
}

function _glob() {
  const data = _interopRequireDefault(require('glob'));

  _glob = function _glob() {
    return data;
  };

  return data;
}

var _base_reporter = _interopRequireDefault(require('./base_reporter'));

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

const FAIL_COLOR = _chalk().default.bold.red;

const RUNNING_TEST_COLOR = _chalk().default.bold.dim;

class CoverageReporter extends _base_reporter.default {
  constructor(globalConfig, options) {
    super();

    _defineProperty(this, '_coverageMap', void 0);

    _defineProperty(this, '_globalConfig', void 0);

    _defineProperty(this, '_sourceMapStore', void 0);

    _defineProperty(this, '_options', void 0);

    this._coverageMap = _istanbulLibCoverage().default.createCoverageMap({});
    this._globalConfig = globalConfig;
    this._sourceMapStore = _istanbulLibSourceMaps().default.createSourceMapStore();
    this._options = options || {};
  }

  onTestResult(_test, testResult, _aggregatedResults) {
    if (testResult.coverage) {
      this._coverageMap.merge(testResult.coverage);
    }

    const sourceMaps = testResult.sourceMaps;

    if (sourceMaps) {
      Object.keys(sourceMaps).forEach(sourcePath => {
        let inputSourceMap;

        try {
          const coverage = this._coverageMap.fileCoverageFor(sourcePath);

          inputSourceMap = coverage.toJSON().inputSourceMap;
        } finally {
          if (inputSourceMap) {
            this._sourceMapStore.registerMap(sourcePath, inputSourceMap);
          } else {
            this._sourceMapStore.registerURL(
              sourcePath,
              sourceMaps[sourcePath]
            );
          }
        }
      });
    }
  }

  onRunComplete(contexts, aggregatedResults) {
    var _this = this;

    return _asyncToGenerator(function*() {
      yield _this._addUntestedFiles(_this._globalConfig, contexts);

      const _this$_sourceMapStore = _this._sourceMapStore.transformCoverage(
          _this._coverageMap
        ),
        map = _this$_sourceMapStore.map,
        sourceFinder = _this$_sourceMapStore.sourceFinder;

      try {
        const reportContext = _istanbulLibReport().default.createContext({
          dir: _this._globalConfig.coverageDirectory,
          sourceFinder
        });

        const coverageReporters = _this._globalConfig.coverageReporters || [];

        if (!_this._globalConfig.useStderr && coverageReporters.length < 1) {
          coverageReporters.push('text-summary');
        }

        const tree = _istanbulLibReport().default.summarizers.pkg(map);

        coverageReporters.forEach(reporter => {
          tree.visit(
            _istanbulReports().default.create(reporter, {}),
            reportContext
          );
        });
        aggregatedResults.coverageMap = map;
      } catch (e) {
        console.error(
          _chalk().default.red(`
        Failed to write coverage reports:
        ERROR: ${e.toString()}
        STACK: ${e.stack}
      `)
        );
      }

      _this._checkThreshold(_this._globalConfig, map);
    })();
  }

  _addUntestedFiles(globalConfig, contexts) {
    var _this2 = this;

    return _asyncToGenerator(function*() {
      const files = [];
      contexts.forEach(context => {
        const config = context.config;

        if (
          globalConfig.collectCoverageFrom &&
          globalConfig.collectCoverageFrom.length
        ) {
          context.hasteFS
            .matchFilesWithGlob(
              globalConfig.collectCoverageFrom,
              config.rootDir
            )
            .forEach(filePath =>
              files.push({
                config,
                path: filePath
              })
            );
        }
      });

      if (!files.length) {
        return;
      }

      if (_jestUtil().isInteractive) {
        process.stderr.write(
          RUNNING_TEST_COLOR('Running coverage on untested files...')
        );
      }

      let worker;

      if (_this2._globalConfig.maxWorkers <= 1) {
        worker = require('./coverage_worker');
      } else {
        worker = new (_jestWorker()).default(
          require.resolve('./coverage_worker'),
          {
            exposedMethods: ['worker'],
            maxRetries: 2,
            numWorkers: _this2._globalConfig.maxWorkers
          }
        );
      }

      const instrumentation = files.map(
        /*#__PURE__*/
        (function() {
          var _ref = _asyncToGenerator(function*(fileObj) {
            const filename = fileObj.path;
            const config = fileObj.config;

            if (!_this2._coverageMap.data[filename] && 'worker' in worker) {
              try {
                const result = yield worker.worker({
                  config,
                  globalConfig,
                  options: _objectSpread({}, _this2._options, {
                    changedFiles:
                      _this2._options.changedFiles &&
                      Array.from(_this2._options.changedFiles)
                  }),
                  path: filename
                });

                if (result) {
                  _this2._coverageMap.addFileCoverage(result.coverage);

                  if (result.sourceMapPath) {
                    _this2._sourceMapStore.registerURL(
                      filename,
                      result.sourceMapPath
                    );
                  }
                }
              } catch (error) {
                console.error(
                  _chalk().default.red(
                    [
                      `Failed to collect coverage from ${filename}`,
                      `ERROR: ${error.message}`,
                      `STACK: ${error.stack}`
                    ].join('\n')
                  )
                );
              }
            }
          });

          return function(_x) {
            return _ref.apply(this, arguments);
          };
        })()
      );

      try {
        yield Promise.all(instrumentation);
      } catch (err) {
        // Do nothing; errors were reported earlier to the console.
      }

      if (_jestUtil().isInteractive) {
        (0, _jestUtil().clearLine)(process.stderr);
      }

      if (worker && 'end' in worker && typeof worker.end === 'function') {
        worker.end();
      }
    })();
  }

  _checkThreshold(globalConfig, map) {
    if (globalConfig.coverageThreshold) {
      function check(name, thresholds, actuals) {
        return ['statements', 'branches', 'lines', 'functions'].reduce(
          (errors, key) => {
            const actual = actuals[key].pct;
            const actualUncovered = actuals[key].total - actuals[key].covered;
            const threshold = thresholds[key];

            if (threshold != null) {
              if (threshold < 0) {
                if (threshold * -1 < actualUncovered) {
                  errors.push(
                    `Jest: Uncovered count for ${key} (${actualUncovered})` +
                      `exceeds ${name} threshold (${-1 * threshold})`
                  );
                }
              } else if (actual < threshold) {
                errors.push(
                  `Jest: "${name}" coverage threshold for ${key} (${threshold}%) not met: ${actual}%`
                );
              }
            }

            return errors;
          },
          []
        );
      }

      const THRESHOLD_GROUP_TYPES = {
        GLOB: 'glob',
        GLOBAL: 'global',
        PATH: 'path'
      };
      const coveredFiles = map.files();
      const thresholdGroups = Object.keys(globalConfig.coverageThreshold);
      const groupTypeByThresholdGroup = {};
      const filesByGlob = {};
      const coveredFilesSortedIntoThresholdGroup = coveredFiles.reduce(
        (files, file) => {
          const pathOrGlobMatches = thresholdGroups.reduce(
            (agg, thresholdGroup) => {
              const absoluteThresholdGroup = _path().default.resolve(
                thresholdGroup
              ); // The threshold group might be a path:

              if (file.indexOf(absoluteThresholdGroup) === 0) {
                groupTypeByThresholdGroup[thresholdGroup] =
                  THRESHOLD_GROUP_TYPES.PATH;
                return agg.concat([[file, thresholdGroup]]);
              } // If the threshold group is not a path it might be a glob:
              // Note: glob.sync is slow. By memoizing the files matching each glob
              // (rather than recalculating it for each covered file) we save a tonne
              // of execution time.

              if (filesByGlob[absoluteThresholdGroup] === undefined) {
                filesByGlob[absoluteThresholdGroup] = _glob()
                  .default.sync(absoluteThresholdGroup)
                  .map(filePath => _path().default.resolve(filePath));
              }

              if (filesByGlob[absoluteThresholdGroup].indexOf(file) > -1) {
                groupTypeByThresholdGroup[thresholdGroup] =
                  THRESHOLD_GROUP_TYPES.GLOB;
                return agg.concat([[file, thresholdGroup]]);
              }

              return agg;
            },
            []
          );

          if (pathOrGlobMatches.length > 0) {
            return files.concat(pathOrGlobMatches);
          } // Neither a glob or a path? Toss it in global if there's a global threshold:

          if (thresholdGroups.indexOf(THRESHOLD_GROUP_TYPES.GLOBAL) > -1) {
            groupTypeByThresholdGroup[THRESHOLD_GROUP_TYPES.GLOBAL] =
              THRESHOLD_GROUP_TYPES.GLOBAL;
            return files.concat([[file, THRESHOLD_GROUP_TYPES.GLOBAL]]);
          } // A covered file that doesn't have a threshold:

          return files.concat([[file, undefined]]);
        },
        []
      );

      const getFilesInThresholdGroup = thresholdGroup =>
        coveredFilesSortedIntoThresholdGroup
          .filter(fileAndGroup => fileAndGroup[1] === thresholdGroup)
          .map(fileAndGroup => fileAndGroup[0]);

      function combineCoverage(filePaths) {
        return filePaths
          .map(filePath => map.fileCoverageFor(filePath))
          .reduce((combinedCoverage, nextFileCoverage) => {
            if (combinedCoverage === undefined || combinedCoverage === null) {
              return nextFileCoverage.toSummary();
            }

            return combinedCoverage.merge(nextFileCoverage.toSummary());
          }, undefined);
      }

      let errors = [];
      thresholdGroups.forEach(thresholdGroup => {
        switch (groupTypeByThresholdGroup[thresholdGroup]) {
          case THRESHOLD_GROUP_TYPES.GLOBAL: {
            const coverage = combineCoverage(
              getFilesInThresholdGroup(THRESHOLD_GROUP_TYPES.GLOBAL)
            );

            if (coverage) {
              errors = errors.concat(
                check(
                  thresholdGroup,
                  globalConfig.coverageThreshold[thresholdGroup],
                  coverage
                )
              );
            }

            break;
          }

          case THRESHOLD_GROUP_TYPES.PATH: {
            const coverage = combineCoverage(
              getFilesInThresholdGroup(thresholdGroup)
            );

            if (coverage) {
              errors = errors.concat(
                check(
                  thresholdGroup,
                  globalConfig.coverageThreshold[thresholdGroup],
                  coverage
                )
              );
            }

            break;
          }

          case THRESHOLD_GROUP_TYPES.GLOB:
            getFilesInThresholdGroup(thresholdGroup).forEach(
              fileMatchingGlob => {
                errors = errors.concat(
                  check(
                    fileMatchingGlob,
                    globalConfig.coverageThreshold[thresholdGroup],
                    map.fileCoverageFor(fileMatchingGlob).toSummary()
                  )
                );
              }
            );
            break;

          default:
            // If the file specified by path is not found, error is returned.
            if (thresholdGroup !== THRESHOLD_GROUP_TYPES.GLOBAL) {
              errors = errors.concat(
                `Jest: Coverage data for ${thresholdGroup} was not found.`
              );
            }

          // Sometimes all files in the coverage data are matched by
          // PATH and GLOB threshold groups in which case, don't error when
          // the global threshold group doesn't match any files.
        }
      });
      errors = errors.filter(
        err => err !== undefined && err !== null && err.length > 0
      );

      if (errors.length > 0) {
        this.log(`${FAIL_COLOR(errors.join('\n'))}`);

        this._setError(new Error(errors.join('\n')));
      }
    }
  } // Only exposed for the internal runner. Should not be used

  getCoverageMap() {
    return this._coverageMap;
  }
}

exports.default = CoverageReporter;
