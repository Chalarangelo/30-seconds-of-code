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

import {createPartialResponse} from './createPartialResponse.mjs';

import './_version.mjs';

/**
 * The range request plugin makes it easy for a request with a 'Range' header to
 * be fulfilled by a cached response.
 *
 * It does this by intercepting the `cachedResponseWillBeUsed` plugin callback
 * and returning the appropriate subset of the cached response body.
 *
 * @memberof workbox.rangeRequests
 */
class Plugin {
  /**
   * @param {Object} options
   * @param {Request} options.request The original request, which may or may not
   * contain a Range: header.
   * @param {Response} options.cachedResponse The complete cached response.
   * @return {Promise<Response>} If request contains a 'Range' header, then a
   * new response with status 206 whose body is a subset of `cachedResponse` is
   * returned. Otherwise, `cachedResponse` is returned as-is.
   *
   * @private
   */
  async cachedResponseWillBeUsed({request, cachedResponse}) {
    // Only return a sliced response if there's something valid in the cache,
    // and there's a Range: header in the request.
    if (cachedResponse && request.headers.has('range')) {
      return await createPartialResponse(request, cachedResponse);
    }

    // If there was no Range: header, or if cachedResponse wasn't valid, just
    // pass it through as-is.
    return cachedResponse;
  }
}

export {Plugin};
