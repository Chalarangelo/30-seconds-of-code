'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var assert = require('assert');
var path = require('path');

var errors = require('./errors');
var filterFiles = require('./filter-files');
var getCompositeDetails = require('./get-composite-details');
var getFileDetails = require('./get-file-details');
var getStringDetails = require('./get-string-details');

module.exports = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var dontCacheBustUrlsMatching = _ref.dontCacheBustUrlsMatching,
        globDirectory = _ref.globDirectory,
        globFollow = _ref.globFollow,
        globIgnores = _ref.globIgnores,
        globPatterns = _ref.globPatterns,
        globStrict = _ref.globStrict,
        manifestTransforms = _ref.manifestTransforms,
        maximumFileSizeToCacheInBytes = _ref.maximumFileSizeToCacheInBytes,
        modifyUrlPrefix = _ref.modifyUrlPrefix,
        swDest = _ref.swDest,
        templatedUrls = _ref.templatedUrls;

    var warnings, fileDetails, fileSet, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, filteredFiles, _filteredFiles$warnin;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            warnings = [];
            // Initialize to an empty array so that we can still pass something to
            // filterFiles() and get a normalized output.

            fileDetails = [];
            fileSet = new _set2.default();


            if (globDirectory) {
              if (swDest) {
                // Ensure that we ignore the SW file we're eventually writing to disk.
                globIgnores.push(`**/${path.basename(swDest)}`);
              }

              try {
                fileDetails = globPatterns.reduce(function (accumulated, globPattern) {
                  var globbedFileDetails = getFileDetails({
                    globDirectory,
                    globFollow,
                    globIgnores,
                    globPattern,
                    globStrict
                  });

                  globbedFileDetails.forEach(function (fileDetails) {
                    if (fileSet.has(fileDetails.file)) {
                      return;
                    }

                    fileSet.add(fileDetails.file);
                    accumulated.push(fileDetails);
                  });
                  return accumulated;
                }, []);
              } catch (error) {
                // If there's an exception thrown while globbing, then report
                // it back as a warning, and don't consider it fatal.
                warnings.push(error.message);
              }
            }

            if (!templatedUrls) {
              _context.next = 25;
              break;
            }

            _loop = function _loop(url) {
              assert(!fileSet.has(url), errors['templated-url-matches-glob']);

              var dependencies = templatedUrls[url];
              if (Array.isArray(dependencies)) {
                var details = dependencies.reduce(function (previous, globPattern) {
                  try {
                    var globbedFileDetails = getFileDetails({
                      globDirectory,
                      globFollow,
                      globIgnores,
                      globPattern,
                      globStrict
                    });
                    return previous.concat(globbedFileDetails);
                  } catch (error) {
                    var debugObj = {};
                    debugObj[url] = dependencies;
                    throw new Error(`${errors['bad-template-urls-asset']} ` + `'${globPattern}' from '${(0, _stringify2.default)(debugObj)}':\n` + error);
                  }
                }, []);
                fileDetails.push(getCompositeDetails(url, details));
              } else if (typeof dependencies === 'string') {
                fileDetails.push(getStringDetails(url, dependencies));
              }
            };

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = (0, _getIterator3.default)((0, _keys2.default)(templatedUrls)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              url = _step.value;

              _loop(url);
            }
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            filteredFiles = filterFiles({ fileDetails,
              maximumFileSizeToCacheInBytes, modifyUrlPrefix, dontCacheBustUrlsMatching,
              manifestTransforms });


            if (warnings.length > 0) {
              (_filteredFiles$warnin = filteredFiles.warnings).push.apply(_filteredFiles$warnin, warnings);
            }

            return _context.abrupt('return', filteredFiles);

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();