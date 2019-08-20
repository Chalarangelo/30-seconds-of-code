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

import '../_version.mjs';

/**
 * Used as a consistent way of referencing a URL to precache.
 *
 * @private
 * @memberof module:workbox-precaching
 */
export default class PrecacheEntry {
/**
 * This class ensures all cache list entries are consistent and
 * adds cache busting if required.
 *
 * @param {*} originalInput
 * @param {string} url
 * @param {string} revision
 * @param {boolean} shouldCacheBust
 */
  constructor(originalInput, url, revision, shouldCacheBust) {
    this._originalInput = originalInput;
    this._entryId = url;
    this._revision = revision;
    const requestAsCacheKey = new Request(url, {credentials: 'same-origin'});
    this._cacheRequest = requestAsCacheKey;
    this._networkRequest = shouldCacheBust ?
      this._cacheBustRequest(requestAsCacheKey) : requestAsCacheKey;
  }

  /**
   * This method will either use Request.cache option OR append a cache
   * busting parameter to the URL.
   *
   * @param {Request} request The request to cache bust
   * @return {Request} A cachebusted Request
   *
   * @private
   */
  _cacheBustRequest(request) {
    let url = request.url;
    const requestOptions = {
      credentials: 'same-origin',
    };
    if ('cache' in Request.prototype) {
      // Make use of the Request cache mode where we can.
      // Reload skips the HTTP cache for outgoing requests and updates
      // the cache with the returned response.
      requestOptions.cache = 'reload';
    } else {
      const parsedURL = new URL(url, location);

      // This is done so the minifier can mangle 'global.encodeURIComponent'
      const _encodeURIComponent = encodeURIComponent;

      parsedURL.search += (parsedURL.search ? '&' : '') +
        _encodeURIComponent(`_workbox-cache-bust`) + '=' +
        _encodeURIComponent(this._revision);
      url = parsedURL.toString();
    }

    return new Request(url, requestOptions);
  }
}
