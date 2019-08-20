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

import {logger} from 'workbox-core/_private/logger.mjs';
import '../_version.mjs';

/**
 * This method will print out a warning if a precache entry doesn't have
 * a `revision` value.
 *
 * This is common if the asset if revisioned in the url like `index.1234.css`.
 *
 * @param {Map} entriesMap
 *
 * @private
 * @memberof module:workbox-preaching
 */
export default (entriesMap) => {
  const urlOnlyEntries = [];
  entriesMap.forEach(
    (entry) => {
      if (typeof entry === 'string' || !entry._originalInput.revision) {
        urlOnlyEntries.push(entry._originalInput);
      }
    }
  );

  if (urlOnlyEntries.length === 0) {
    // No warnings needed.
    return;
  }

  logger.groupCollapsed('Are your precached assets revisioned?');

  const urlsList = urlOnlyEntries.map((urlOnlyEntry) => {
    return `    - ${JSON.stringify(urlOnlyEntry)}`;
  }).join(`\n`);

  logger.warn(
    `The following precache entries might not be revisioned:` +
    `\n\n` +
    urlsList +
    `\n\n`
  );

  logger.unprefixed.warn(`You can learn more about why this might be a ` +
    `problem here: https://developers.google.com/web/tools/workbox/modules/workbox-precaching`);

  logger.groupEnd();
};
