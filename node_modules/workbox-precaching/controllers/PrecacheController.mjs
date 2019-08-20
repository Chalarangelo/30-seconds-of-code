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

import {cacheNames} from 'workbox-core/_private/cacheNames.mjs';
import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {fetchWrapper} from 'workbox-core/_private/fetchWrapper.mjs';
import {cacheWrapper} from 'workbox-core/_private/cacheWrapper.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';
import PrecacheEntry from '../models/PrecacheEntry.mjs';
import PrecachedDetailsModel from '../models/PrecachedDetailsModel.mjs';
import showWarningsIfNeeded from '../utils/showWarningsIfNeeded.mjs';
import printInstallDetails from '../utils/printInstallDetails.mjs';
import printCleanupDetails from '../utils/printCleanupDetails.mjs';
import cleanRedirect from '../utils/cleanRedirect.mjs';
import '../_version.mjs';

/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox.precaching
 */
class PrecacheController {
  /**
   * Create a new PrecacheController.
   *
   * @param {string} cacheName
   */
  constructor(cacheName) {
    this._cacheName = cacheNames.getPrecacheName(cacheName);
    this._entriesToCacheMap = new Map();
    this._precacheDetailsModel = new PrecachedDetailsModel(this._cacheName);
  }

  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {
   * Array<module:workbox-precaching.PrecacheController.PrecacheEntry|string>
   * } entries Array of entries to
   * precache.
   */
  addToCacheList(entries) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isArray(entries, {
        moduleName: 'workbox-precaching',
        className: 'PrecacheController',
        funcName: 'addToCacheList',
        paramName: 'entries',
      });
    }

    entries.map((userEntry) => {
      this._addEntryToCacheList(
        this._parseEntry(userEntry)
      );
    });
  }

  /**
   * This method returns a precache entry.
   *
   * @private
   * @param {string|Object} input
   * @return {PrecacheEntry}
   */
  _parseEntry(input) {
    switch (typeof input) {
      case 'string': {
        if (process.env.NODE_ENV !== 'production') {
          if (input.length === 0) {
            throw new WorkboxError(
              'add-to-cache-list-unexpected-type', {
                entry: input,
              }
            );
          }
        }

        return new PrecacheEntry(input, input, input);
      }
      case 'object': {
        if (process.env.NODE_ENV !== 'production') {
          if (!input || !input.url) {
            throw new WorkboxError(
              'add-to-cache-list-unexpected-type', {
                entry: input,
              }
            );
          }
        }

        return new PrecacheEntry(
          input, input.url, input.revision || input.url, !!input.revision);
      }
      default:
        throw new WorkboxError('add-to-cache-list-unexpected-type', {
          entry: input,
        });
    }
  }

  /**
   * Adds an entry to the precache list, accounting for possible duplicates.
   *
   * @private
   * @param {PrecacheEntry} entryToAdd
   */
  _addEntryToCacheList(entryToAdd) {
    // Check if the entry is already part of the map
    const existingEntry = this._entriesToCacheMap.get(entryToAdd._entryId);
    if (!existingEntry) {
      this._entriesToCacheMap.set(entryToAdd._entryId, entryToAdd);
      return;
    }

    // Duplicates are fine, but make sure the revision information
    // is the same.
    if (existingEntry._revision !== entryToAdd._revision) {
      throw new WorkboxError('add-to-cache-list-conflicting-entries', {
        firstEntry: existingEntry._originalInput,
        secondEntry: entryToAdd._originalInput,
      });
    }
  }

  /**
   * Call this method from a service work install event to start
   * precaching assets.
   *
   * @param {Object} options
   * @param {boolean} [options.suppressWarnings] Suppress warning messages.
   * @param {Event} [options.event] The install event (if needed).
   * @param {Array<Object>} [options.plugins] Plugins to be used for fetching
   *     and caching during install.
   * @return {Promise<workbox.precaching.InstallResult>}
   */
  async install({suppressWarnings = false, event, plugins} = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (suppressWarnings !== true) {
        showWarningsIfNeeded(this._entriesToCacheMap);
      }

      if (plugins) {
        assert.isArray(plugins, {
          moduleName: 'workbox-precaching',
          className: 'PrecacheController',
          funcName: 'install',
          paramName: 'plugins',
        });
      }
    }

    // Empty the temporary cache.
    // NOTE: We remove all entries instead of deleting the cache as the cache
    // may be marked for deletion but still exist until a later stage
    // resulting in unexpected behavior of being deletect when all references
    // are dropped.
    // https://github.com/GoogleChrome/workbox/issues/1368
    const tempCache = await caches.open(this._getTempCacheName());
    const requests = await tempCache.keys();
    await Promise.all(requests.map((request) => {
      return tempCache.delete(request);
    }));

    const entriesToPrecache = [];
    const entriesAlreadyPrecached = [];

    for (const precacheEntry of this._entriesToCacheMap.values()) {
      if (await this._precacheDetailsModel._isEntryCached(
        this._cacheName, precacheEntry)) {
        entriesAlreadyPrecached.push(precacheEntry);
      } else {
        entriesToPrecache.push(precacheEntry);
      }
    }

    // Wait for all requests to be cached.
    await Promise.all(entriesToPrecache.map((precacheEntry) => {
      return this._cacheEntryInTemp({event, plugins, precacheEntry});
    }));

    if (process.env.NODE_ENV !== 'production') {
      printInstallDetails(entriesToPrecache, entriesAlreadyPrecached);
    }

    return {
      updatedEntries: entriesToPrecache,
      notUpdatedEntries: entriesAlreadyPrecached,
    };
  }

  /**
   * Takes the current set of temporary files and moves them to the final
   * cache, deleting the temporary cache once copying is complete.
   *
   * @param {Object} options
   * @param {Array<Object>} options.plugins Plugins to be used for fetching
   * and caching during install.
   * @return {
   * Promise<workbox.precaching.CleanupResult>}
   * Resolves with an object containing details of the deleted cache requests
   * and precache revision details.
   */
  async activate(options = {}) {
    const tempCache = await caches.open(this._getTempCacheName());

    const requests = await tempCache.keys();
    // Process each request/response one at a time, deleting the temporary entry
    // when done, to help avoid triggering quota errors.
    for (const request of requests) {
      const response = await tempCache.match(request);
      await cacheWrapper.put({
        cacheName: this._cacheName,
        request,
        response,
        plugins: options.plugins,
      });
      await tempCache.delete(request);
    }

    return this._cleanup();
  }

  /**
   * Returns the name of the temporary cache.
   *
   * @return {string}
   *
   * @private
   */
  _getTempCacheName() {
    return `${this._cacheName}-temp`;
  }

  /**
   * Requests the entry and saves it to the cache if the response
   * is valid.
   *
   * @private
   * @param {Object} options
   * @param {BaseCacheEntry} options.precacheEntry The entry to fetch and cache.
   * @param {Event} [options.event] The install event (if passed).
   * @param {Array<Object>} [options.plugins] An array of plugins to apply to
   *     fetch and caching.
   * @return {Promise<boolean>} Returns a promise that resolves once the entry
   *     has been fetched and cached or skipped if no update is needed. The
   *     promise resolves with true if the entry was cached / updated and
   *     false if the entry is already cached and up-to-date.
   */
  async _cacheEntryInTemp({precacheEntry, event, plugins}) {
    let response = await fetchWrapper.fetch({
      request: precacheEntry._networkRequest,
      event,
      fetchOptions: null,
      plugins,
    });

    if (response.redirected) {
      response = await cleanRedirect(response);
    }

    await cacheWrapper.put({
      cacheName: this._getTempCacheName(),
      request: precacheEntry._cacheRequest,
      response,
      event,
      plugins,
    });

    await this._precacheDetailsModel._addEntry(precacheEntry);

    return true;
  }

  /**
   * Compare the URLs and determines which assets are no longer required
   * in the cache.
   *
   * This should be called in the service worker activate event.
   *
   * @return {
   * Promise<workbox.precaching.CleanupResult>}
   * Resolves with an object containing details of the deleted cache requests
   * and precache revision details.
   *
   * @private
   */
  async _cleanup() {
    const expectedCacheUrls = [];
    this._entriesToCacheMap.forEach((entry) => {
      const fullUrl = new URL(entry._cacheRequest.url, location).toString();
      expectedCacheUrls.push(fullUrl);
    });

    const [deletedCacheRequests, deletedRevisionDetails] = await Promise.all([
      this._cleanupCache(expectedCacheUrls),
      this._cleanupDetailsModel(expectedCacheUrls),
    ]);

    if (process.env.NODE_ENV !== 'production') {
      printCleanupDetails(deletedCacheRequests, deletedRevisionDetails);
    }

    return {
      deletedCacheRequests,
      deletedRevisionDetails,
    };
  }

  /**
   * Goes through all the cache entries and removes any that are
   * outdated.
   *
   * @private
   * @param {Array<string>} expectedCacheUrls Array of URLs that are
   * expected to be cached.
   * @return {Promise<Array<string>>} Resolves to an array of URLs
   * of cached requests that were deleted.
   */
  async _cleanupCache(expectedCacheUrls) {
    if (!await caches.has(this._cacheName)) {
      // Cache doesn't exist, so nothing to delete
      return [];
    }

    const cache = await caches.open(this._cacheName);
    const cachedRequests = await cache.keys();
    const cachedRequestsToDelete = cachedRequests.filter((cachedRequest) => {
      return !expectedCacheUrls.includes(
        new URL(cachedRequest.url, location).toString()
      );
    });

    await Promise.all(
      cachedRequestsToDelete.map((cacheUrl) => cache.delete(cacheUrl))
    );

    return cachedRequestsToDelete.map((request) => request.url);
  }

  /**
   * Goes through all entries in indexedDB and removes any that are outdated.
   *
   * @private
   * @param {Array<string>} expectedCacheUrls Array of URLs that are
   * expected to be cached.
   * @return {Promise<Array<string>>} Resolves to an array of URLs removed
   * from indexedDB.
   */
  async _cleanupDetailsModel(expectedCacheUrls) {
    const revisionedEntries = await this._precacheDetailsModel._getAllEntries();
    const detailsToDelete = revisionedEntries
      .filter((entry) => {
        const fullUrl = new URL(entry.value.url, location).toString();
        return !expectedCacheUrls.includes(fullUrl);
      });

    await Promise.all(
      detailsToDelete.map(
        (entry) => this._precacheDetailsModel._deleteEntry(entry.primaryKey)
      )
    );
    return detailsToDelete.map((entry) => {
      return entry.value.url;
    });
  }

  /**
   * Returns an array of fully qualified URL's that will be precached.
   *
   * @return {Array<string>} An array of URLs.
   */
  getCachedUrls() {
    return Array.from(this._entriesToCacheMap.keys())
    .map((url) => new URL(url, location).href);
  }
}

export default PrecacheController;
