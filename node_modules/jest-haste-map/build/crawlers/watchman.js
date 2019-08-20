'use strict';

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _fbWatchman() {
  const data = _interopRequireDefault(require('fb-watchman'));

  _fbWatchman = function _fbWatchman() {
    return data;
  };

  return data;
}

var fastPath = _interopRequireWildcard(require('../lib/fast_path'));

var _normalizePathSep = _interopRequireDefault(
  require('../lib/normalizePathSep')
);

var _constants = _interopRequireDefault(require('../constants'));

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

const watchmanURL =
  'https://facebook.github.io/watchman/docs/troubleshooting.html';

function WatchmanError(error) {
  error.message =
    `Watchman error: ${error.message.trim()}. Make sure watchman ` +
    `is running for this project. See ${watchmanURL}.`;
  return error;
}

module.exports =
  /*#__PURE__*/
  (function() {
    var _watchmanCrawl = _asyncToGenerator(function*(options) {
      const fields = ['name', 'exists', 'mtime_ms', 'size'];
      const data = options.data,
        extensions = options.extensions,
        ignore = options.ignore,
        rootDir = options.rootDir,
        roots = options.roots;
      const defaultWatchExpression = [
        'allof',
        ['type', 'f'],
        ['anyof', ...extensions.map(extension => ['suffix', extension])]
      ];
      const clocks = data.clocks;
      const client = new (_fbWatchman()).default.Client();
      let clientError;
      client.on('error', error => (clientError = WatchmanError(error))); // TODO: type better than `any`

      const cmd = (...args) =>
        new Promise((resolve, reject) =>
          client.command(args, (error, result) =>
            error ? reject(WatchmanError(error)) : resolve(result)
          )
        );

      if (options.computeSha1) {
        const _ref = yield cmd('list-capabilities'),
          capabilities = _ref.capabilities;

        if (capabilities.indexOf('field-content.sha1hex') !== -1) {
          fields.push('content.sha1hex');
        }
      }

      function getWatchmanRoots(_x2) {
        return _getWatchmanRoots.apply(this, arguments);
      }

      function _getWatchmanRoots() {
        _getWatchmanRoots = _asyncToGenerator(function*(roots) {
          const watchmanRoots = new Map();
          yield Promise.all(
            roots.map(
              /*#__PURE__*/
              (function() {
                var _ref2 = _asyncToGenerator(function*(root) {
                  const response = yield cmd('watch-project', root);
                  const existing = watchmanRoots.get(response.watch); // A root can only be filtered if it was never seen with a
                  // relative_path before.

                  const canBeFiltered = !existing || existing.length > 0;

                  if (canBeFiltered) {
                    if (response.relative_path) {
                      watchmanRoots.set(
                        response.watch,
                        (existing || []).concat(response.relative_path)
                      );
                    } else {
                      // Make the filter directories an empty array to signal that this
                      // root was already seen and needs to be watched for all files or
                      // directories.
                      watchmanRoots.set(response.watch, []);
                    }
                  }
                });

                return function(_x4) {
                  return _ref2.apply(this, arguments);
                };
              })()
            )
          );
          return watchmanRoots;
        });
        return _getWatchmanRoots.apply(this, arguments);
      }

      function queryWatchmanForDirs(_x3) {
        return _queryWatchmanForDirs.apply(this, arguments);
      }

      function _queryWatchmanForDirs() {
        _queryWatchmanForDirs = _asyncToGenerator(function*(
          rootProjectDirMappings
        ) {
          const files = new Map();
          let isFresh = false;
          yield Promise.all(
            Array.from(rootProjectDirMappings).map(
              /*#__PURE__*/
              (function() {
                var _ref3 = _asyncToGenerator(function*([
                  root,
                  directoryFilters
                ]) {
                  const expression = Array.from(defaultWatchExpression);
                  const glob = [];

                  if (directoryFilters.length > 0) {
                    expression.push([
                      'anyof',
                      ...directoryFilters.map(dir => ['dirname', dir])
                    ]);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (
                        var _iterator2 = directoryFilters[Symbol.iterator](),
                          _step2;
                        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                          .done);
                        _iteratorNormalCompletion2 = true
                      ) {
                        const directory = _step2.value;
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                          for (
                            var _iterator3 = extensions[Symbol.iterator](),
                              _step3;
                            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                              .done);
                            _iteratorNormalCompletion3 = true
                          ) {
                            const extension = _step3.value;
                            glob.push(`${directory}/**/*.${extension}`);
                          }
                        } catch (err) {
                          _didIteratorError3 = true;
                          _iteratorError3 = err;
                        } finally {
                          try {
                            if (
                              !_iteratorNormalCompletion3 &&
                              _iterator3.return != null
                            ) {
                              _iterator3.return();
                            }
                          } finally {
                            if (_didIteratorError3) {
                              throw _iteratorError3;
                            }
                          }
                        }
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (
                          !_iteratorNormalCompletion2 &&
                          _iterator2.return != null
                        ) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }
                  } else {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      for (
                        var _iterator4 = extensions[Symbol.iterator](), _step4;
                        !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next())
                          .done);
                        _iteratorNormalCompletion4 = true
                      ) {
                        const extension = _step4.value;
                        glob.push(`**/*.${extension}`);
                      }
                    } catch (err) {
                      _didIteratorError4 = true;
                      _iteratorError4 = err;
                    } finally {
                      try {
                        if (
                          !_iteratorNormalCompletion4 &&
                          _iterator4.return != null
                        ) {
                          _iterator4.return();
                        }
                      } finally {
                        if (_didIteratorError4) {
                          throw _iteratorError4;
                        }
                      }
                    }
                  }

                  const relativeRoot = fastPath.relative(rootDir, root);
                  const query = clocks.has(relativeRoot) // Use the `since` generator if we have a clock available
                    ? {
                        expression,
                        fields,
                        since: clocks.get(relativeRoot)
                      } // Otherwise use the `glob` filter
                    : {
                        expression,
                        fields,
                        glob
                      };
                  const response = yield cmd('query', root, query);

                  if ('warning' in response) {
                    console.warn('watchman warning: ', response.warning);
                  }

                  isFresh = isFresh || response.is_fresh_instance;
                  files.set(root, response);
                });

                return function(_x5) {
                  return _ref3.apply(this, arguments);
                };
              })()
            )
          );
          return {
            files,
            isFresh
          };
        });
        return _queryWatchmanForDirs.apply(this, arguments);
      }

      let files = data.files;
      let removedFiles = new Map();
      const changedFiles = new Map();
      let watchmanFiles;
      let isFresh = false;

      try {
        const watchmanRoots = yield getWatchmanRoots(roots);
        const watchmanFileResults = yield queryWatchmanForDirs(watchmanRoots); // Reset the file map if watchman was restarted and sends us a list of
        // files.

        if (watchmanFileResults.isFresh) {
          files = new Map();
          removedFiles = new Map(data.files);
          isFresh = true;
        }

        watchmanFiles = watchmanFileResults.files;
      } finally {
        client.end();
      }

      if (clientError) {
        throw clientError;
      } // TODO: remove non-null

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = watchmanFiles[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const _step$value = _slicedToArray(_step.value, 2),
            watchRoot = _step$value[0],
            response = _step$value[1];

          const fsRoot = (0, _normalizePathSep.default)(watchRoot);
          const relativeFsRoot = fastPath.relative(rootDir, fsRoot);
          clocks.set(relativeFsRoot, response.clock);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (
              var _iterator5 = response.files[Symbol.iterator](), _step5;
              !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
              _iteratorNormalCompletion5 = true
            ) {
              const fileData = _step5.value;
              const filePath =
                fsRoot +
                _path().default.sep +
                (0, _normalizePathSep.default)(fileData.name);
              const relativeFilePath = fastPath.relative(rootDir, filePath);
              const existingFileData = data.files.get(relativeFilePath); // If watchman is fresh, the removed files map starts with all files
              // and we remove them as we verify they still exist.

              if (isFresh && existingFileData && fileData.exists) {
                removedFiles.delete(relativeFilePath);
              }

              if (!fileData.exists) {
                // No need to act on files that do not exist and were not tracked.
                if (existingFileData) {
                  files.delete(relativeFilePath); // If watchman is not fresh, we will know what specific files were
                  // deleted since we last ran and can track only those files.

                  if (!isFresh) {
                    removedFiles.set(relativeFilePath, existingFileData);
                  }
                }
              } else if (!ignore(filePath)) {
                const mtime =
                  typeof fileData.mtime_ms === 'number'
                    ? fileData.mtime_ms
                    : fileData.mtime_ms.toNumber();
                const size = fileData.size;
                let sha1hex = fileData['content.sha1hex'];

                if (typeof sha1hex !== 'string' || sha1hex.length !== 40) {
                  sha1hex = null;
                }

                let nextData;

                if (
                  existingFileData &&
                  existingFileData[_constants.default.MTIME] === mtime
                ) {
                  nextData = existingFileData;
                } else if (
                  existingFileData &&
                  sha1hex &&
                  existingFileData[_constants.default.SHA1] === sha1hex
                ) {
                  nextData = [
                    existingFileData[0],
                    mtime,
                    existingFileData[2],
                    existingFileData[3],
                    existingFileData[4],
                    existingFileData[5]
                  ];
                } else {
                  // See ../constants.ts
                  nextData = ['', mtime, size, 0, '', sha1hex];
                }

                const mappings = options.mapper
                  ? options.mapper(filePath)
                  : null;

                if (mappings) {
                  var _iteratorNormalCompletion6 = true;
                  var _didIteratorError6 = false;
                  var _iteratorError6 = undefined;

                  try {
                    for (
                      var _iterator6 = mappings[Symbol.iterator](), _step6;
                      !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next())
                        .done);
                      _iteratorNormalCompletion6 = true
                    ) {
                      const absoluteVirtualFilePath = _step6.value;

                      if (!ignore(absoluteVirtualFilePath)) {
                        const relativeVirtualFilePath = fastPath.relative(
                          rootDir,
                          absoluteVirtualFilePath
                        );
                        files.set(relativeVirtualFilePath, nextData);
                        changedFiles.set(relativeVirtualFilePath, nextData);
                      }
                    }
                  } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                  } finally {
                    try {
                      if (
                        !_iteratorNormalCompletion6 &&
                        _iterator6.return != null
                      ) {
                        _iterator6.return();
                      }
                    } finally {
                      if (_didIteratorError6) {
                        throw _iteratorError6;
                      }
                    }
                  }
                } else {
                  files.set(relativeFilePath, nextData);
                  changedFiles.set(relativeFilePath, nextData);
                }
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
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

      data.files = files;
      return {
        changedFiles: isFresh ? undefined : changedFiles,
        hasteMap: data,
        removedFiles
      };
    });

    function watchmanCrawl(_x) {
      return _watchmanCrawl.apply(this, arguments);
    }

    return watchmanCrawl;
  })();
