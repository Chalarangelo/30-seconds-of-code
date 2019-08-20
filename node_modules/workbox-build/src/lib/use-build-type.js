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

// This is the build type that is expected to be present "by default".
const DEFAULT_BUILD_TYPE = 'prod';

/**
 * Switches a string from using the "default" build type to an alternative
 * build type. In practice, this is used to swap out "prod" for "dev" in the
 * filename of a Workbox library.
 *
 * @param {string} source The path to a file, which will normally contain
 * DEFAULT_BUILD_TYPE somewhere in it.
 * @param {string} buildType The alternative build type value to swap in.
 * @return {string} source, with the last occurrence of DEFAULT_BUILD_TYPE
 * replaced with buildType.
 * @private
 */
module.exports = (source, buildType) => {
  // If we want the DEFAULT_BUILD_TYPE, then just return things as-is.
  if (buildType === DEFAULT_BUILD_TYPE) {
    return source;
  }
  // Otherwise, look for the last instance of DEFAULT_BUILD_TYPE, and replace it
  // with the new buildType. This is easier via split/join than RegExp.
  const parts = source.split(DEFAULT_BUILD_TYPE);
  // Join the last two split parts with the new buildType. (If parts only has
  // one item, this will be a no-op.)
  const replaced = parts.slice(parts.length - 2).join(buildType);
  // Take the remaining parts, if any exist, and join them with the replaced
  // part using the DEFAULT_BUILD_TYPE, to restore any other matches as-is.
  return [
    ...parts.slice(0, parts.length - 2),
    replaced,
  ].join(DEFAULT_BUILD_TYPE);
};
