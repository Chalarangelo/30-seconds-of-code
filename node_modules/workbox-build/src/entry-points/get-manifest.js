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

const getFileManifestEntries = require('../lib/get-file-manifest-entries');
const getManifestSchema = require('./options/get-manifest-schema');
const validate = require('./options/validate');

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
async function getManifest(config) {
  const options = validate(config, getManifestSchema);

  const {manifestEntries, count, size, warnings} =
    await getFileManifestEntries(options);
  return {manifestEntries, count, size, warnings};
}

module.exports = getManifest;
