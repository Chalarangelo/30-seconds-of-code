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

import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';

import '../_version.mjs';

/**
 * @param {Blob} blob A source blob.
 * @param {number|null} start The offset to use as the start of the
 * slice.
 * @param {number|null} end The offset to use as the end of the slice.
 * @return {Object} An object with `start` and `end` properties, reflecting
 * the effective boundaries to use given the size of the blob.
 *
 * @private
 */
function calculateEffectiveBoundaries(blob, start, end) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isInstance(blob, Blob, {
      moduleName: 'workbox-range-requests',
      funcName: 'calculateEffectiveBoundaries',
      paramName: 'blob',
    });
  }

  const blobSize = blob.size;

  if (end > blobSize || start < 0) {
    throw new WorkboxError('range-not-satisfiable', {
      size: blobSize,
      end,
      start,
    });
  }

  let effectiveStart;
  let effectiveEnd;

  if (start === null) {
    effectiveStart = blobSize - end;
    effectiveEnd = blobSize;
  } else if (end === null) {
    effectiveStart = start;
    effectiveEnd = blobSize;
  } else {
    effectiveStart = start;
    // Range values are inclusive, so add 1 to the value.
    effectiveEnd = end + 1;
  }

  return {
    start: effectiveStart,
    end: effectiveEnd,
  };
}

export {calculateEffectiveBoundaries};
