'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * This method creates a list of URLs to precache, referred to as a "precache
 * manifest", based on the options you provide.
 *
 * The manifest is injected into the `swSrc` file, and the regular expression
 * `injectionPointRegexp` determines where in the file the manifest should go.
 *
 * The final service worker file, with the manifest injected, is written to
 * disk at `swDest`.
 *
 * @param {Object} config Please refer to the
 * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_injectmanifest_config).
 * @return {Promise<{count: number, size: number, warnings: Array<string>}>}
 * A promise that resolves once the service worker file has been written to
 * `swDest`. The `size` property contains the aggregate size of all the
 * precached entries, in bytes, and the `count` property contains the total
 * number of precached entries. Any non-fatal warning messages will be returned
 * via `warnings`.
 *
 * @memberof module:workbox-build
 */
var injectManifest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
    var options, globalRegexp, _ref2, count, size, manifestEntries, warnings, swFileContents, injectionResults, entriesString;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = validate(config, injectManifestSchema);

            if (!(path.normalize(config.swSrc) === path.normalize(config.swDest))) {
              _context.next = 3;
              break;
            }

            throw new Error(errors['same-src-and-dest']);

          case 3:
            globalRegexp = new RegExp(options.injectionPointRegexp, 'g');
            _context.next = 6;
            return getFileManifestEntries(options);

          case 6:
            _ref2 = _context.sent;
            count = _ref2.count;
            size = _ref2.size;
            manifestEntries = _ref2.manifestEntries;
            warnings = _ref2.warnings;
            swFileContents = void 0;
            _context.prev = 12;
            _context.next = 15;
            return fse.readFile(config.swSrc, 'utf8');

          case 15:
            swFileContents = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](12);
            throw new Error(`${errors['invalid-sw-src']} ${_context.t0.message}`);

          case 21:
            injectionResults = swFileContents.match(globalRegexp);

            assert(injectionResults, errors['injection-point-not-found'] + (
            // Customize the error message when this happens:
            // - If the default RegExp is used, then include the expected string that
            //   matches as a hint to the developer.
            // - If a custom RegExp is used, then just include the raw RegExp.
            options.injectionPointRegexp === defaults.injectionPointRegexp ? 'workbox.precaching.precacheAndRoute([])' : options.injectionPointRegexp));
            assert(injectionResults.length === 1, errors['multiple-injection-points'] + ` ${options.injectionPointRegexp}`);

            entriesString = (0, _stringify2.default)(manifestEntries, null, 2);

            swFileContents = swFileContents.replace(globalRegexp, `$1${entriesString}$2`);

            _context.prev = 26;
            _context.next = 29;
            return fse.mkdirp(path.dirname(options.swDest));

          case 29:
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t1 = _context['catch'](26);
            throw new Error(errors['unable-to-make-injection-directory'] + ` '${_context.t1.message}'`);

          case 34:
            _context.next = 36;
            return fse.writeFile(config.swDest, swFileContents);

          case 36:
            return _context.abrupt('return', { count, size, warnings });

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 18], [26, 31]]);
  }));

  return function injectManifest(_x) {
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

var assert = require('assert');
var fse = require('fs-extra');
var path = require('path');

var defaults = require('./options/defaults');
var errors = require('../lib/errors');
var getFileManifestEntries = require('../lib/get-file-manifest-entries');
var injectManifestSchema = require('./options/inject-manifest-schema');
var validate = require('./options/validate');

module.exports = injectManifest;