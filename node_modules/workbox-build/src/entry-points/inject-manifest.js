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

const assert = require('assert');
const fse = require('fs-extra');
const path = require('path');

const defaults = require('./options/defaults');
const errors = require('../lib/errors');
const getFileManifestEntries = require('../lib/get-file-manifest-entries');
const injectManifestSchema = require('./options/inject-manifest-schema');
const validate = require('./options/validate');

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
async function injectManifest(config) {
  const options = validate(config, injectManifestSchema);

  if (path.normalize(config.swSrc) === path.normalize(config.swDest)) {
    throw new Error(errors['same-src-and-dest']);
  }

  const globalRegexp = new RegExp(options.injectionPointRegexp, 'g');

  const {count, size, manifestEntries, warnings} =
    await getFileManifestEntries(options);
  let swFileContents;
  try {
    swFileContents = await fse.readFile(config.swSrc, 'utf8');
  } catch (error) {
    throw new Error(`${errors['invalid-sw-src']} ${error.message}`);
  }

  const injectionResults = swFileContents.match(globalRegexp);
  assert(injectionResults, errors['injection-point-not-found'] +
    // Customize the error message when this happens:
    // - If the default RegExp is used, then include the expected string that
    //   matches as a hint to the developer.
    // - If a custom RegExp is used, then just include the raw RegExp.
    (options.injectionPointRegexp === defaults.injectionPointRegexp ?
      'workbox.precaching.precacheAndRoute([])' :
      options.injectionPointRegexp));
  assert(injectionResults.length === 1, errors['multiple-injection-points'] +
    ` ${options.injectionPointRegexp}`);

  const entriesString = JSON.stringify(manifestEntries, null, 2);
  swFileContents = swFileContents.replace(globalRegexp, `$1${entriesString}$2`);

  try {
    await fse.mkdirp(path.dirname(options.swDest));
  } catch (error) {
    throw new Error(errors['unable-to-make-injection-directory'] +
      ` '${error.message}'`);
  }

  await fse.writeFile(config.swDest, swFileContents);

  return {count, size, warnings};
}

module.exports = injectManifest;
