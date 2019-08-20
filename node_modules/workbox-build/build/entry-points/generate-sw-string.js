'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * This method generates a service worker based on the configuration options
 * provided.
 *
 * @param {Object} config Please refer to the
 * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-build#generateswstring_mode).
 * @return {Promise<{swString: string, warnings: Array<string>}>} A promise that
 * resolves once the service worker template is populated. The `swString`
 * property contains a string representation of the full service worker code.
 * Any non-fatal warning messages will be returned via `warnings`.
 *
 * @memberof module:workbox-build
 */
var generateSWString = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
    var options, _ref2, manifestEntries, warnings, swString;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = validate(config, generateSWStringSchema);
            _context.next = 3;
            return getFileManifestEntries(options);

          case 3:
            _ref2 = _context.sent;
            manifestEntries = _ref2.manifestEntries;
            warnings = _ref2.warnings;
            _context.next = 8;
            return populateSWTemplate((0, _assign2.default)({
              manifestEntries
            }, options));

          case 8:
            swString = _context.sent;
            return _context.abrupt('return', { swString, warnings });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateSWString(_x) {
    return _ref.apply(this, arguments);
  };
}();

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

var generateSWStringSchema = require('./options/generate-sw-string-schema');
var getFileManifestEntries = require('../lib/get-file-manifest-entries');
var populateSWTemplate = require('../lib/populate-sw-template');
var validate = require('./options/validate');

module.exports = generateSWString;