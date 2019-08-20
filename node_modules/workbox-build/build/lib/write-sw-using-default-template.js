'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var fse = require('fs-extra');
var path = require('path');

var errors = require('./errors');
var populateSWTemplate = require('./populate-sw-template');

module.exports = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var cacheId = _ref.cacheId,
        clientsClaim = _ref.clientsClaim,
        directoryIndex = _ref.directoryIndex,
        handleFetch = _ref.handleFetch,
        ignoreUrlParametersMatching = _ref.ignoreUrlParametersMatching,
        importScripts = _ref.importScripts,
        manifestEntries = _ref.manifestEntries,
        modulePathPrefix = _ref.modulePathPrefix,
        navigateFallback = _ref.navigateFallback,
        navigateFallbackBlacklist = _ref.navigateFallbackBlacklist,
        navigateFallbackWhitelist = _ref.navigateFallbackWhitelist,
        offlineGoogleAnalytics = _ref.offlineGoogleAnalytics,
        runtimeCaching = _ref.runtimeCaching,
        skipWaiting = _ref.skipWaiting,
        swDest = _ref.swDest,
        workboxSWImport = _ref.workboxSWImport;
    var populatedTemplate;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fse.mkdirp(path.dirname(swDest));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            throw new Error(`${errors['unable-to-make-sw-directory']}. ` + `'${_context.t0.message}'`);

          case 8:
            populatedTemplate = populateSWTemplate({
              cacheId,
              clientsClaim,
              directoryIndex,
              handleFetch,
              ignoreUrlParametersMatching,
              importScripts,
              manifestEntries,
              modulePathPrefix,
              navigateFallback,
              navigateFallbackBlacklist,
              navigateFallbackWhitelist,
              offlineGoogleAnalytics,
              runtimeCaching,
              skipWaiting,
              workboxSWImport
            });
            _context.prev = 9;
            _context.next = 12;
            return fse.writeFile(swDest, populatedTemplate);

          case 12:
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t1 = _context['catch'](9);

            if (!(_context.t1.code === 'EISDIR')) {
              _context.next = 18;
              break;
            }

            throw new Error(errors['sw-write-failure-directory']);

          case 18:
            throw new Error(`${errors['sw-write-failure']}. '${_context.t1.message}'`);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5], [9, 14]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();