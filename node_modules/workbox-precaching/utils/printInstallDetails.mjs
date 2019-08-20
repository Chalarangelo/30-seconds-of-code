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
 * @param {string} groupTitle
 * @param {Array<PrecacheEntry>} entries
 *
 * @private
 */
const _nestedGroup = (groupTitle, entries) => {
  if (entries.length === 0) {
    return;
  }

  logger.groupCollapsed(groupTitle);

  entries.forEach((entry) => {
    logger.log(entry._originalInput);
  });

  logger.groupEnd();
};

/**
 * @param {Array<Object>} entriesToPrecache
 * @param {Array<Object>} alreadyPrecachedEntries
 *
 * @private
 * @memberof module:workbox-precachig
 */
export default (entriesToPrecache, alreadyPrecachedEntries) => {
  // Goal is to print the message:
  //    Precaching X files.
  // Or:
  //    Precaching X files. Y files were cached and up-to-date.

  const precachedCount = entriesToPrecache.length;
  const alreadyPrecachedCount = alreadyPrecachedEntries.length;
  let printText =
    `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
  if (alreadyPrecachedCount > 0) {
    printText += ` ${alreadyPrecachedCount} ` +
      `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
  }

  logger.groupCollapsed(printText);

  _nestedGroup(
    `View precached URLs.`,
    entriesToPrecache);
  _nestedGroup(
    `View URLs that were already precached.`,
    alreadyPrecachedEntries);
  logger.groupEnd();
};
