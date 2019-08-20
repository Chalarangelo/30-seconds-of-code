'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * This method returns a list of URLs to precache, referred to as a "precache
 * manifest", along with details about the number of entries and their size,
 * based on the options you provide.
 *
 * @param {Object} config Please refer to the
 * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-build#getmanifest_mode).
 * @return {Promise<{manifestEntries: Array<ManifestEntry>,
 * count: number, size: number, warnings: Array<string>}>} A promise that
 * resolves once the precache manifest is determined. The `size` property
 * contains the aggregate size of all the precached entries, in bytes, the
 * `count` property contains the total number of precached entries, and the
 * `manifestEntries` property contains all the `ManifestEntry` items. Any
 * non-fatal warning messages will be returned via `warnings`.
 *
 * @memberof module:workbox-build
 */
var getManifest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
    var options, _ref2, manifestEntries, count, size, warnings;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = validate(config, getManifestSchema);
            _context.next = 3;
            return getFileManifestEntries(options);

          case 3:
            _ref2 = _context.sent;
            manifestEntries = _ref2.manifestEntries;
            count = _ref2.count;
            size = _ref2.size;
            warnings = _ref2.warnings;
            return _context.abrupt('return', { manifestEntries, count, size, warnings });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getManifest(_x) {
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

var getFileManifestEntries = require('../lib/get-file-manifest-entries');
var getManifestSchema = require('./options/get-manifest-schema');
var validate = require('./options/validate');

module.exports = getManifest;