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

const generateSWStringSchema = require('./options/generate-sw-string-schema');
const getFileManifestEntries = require('../lib/get-file-manifest-entries');
const populateSWTemplate = require('../lib/populate-sw-template');
const validate = require('./options/validate');

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
async function generateSWString(config) {
  const options = validate(config, generateSWStringSchema);

  const {manifestEntries, warnings} = await getFileManifestEntries(options);

  const swString = await populateSWTemplate(Object.assign({
    manifestEntries,
  }, options));

  return {swString, warnings};
}

module.exports = generateSWString;
