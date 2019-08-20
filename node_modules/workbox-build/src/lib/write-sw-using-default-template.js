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

const fse = require('fs-extra');
const path = require('path');

const errors = require('./errors');
const populateSWTemplate = require('./populate-sw-template');

module.exports = async ({
  cacheId,
  clientsClaim,
  directoryIndex,
  handleFetch,
  ignoreUrlParametersMatching,
  importScripts,
  manifestEntries,
  modulePathPrefix,
  navigateFallback,
  navigateFallbackBlacklist,
  navigateFallbackWhitelist,
  offlineGoogleAnalytics,
  runtimeCaching,
  skipWaiting,
  swDest,
  workboxSWImport,
}) => {
  try {
    await fse.mkdirp(path.dirname(swDest));
  } catch (error) {
    throw new Error(`${errors['unable-to-make-sw-directory']}. ` +
      `'${error.message}'`);
  }

  const populatedTemplate = populateSWTemplate({
    cacheId,
    clientsClaim,
    directoryIndex,
    handleFetch,
    ignoreUrlParametersMatching,
    importScripts,
    manifestEntries,
    modulePathPrefix,
    navigateFallback,
    navigateFallbackBlacklist,
    navigateFallbackWhitelist,
    offlineGoogleAnalytics,
    runtimeCaching,
    skipWaiting,
    workboxSWImport,
  });

  try {
    await fse.writeFile(swDest, populatedTemplate);
  } catch (error) {
    if (error.code === 'EISDIR') {
      // See https://github.com/GoogleChrome/workbox/issues/612
      throw new Error(errors['sw-write-failure-directory']);
    }
    throw new Error(`${errors['sw-write-failure']}. '${error.message}'`);
  }
};
