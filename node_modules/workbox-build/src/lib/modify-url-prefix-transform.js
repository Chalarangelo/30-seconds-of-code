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

const errors = require('./errors');

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
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = (modifyUrlPrefix) => {
  if (!modifyUrlPrefix ||
      typeof modifyUrlPrefix !== 'object' ||
      Array.isArray(modifyUrlPrefix)) {
    throw new Error(errors['modify-url-prefix-bad-prefixes']);
  }

  // If there are no entries in modifyUrlPrefix, just return an identity
  // function as a shortcut.
  if (Object.keys(modifyUrlPrefix).length === 0) {
    return (entry) => entry;
  }

  Object.keys(modifyUrlPrefix).forEach((key) => {
    if (typeof modifyUrlPrefix[key] !== 'string') {
      throw new Error(errors['modify-url-prefix-bad-prefixes']);
    }
  });

  // Escape the user input so it's safe to use in a regex.
  const safeModifyUrlPrefixes = Object.keys(modifyUrlPrefix).map(escapeRegExp);
  // Join all the `modifyUrlPrefix` keys so a single regex can be used.
  const prefixMatchesStrings = safeModifyUrlPrefixes.join('|');
  // Add `^` to the front the prefix matches so it only matches the start of
  // a string.
  const modifyRegex = new RegExp(`^(${prefixMatchesStrings})`);

  return (originalManifest) => {
    const manifest = originalManifest.map((entry) => {
      if (typeof entry.url !== 'string') {
        throw new Error(errors['manifest-entry-bad-url']);
      }

      entry.url = entry.url.replace(modifyRegex, (match) => {
        return modifyUrlPrefix[match];
      });

      return entry;
    });

    return {manifest};
  };
};
