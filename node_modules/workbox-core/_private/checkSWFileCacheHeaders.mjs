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

import {logger} from './logger.mjs';
import '../_version.mjs';

/**
 * Logs a warning to the user recommending changing
 * to max-age=0 or no-cache.
 *
 * @param {string} cacheControlHeader
 *
 * @private
 */
function showWarning(cacheControlHeader) {
  const docsUrl = 'https://developers.google.com/web/tools/workbox/guides/service-worker-checklist#cache-control_of_your_service_worker_file';
  logger.warn(`You are setting a 'cache-control' header of ` +
    `'${cacheControlHeader}' on your service worker file. This should be ` +
    `set to 'max-age=0' or 'no-cache' to ensure the latest service worker ` +
    `is served to your users. Learn more here: ${docsUrl}`
  );
}

/**
 * Checks for cache-control header on SW file and
 * warns the developer if it exists with a value
 * other than max-age=0 or no-cache.
 *
 * @return {Promise}
 * @private
 */
function checkSWFileCacheHeaders() {
  // This is wrapped as an iife to allow async/await while making
  //  rollup exclude it in builds.
  return (async () => {
    try {
      const swFile = self.location.href;
      const response = await fetch(swFile);
      if (!response.ok) {
        // Response failed so nothing we can check;
        return;
      }

      if (!response.headers.has('cache-control')) {
        // No cache control header.
        return;
      }

      const cacheControlHeader = response.headers.get('cache-control');
      const maxAgeResult = /max-age\s*=\s*(\d*)/g.exec(cacheControlHeader);
      if (maxAgeResult) {
        if (parseInt(maxAgeResult[1], 10) === 0) {
          return;
        }
      }

      if (cacheControlHeader.indexOf('no-cache') !== -1) {
        return;
      }

      if (cacheControlHeader.indexOf('no-store') !== -1) {
        return;
      }

      showWarning(cacheControlHeader);
    } catch (err) {
      // NOOP
    }
  })();
}

const finalCheckSWFileCacheHeaders =
  process.env.NODE_ENV === 'production' ? null : checkSWFileCacheHeaders;

export {finalCheckSWFileCacheHeaders as checkSWFileCacheHeaders};
