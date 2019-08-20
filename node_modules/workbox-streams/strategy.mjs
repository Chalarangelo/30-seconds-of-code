/*
 Copyright 2018 Google Inc. All Rights Reserved.
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

import {logger} from 'workbox-core/_private/logger.mjs';

import {createHeaders} from './utils/createHeaders.mjs';
import {concatenateToResponse} from './concatenateToResponse.mjs';
import {isSupported} from './isSupported.mjs';

import './_version.mjs';

/**
 * A shortcut to create a strategy that could be dropped-in to Workbox's router.
 *
 * On browsers that do not support constructing new `ReadableStream`s, this
 * strategy will automatically wait for all the `sourceFunctions` to complete,
 * and create a final response that concatenates their values together.
 *
 * @param {
 *   Array<function(workbox.routing.Route~handlerCallback)>} sourceFunctions
 * Each function should return a {@link workbox.streams.StreamSource} (or a
 * Promise which resolves to one).
 * @param {HeadersInit} [headersInit] If there's no `Content-Type` specified,
 * `'text/html'` will be used by default.
 * @return {workbox.routing.Route~handlerCallback}
 *
 * @memberof workbox.streams
 */
export function strategy(sourceFunctions, headersInit) {
  return async ({event, url, params}) => {
    if (isSupported()) {
      const {done, response} = concatenateToResponse(sourceFunctions.map(
        (sourceFunction) => sourceFunction({event, url, params})), headersInit);
      event.waitUntil(done);
      return response;
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.log(`The current browser doesn't support creating response ` +
        `streams. Falling back to non-streaming response instead.`);
    }

    // Fallback to waiting for everything to finish, and concatenating the
    // responses.
    const parts = await Promise.all(
      sourceFunctions.map(
        (sourceFunction) => sourceFunction({event, url, params})
      ).map(async (responsePromise) => {
        const response = await responsePromise;
        if (response instanceof Response) {
          return response.blob();
        }

        // Otherwise, assume it's something like a string which can be used
        // as-is when constructing the final composite blob.
        return response;
      })
    );

    const headers = createHeaders(headersInit);
    // Constructing a new Response from a Blob source is well-supported.
    // So is constructing a new Blob from multiple source Blobs or strings.
    return new Response(new Blob(parts), {headers});
  };
}
