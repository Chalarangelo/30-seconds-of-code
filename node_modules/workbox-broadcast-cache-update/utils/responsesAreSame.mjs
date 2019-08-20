/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import '../_version.mjs';

/**
 * Given two `Response's`, compares several header values to see if they are
 * the same or not.
 *
 * @param {Response} firstResponse
 * @param {Response} secondResponse
 * @param {Array<string>} headersToCheck
 * @return {boolean}
 *
 * @memberof workbox.broadcastUpdate
 * @private
 */
const responsesAreSame = (firstResponse, secondResponse, headersToCheck) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(firstResponse instanceof Response &&
      secondResponse instanceof Response)) {
      throw new WorkboxError('invalid-responses-are-same-args');
    }
  }

  const atLeastOneHeaderAvailable = headersToCheck.some((header) => {
    return firstResponse.headers.has(header) &&
      secondResponse.headers.has(header);
  });

  if (!atLeastOneHeaderAvailable) {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(`Unable to determine where the response has been updated ` +
        `because none of the headers that would be checked are present.`);
      logger.debug(`Attempting to compare the following: `,
        firstResponse, secondResponse, headersToCheck);
    }

    // Just return true, indicating the that responses are the same, since we
    // can't determine otherwise.
    return true;
  }

  return headersToCheck.every((header) => {
    const headerStateComparison = firstResponse.headers.has(header) ===
      secondResponse.headers.has(header);
    const headerValueComparison = firstResponse.headers.get(header) ===
      secondResponse.headers.get(header);

    return headerStateComparison && headerValueComparison;
  });
};

export {responsesAreSame};
