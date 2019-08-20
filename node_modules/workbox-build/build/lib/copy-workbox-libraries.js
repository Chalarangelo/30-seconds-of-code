'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
var useBuildType = require('./use-build-type');

// Used to filter the libraries to copy based on our package.json dependencies.
var WORKBOX_PREFIX = 'workbox-';
var BUILD_TYPES = ['dev', 'prod'];

/**
 * This copies over a set of runtime libraries used by Workbox into a
 * local directory, which should be deployed alongside your service worker file.
 *
 * As an alternative to deploying these local copies, you could instead use
 * Workbox from its official CDN URL.
 *
 * This method is exposed for the benefit of developers using
 * [injectManifest()]{@link module:workbox-build.injectManifest} who would
 * prefer not to use the CDN copies of Workbox. Developers using
 * [generateSW()]{@link module:workbox-build.generateSW} don't need to
 * explicitly call this method, as it's called automatically when
 * `importWorkboxFrom` is set to `local`.
 *
 * @param {string} destDirectory The path to the parent directory under which
 * the new directory of libraries will be created.
 * @return {Promise<string>} The name of the newly created directory.
 *
 * @alias module:workbox-build.copyWorkboxLibraries
 */
module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(destDirectory) {
    var thisPkg, workboxDirectoryName, workboxDirectoryPath, copyPromises, librariesToCopy, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, library, pkg, defaultPathToLibrary, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, buildType, srcPath, destPath;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            thisPkg = require('../../package.json');
            // Use the version string from workbox-build in the name of the parent
            // directory. This should be safe, because lerna will bump workbox-build's
            // pkg.version whenever one of the dependent libraries gets bumped, and we
            // care about versioning the dependent libraries.

            workboxDirectoryName = `workbox-v${thisPkg.version}`;
            workboxDirectoryPath = path.join(destDirectory, workboxDirectoryName);
            _context.next = 5;
            return fse.ensureDir(workboxDirectoryPath);

          case 5:
            copyPromises = [];
            librariesToCopy = (0, _keys2.default)(thisPkg.dependencies).filter(function (dependency) {
              return dependency.startsWith(WORKBOX_PREFIX);
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator = (0, _getIterator3.default)(librariesToCopy);

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 49;
              break;
            }

            library = _step.value;
            pkg = require(`${library}/package.json`);
            defaultPathToLibrary = require.resolve(`${library}/${pkg.main}`);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 19;
            _iterator2 = (0, _getIterator3.default)(BUILD_TYPES);

          case 21:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 32;
              break;
            }

            buildType = _step2.value;

            if (!(library === 'workbox-sw' && buildType === BUILD_TYPES[0])) {
              _context.next = 25;
              break;
            }

            return _context.abrupt('continue', 29);

          case 25:
            srcPath = useBuildType(defaultPathToLibrary, buildType);
            destPath = path.join(workboxDirectoryPath, path.basename(srcPath));

            copyPromises.push(fse.copy(srcPath, destPath));
            copyPromises.push(fse.copy(`${srcPath}.map`, `${destPath}.map`));

          case 29:
            _iteratorNormalCompletion2 = true;
            _context.next = 21;
            break;

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context['catch'](19);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 38:
            _context.prev = 38;
            _context.prev = 39;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 41:
            _context.prev = 41;

            if (!_didIteratorError2) {
              _context.next = 44;
              break;
            }

            throw _iteratorError2;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(38);

          case 46:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 49:
            _context.next = 55;
            break;

          case 51:
            _context.prev = 51;
            _context.t1 = _context['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 55:
            _context.prev = 55;
            _context.prev = 56;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 58:
            _context.prev = 58;

            if (!_didIteratorError) {
              _context.next = 61;
              break;
            }

            throw _iteratorError;

          case 61:
            return _context.finish(58);

          case 62:
            return _context.finish(55);

          case 63:
            _context.prev = 63;
            _context.next = 66;
            return _promise2.default.all(copyPromises);

          case 66:
            return _context.abrupt('return', workboxDirectoryName);

          case 69:
            _context.prev = 69;
            _context.t2 = _context['catch'](63);
            throw Error(`${errors['unable-to-copy-workbox-libraries']} ${_context.t2}`);

          case 72:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[10, 51, 55, 63], [19, 34, 38, 46], [39,, 41, 45], [56,, 58, 62], [63, 69]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();