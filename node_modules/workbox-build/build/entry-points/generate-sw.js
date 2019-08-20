'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * This method creates a list of URLs to precache, referred to as a "precache
 * manifest", based on the options you provide.
 *
 * It also takes in additional options that configures the service worker's
 * behavior, like any `runtimeCaching` rules it should use.
 *
 * Based on the precache manifest and the additional configuration, it writes
 * a ready-to-use service worker file to disk at `swDest`.
 *
 * @param {Object} config Please refer to the
 * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config).
 * @return {Promise<{count: number, size: number, warnings: Array<string>}>}
 * A promise that resolves once the service worker file has been written to
 * `swDest`. The `size` property contains the aggregate size of all the
 * precached entries, in bytes, and the `count` property contains the total
 * number of precached entries. Any non-fatal warning messages will be returned
 * via `warnings`.
 *
 * @memberof module:workbox-build
 */
var generateSW = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
    var options, destDirectory, cdnUrl, workboxDirectoryName, workboxSWPkg, workboxSWFilename, _ref2, count, size, manifestEntries, warnings;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = validate(config, generateSWSchema);
            destDirectory = path.dirname(options.swDest);

            // Do nothing if importWorkboxFrom is set to 'disabled'. Otherwise, check:

            if (!(options.importWorkboxFrom === 'cdn')) {
              _context.next = 7;
              break;
            }

            cdnUrl = cdnUtils.getModuleUrl('workbox-sw');

            options.workboxSWImport = cdnUrl;
            _context.next = 16;
            break;

          case 7:
            if (!(options.importWorkboxFrom === 'local')) {
              _context.next = 16;
              break;
            }

            _context.next = 10;
            return copyWorkboxLibraries(destDirectory);

          case 10:
            workboxDirectoryName = _context.sent;


            // The Workbox library files should not be precached, since they're cached
            // automatically by virtue of being used with importScripts().
            options.globIgnores = [`**/${workboxDirectoryName}/*.js*`].concat(options.globIgnores || []);

            workboxSWPkg = require(`workbox-sw/package.json`);
            workboxSWFilename = path.basename(workboxSWPkg.main);


            options.workboxSWImport = `${workboxDirectoryName}/${workboxSWFilename}`;
            options.modulePathPrefix = workboxDirectoryName;

          case 16:
            _context.next = 18;
            return getFileManifestEntries(options);

          case 18:
            _ref2 = _context.sent;
            count = _ref2.count;
            size = _ref2.size;
            manifestEntries = _ref2.manifestEntries;
            warnings = _ref2.warnings;
            _context.next = 25;
            return writeServiceWorkerUsingDefaultTemplate((0, _assign2.default)({
              manifestEntries
            }, options));

          case 25:
            return _context.abrupt('return', { count, size, warnings });

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateSW(_x) {
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

var path = require('path');

var cdnUtils = require('../lib/cdn-utils');
var copyWorkboxLibraries = require('../lib/copy-workbox-libraries');
var generateSWSchema = require('./options/generate-sw-schema');
var getFileManifestEntries = require('../lib/get-file-manifest-entries');
var validate = require('./options/validate');
var writeServiceWorkerUsingDefaultTemplate = require('../lib/write-sw-using-default-template');

module.exports = generateSW;