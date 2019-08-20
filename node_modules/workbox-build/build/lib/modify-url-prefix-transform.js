'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var errors = require('./errors');

/**
 * Escaping user input to be treated as a literal string within a regular
 * expression can be accomplished by simple replacement.
 *
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @private
 * @param  {string} string The string to be used as part of a regular
 *                         expression
 * @return {string}        A string that is safe to use in a regular
 *                         expression.
 *
 * @private
 */
var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = function (modifyUrlPrefix) {
  if (!modifyUrlPrefix || typeof modifyUrlPrefix !== 'object' || Array.isArray(modifyUrlPrefix)) {
    throw new Error(errors['modify-url-prefix-bad-prefixes']);
  }

  // If there are no entries in modifyUrlPrefix, just return an identity
  // function as a shortcut.
  if ((0, _keys2.default)(modifyUrlPrefix).length === 0) {
    return function (entry) {
      return entry;
    };
  }

  (0, _keys2.default)(modifyUrlPrefix).forEach(function (key) {
    if (typeof modifyUrlPrefix[key] !== 'string') {
      throw new Error(errors['modify-url-prefix-bad-prefixes']);
    }
  });

  // Escape the user input so it's safe to use in a regex.
  var safeModifyUrlPrefixes = (0, _keys2.default)(modifyUrlPrefix).map(escapeRegExp);
  // Join all the `modifyUrlPrefix` keys so a single regex can be used.
  var prefixMatchesStrings = safeModifyUrlPrefixes.join('|');
  // Add `^` to the front the prefix matches so it only matches the start of
  // a string.
  var modifyRegex = new RegExp(`^(${prefixMatchesStrings})`);

  return function (originalManifest) {
    var manifest = originalManifest.map(function (entry) {
      if (typeof entry.url !== 'string') {
        throw new Error(errors['manifest-entry-bad-url']);
      }

      entry.url = entry.url.replace(modifyRegex, function (match) {
        return modifyUrlPrefix[match];
      });

      return entry;
    });

    return { manifest };
  };
};