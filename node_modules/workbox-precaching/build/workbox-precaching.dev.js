this.workbox = this.workbox || {};
this.workbox.precaching = (function (DBWrapper_mjs,logger_mjs,cacheNames_mjs,WorkboxError_mjs,fetchWrapper_mjs,cacheWrapper_mjs,assert_mjs,getFriendlyURL_mjs) {
  'use strict';

  try {
    self.workbox.v['workbox:precaching:3.6.3'] = 1;
  } catch (e) {} // eslint-disable-line

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

  /**
   * Used as a consistent way of referencing a URL to precache.
   *
   * @private
   * @memberof module:workbox-precaching
   */
  class PrecacheEntry {
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
      const requestAsCacheKey = new Request(url, { credentials: 'same-origin' });
      this._cacheRequest = requestAsCacheKey;
      this._networkRequest = shouldCacheBust ? this._cacheBustRequest(requestAsCacheKey) : requestAsCacheKey;
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
        credentials: 'same-origin'
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

        parsedURL.search += (parsedURL.search ? '&' : '') + _encodeURIComponent(`_workbox-cache-bust`) + '=' + _encodeURIComponent(this._revision);
        url = parsedURL.toString();
      }

      return new Request(url, requestOptions);
    }
  }

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

  // Allows minifier to mangle this name
  const REVISON_IDB_FIELD = 'revision';
  const URL_IDB_FIELD = 'url';
  const DB_STORE_NAME = 'precached-details-models';
  /**
   * This model will track the relevant information of entries that
   * are cached and their matching revision details.
   *
   * @private
   */
  class PrecachedDetailsModel {
    /**
     * Construct a new model for a specific cache.
     *
     * @param {string} dbName
     * @private
     */
    constructor(dbName) {
      // This ensures the db name contains only letters, numbers, '-', '_' and '$'
      const filteredDBName = dbName.replace(/[^\w-]/g, '_');
      this._db = new DBWrapper_mjs.DBWrapper(filteredDBName, 2, {
        onupgradeneeded: this._handleUpgrade
      });
    }

    /**
     * Should perform an upgrade of indexedDB.
     *
     * @param {Event} evt
     *
     * @private
     */
    _handleUpgrade(evt) {
      const db = evt.target.result;
      if (evt.oldVersion < 2) {
        // IndexedDB version 1 used both 'workbox-precaching' and
        // 'precached-details-model' before upgrading to version 2.
        // Delete them and create a new store with latest schema.
        if (db.objectStoreNames.contains('workbox-precaching')) {
          db.deleteObjectStore('workbox-precaching');
        }
        if (db.objectStoreNames.contains(DB_STORE_NAME)) {
          db.deleteObjectStore(DB_STORE_NAME);
        }
      }
      db.createObjectStore(DB_STORE_NAME);
    }

    /**
     * Check if an entry is already cached. Returns false if
     * the entry isn't cached or the revision has changed.
     *
     * @param {string} cacheName
     * @param {PrecacheEntry} precacheEntry
     * @return {boolean}
     *
     * @private
     */
    _isEntryCached(cacheName, precacheEntry) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        const revisionDetails = yield _this._getRevision(precacheEntry._entryId);
        if (revisionDetails !== precacheEntry._revision) {
          return false;
        }

        const openCache = yield caches.open(cacheName);
        const cachedResponse = yield openCache.match(precacheEntry._cacheRequest);
        return !!cachedResponse;
      })();
    }

    /**
     * @return {Promise<Array>}
     *
     * @private
     */
    _getAllEntries() {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        return yield _this2._db.getAllMatching(DB_STORE_NAME, {
          includeKeys: true
        });
      })();
    }

    /**
     * Get the current revision details.
     *
     * @param {Object} entryId
     * @return {Promise<string|null>}
     *
     * @private
     */
    _getRevision(entryId) {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const data = yield _this3._db.get(DB_STORE_NAME, entryId);
        return data ? data[REVISON_IDB_FIELD] : null;
      })();
    }

    /**
     * Add an entry to the details model.
     *
     * @param {PrecacheEntry} precacheEntry
     *
     * @private
     */
    _addEntry(precacheEntry) {
      var _this4 = this;

      return babelHelpers.asyncToGenerator(function* () {
        yield _this4._db.put(DB_STORE_NAME, {
          [REVISON_IDB_FIELD]: precacheEntry._revision,
          [URL_IDB_FIELD]: precacheEntry._cacheRequest.url
        }, precacheEntry._entryId);
      })();
    }

    /**
     * Delete entry from details model.
     *
     * @param {string} entryId
     *
     * @private
     */
    _deleteEntry(entryId) {
      var _this5 = this;

      return babelHelpers.asyncToGenerator(function* () {
        yield _this5._db.delete(DB_STORE_NAME, entryId);
      })();
    }
  }

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
  var showWarningsIfNeeded = (entriesMap => {
    const urlOnlyEntries = [];
    entriesMap.forEach(entry => {
      if (typeof entry === 'string' || !entry._originalInput.revision) {
        urlOnlyEntries.push(entry._originalInput);
      }
    });

    if (urlOnlyEntries.length === 0) {
      // No warnings needed.
      return;
    }

    logger_mjs.logger.groupCollapsed('Are your precached assets revisioned?');

    const urlsList = urlOnlyEntries.map(urlOnlyEntry => {
      return `    - ${JSON.stringify(urlOnlyEntry)}`;
    }).join(`\n`);

    logger_mjs.logger.warn(`The following precache entries might not be revisioned:` + `\n\n` + urlsList + `\n\n`);

    logger_mjs.logger.unprefixed.warn(`You can learn more about why this might be a ` + `problem here: https://developers.google.com/web/tools/workbox/modules/workbox-precaching`);

    logger_mjs.logger.groupEnd();
  });

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

    logger_mjs.logger.groupCollapsed(groupTitle);

    entries.forEach(entry => {
      logger_mjs.logger.log(entry._originalInput);
    });

    logger_mjs.logger.groupEnd();
  };

  /**
   * @param {Array<Object>} entriesToPrecache
   * @param {Array<Object>} alreadyPrecachedEntries
   *
   * @private
   * @memberof module:workbox-precachig
   */
  var printInstallDetails = ((entriesToPrecache, alreadyPrecachedEntries) => {
    // Goal is to print the message:
    //    Precaching X files.
    // Or:
    //    Precaching X files. Y files were cached and up-to-date.

    const precachedCount = entriesToPrecache.length;
    const alreadyPrecachedCount = alreadyPrecachedEntries.length;
    let printText = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
    if (alreadyPrecachedCount > 0) {
      printText += ` ${alreadyPrecachedCount} ` + `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
    }

    logger_mjs.logger.groupCollapsed(printText);

    _nestedGroup(`View precached URLs.`, entriesToPrecache);
    _nestedGroup(`View URLs that were already precached.`, alreadyPrecachedEntries);
    logger_mjs.logger.groupEnd();
  });

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

  const logGroup = (groupTitle, urls) => {
    logger_mjs.logger.groupCollapsed(groupTitle);

    urls.forEach(url => {
      logger_mjs.logger.log(url);
    });

    logger_mjs.logger.groupEnd();
  };

  /**
   * @param {Array<string>} deletedCacheRequests
   * @param {Array<string>} deletedRevisionDetails
   *
   * @private
   * @memberof module:workbox-precachig
   */
  var printCleanupDetails = ((deletedCacheRequests, deletedRevisionDetails) => {
    if (deletedCacheRequests.length === 0 && deletedRevisionDetails.length === 0) {
      return;
    }

    const cacheDeleteCount = deletedCacheRequests.length;
    const revisionDeleteCount = deletedRevisionDetails.length;

    const cacheDeleteText = `${cacheDeleteCount} cached ` + `request${cacheDeleteCount === 1 ? ' was' : 's were'} deleted`;
    const revisionDeleteText = `${revisionDeleteCount} ` + `${revisionDeleteCount === 1 ? 'entry' : 'entries'} ` + `${revisionDeleteCount === 1 ? 'was' : 'were'} deleted from IndexedDB.`;

    logger_mjs.logger.groupCollapsed(`During precaching cleanup, ${cacheDeleteText} and ${revisionDeleteText}`);

    logGroup('Deleted Cache Requests', deletedCacheRequests);
    logGroup('Revision Details Deleted from DB', deletedRevisionDetails);

    logger_mjs.logger.groupEnd();
  });

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

  /**
   * @param {Response} response
   * @return {Response}
   *
   * @private
   * @memberof module:workbox-precaching
   */
  const cleanRedirect = (() => {
    var _ref = babelHelpers.asyncToGenerator(function* (response) {
      const clonedResponse = response.clone();

      // Not all browsers support the Response.body stream, so fall back
      // to reading the entire body into memory as a blob.
      const bodyPromise = 'body' in clonedResponse ? Promise.resolve(clonedResponse.body) : clonedResponse.blob();

      const body = yield bodyPromise;

      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: clonedResponse.headers,
        status: clonedResponse.status,
        statusText: clonedResponse.statusText
      });
    });

    return function cleanRedirect(_x) {
      return _ref.apply(this, arguments);
    };
  })();

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
      this._cacheName = cacheNames_mjs.cacheNames.getPrecacheName(cacheName);
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
      {
        assert_mjs.assert.isArray(entries, {
          moduleName: 'workbox-precaching',
          className: 'PrecacheController',
          funcName: 'addToCacheList',
          paramName: 'entries'
        });
      }

      entries.map(userEntry => {
        this._addEntryToCacheList(this._parseEntry(userEntry));
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
        case 'string':
          {
            {
              if (input.length === 0) {
                throw new WorkboxError_mjs.WorkboxError('add-to-cache-list-unexpected-type', {
                  entry: input
                });
              }
            }

            return new PrecacheEntry(input, input, input);
          }
        case 'object':
          {
            {
              if (!input || !input.url) {
                throw new WorkboxError_mjs.WorkboxError('add-to-cache-list-unexpected-type', {
                  entry: input
                });
              }
            }

            return new PrecacheEntry(input, input.url, input.revision || input.url, !!input.revision);
          }
        default:
          throw new WorkboxError_mjs.WorkboxError('add-to-cache-list-unexpected-type', {
            entry: input
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
        throw new WorkboxError_mjs.WorkboxError('add-to-cache-list-conflicting-entries', {
          firstEntry: existingEntry._originalInput,
          secondEntry: entryToAdd._originalInput
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
    install({ suppressWarnings = false, event, plugins } = {}) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          if (suppressWarnings !== true) {
            showWarningsIfNeeded(_this._entriesToCacheMap);
          }

          if (plugins) {
            assert_mjs.assert.isArray(plugins, {
              moduleName: 'workbox-precaching',
              className: 'PrecacheController',
              funcName: 'install',
              paramName: 'plugins'
            });
          }
        }

        // Empty the temporary cache.
        // NOTE: We remove all entries instead of deleting the cache as the cache
        // may be marked for deletion but still exist until a later stage
        // resulting in unexpected behavior of being deletect when all references
        // are dropped.
        // https://github.com/GoogleChrome/workbox/issues/1368
        const tempCache = yield caches.open(_this._getTempCacheName());
        const requests = yield tempCache.keys();
        yield Promise.all(requests.map(function (request) {
          return tempCache.delete(request);
        }));

        const entriesToPrecache = [];
        const entriesAlreadyPrecached = [];

        for (const precacheEntry of _this._entriesToCacheMap.values()) {
          if (yield _this._precacheDetailsModel._isEntryCached(_this._cacheName, precacheEntry)) {
            entriesAlreadyPrecached.push(precacheEntry);
          } else {
            entriesToPrecache.push(precacheEntry);
          }
        }

        // Wait for all requests to be cached.
        yield Promise.all(entriesToPrecache.map(function (precacheEntry) {
          return _this._cacheEntryInTemp({ event, plugins, precacheEntry });
        }));

        {
          printInstallDetails(entriesToPrecache, entriesAlreadyPrecached);
        }

        return {
          updatedEntries: entriesToPrecache,
          notUpdatedEntries: entriesAlreadyPrecached
        };
      })();
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
    activate(options = {}) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const tempCache = yield caches.open(_this2._getTempCacheName());

        const requests = yield tempCache.keys();
        // Process each request/response one at a time, deleting the temporary entry
        // when done, to help avoid triggering quota errors.
        for (const request of requests) {
          const response = yield tempCache.match(request);
          yield cacheWrapper_mjs.cacheWrapper.put({
            cacheName: _this2._cacheName,
            request,
            response,
            plugins: options.plugins
          });
          yield tempCache.delete(request);
        }

        return _this2._cleanup();
      })();
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
    _cacheEntryInTemp({ precacheEntry, event, plugins }) {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        let response = yield fetchWrapper_mjs.fetchWrapper.fetch({
          request: precacheEntry._networkRequest,
          event,
          fetchOptions: null,
          plugins
        });

        if (response.redirected) {
          response = yield cleanRedirect(response);
        }

        yield cacheWrapper_mjs.cacheWrapper.put({
          cacheName: _this3._getTempCacheName(),
          request: precacheEntry._cacheRequest,
          response,
          event,
          plugins
        });

        yield _this3._precacheDetailsModel._addEntry(precacheEntry);

        return true;
      })();
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
    _cleanup() {
      var _this4 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const expectedCacheUrls = [];
        _this4._entriesToCacheMap.forEach(function (entry) {
          const fullUrl = new URL(entry._cacheRequest.url, location).toString();
          expectedCacheUrls.push(fullUrl);
        });

        const [deletedCacheRequests, deletedRevisionDetails] = yield Promise.all([_this4._cleanupCache(expectedCacheUrls), _this4._cleanupDetailsModel(expectedCacheUrls)]);

        {
          printCleanupDetails(deletedCacheRequests, deletedRevisionDetails);
        }

        return {
          deletedCacheRequests,
          deletedRevisionDetails
        };
      })();
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
    _cleanupCache(expectedCacheUrls) {
      var _this5 = this;

      return babelHelpers.asyncToGenerator(function* () {
        if (!(yield caches.has(_this5._cacheName))) {
          // Cache doesn't exist, so nothing to delete
          return [];
        }

        const cache = yield caches.open(_this5._cacheName);
        const cachedRequests = yield cache.keys();
        const cachedRequestsToDelete = cachedRequests.filter(function (cachedRequest) {
          return !expectedCacheUrls.includes(new URL(cachedRequest.url, location).toString());
        });

        yield Promise.all(cachedRequestsToDelete.map(function (cacheUrl) {
          return cache.delete(cacheUrl);
        }));

        return cachedRequestsToDelete.map(function (request) {
          return request.url;
        });
      })();
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
    _cleanupDetailsModel(expectedCacheUrls) {
      var _this6 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const revisionedEntries = yield _this6._precacheDetailsModel._getAllEntries();
        const detailsToDelete = revisionedEntries.filter(function (entry) {
          const fullUrl = new URL(entry.value.url, location).toString();
          return !expectedCacheUrls.includes(fullUrl);
        });

        yield Promise.all(detailsToDelete.map(function (entry) {
          return _this6._precacheDetailsModel._deleteEntry(entry.primaryKey);
        }));
        return detailsToDelete.map(function (entry) {
          return entry.value.url;
        });
      })();
    }

    /**
     * Returns an array of fully qualified URL's that will be precached.
     *
     * @return {Array<string>} An array of URLs.
     */
    getCachedUrls() {
      return Array.from(this._entriesToCacheMap.keys()).map(url => new URL(url, location).href);
    }
  }

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

  var publicAPI = /*#__PURE__*/Object.freeze({
    PrecacheController: PrecacheController
  });

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

  {
    assert_mjs.assert.isSwEnv('workbox-precaching');
  }

  let installActivateListenersAdded = false;
  let fetchListenersAdded = false;
  let suppressWarnings = false;
  let plugins = [];

  const cacheName = cacheNames_mjs.cacheNames.getPrecacheName();
  const precacheController = new PrecacheController(cacheName);

  const _removeIgnoreUrlParams = (origUrlObject, ignoreUrlParametersMatching) => {
    // Exclude initial '?'
    const searchString = origUrlObject.search.slice(1);

    // Split into an array of 'key=value' strings
    const keyValueStrings = searchString.split('&');
    const keyValuePairs = keyValueStrings.map(keyValueString => {
      // Split each 'key=value' string into a [key, value] array
      return keyValueString.split('=');
    });
    const filteredKeyValuesPairs = keyValuePairs.filter(keyValuePair => {
      return ignoreUrlParametersMatching.every(ignoredRegex => {
        // Return true iff the key doesn't match any of the regexes.
        return !ignoredRegex.test(keyValuePair[0]);
      });
    });
    const filteredStrings = filteredKeyValuesPairs.map(keyValuePair => {
      // Join each [key, value] array into a 'key=value' string
      return keyValuePair.join('=');
    });

    // Join the array of 'key=value' strings into a string with '&' in
    // between each
    const urlClone = new URL(origUrlObject);
    urlClone.search = filteredStrings.join('&');
    return urlClone;
  };

  /**
   * This function will take the request URL and manipulate it based on the
   * configuration options.
   *
   * @param {string} url
   * @param {Object} options
   * @return {string|null} Returns the URL in the cache that matches the request
   * if available, other null.
   *
   * @private
   */
  const _getPrecachedUrl = (url, {
    ignoreUrlParametersMatching = [/^utm_/],
    directoryIndex = 'index.html',
    cleanUrls = true,
    urlManipulation = null
  } = {}) => {
    const urlObject = new URL(url, location);

    // Change '/some-url#123' => '/some-url'
    urlObject.hash = '';

    const urlWithoutIgnoredParams = _removeIgnoreUrlParams(urlObject, ignoreUrlParametersMatching);

    let urlsToAttempt = [
    // Test the URL that was fetched
    urlObject,
    // Test the URL without search params
    urlWithoutIgnoredParams];

    // Test the URL with a directory index
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
      const directoryUrl = new URL(urlWithoutIgnoredParams);
      directoryUrl.pathname += directoryIndex;
      urlsToAttempt.push(directoryUrl);
    }

    // Test the URL with a '.html' extension
    if (cleanUrls) {
      const cleanUrl = new URL(urlWithoutIgnoredParams);
      cleanUrl.pathname += '.html';
      urlsToAttempt.push(cleanUrl);
    }

    if (urlManipulation) {
      const additionalUrls = urlManipulation({ url: urlObject });
      urlsToAttempt = urlsToAttempt.concat(additionalUrls);
    }

    const cachedUrls = precacheController.getCachedUrls();
    for (const possibleUrl of urlsToAttempt) {
      if (cachedUrls.indexOf(possibleUrl.href) !== -1) {
        // It's a perfect match
        {
          logger_mjs.logger.debug(`Precaching found a match for ` + getFriendlyURL_mjs.getFriendlyURL(possibleUrl.toString()));
        }
        return possibleUrl.href;
      }
    }

    return null;
  };

  const moduleExports = {};

  /**
   * Add items to the precache list, removing any duplicates and
   * store the files in the
   * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * Please note: This method **will not** serve any of the cached files for you,
   * it only precaches files. To respond to a network request you call
   * [addRoute()]{@link module:workbox-precaching.addRoute}.
   *
   * If you have a single array of files to precache, you can just call
   * [precacheAndRoute()]{@link module:workbox-precaching.precacheAndRoute}.
   *
   * @param {Array<Object|string>} entries Array of entries to precache.
   *
   * @alias workbox.precaching.precache
   */
  moduleExports.precache = entries => {
    precacheController.addToCacheList(entries);

    if (installActivateListenersAdded || entries.length <= 0) {
      return;
    }

    installActivateListenersAdded = true;
    self.addEventListener('install', event => {
      event.waitUntil(precacheController.install({
        event,
        plugins,
        suppressWarnings
      }));
    });
    self.addEventListener('activate', event => {
      event.waitUntil(precacheController.activate({
        event,
        plugins
      }));
    });
  };

  /**
   * Add a `fetch` listener to the service worker that will
   * respond to
   * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
   * with precached assets.
   *
   * Requests for assets that aren't precached, the `FetchEvent` will not be
   * responded to, allowing the event to fall through to other `fetch` event
   * listeners.
   *
   * @param {Object} options
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreUrlParametersMatching=[/^utm_/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanUrls=true] The `cleanUrls` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox.precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URL's that should be checked for precache matches.
   *
   * @alias workbox.precaching.addRoute
   */
  moduleExports.addRoute = options => {
    if (fetchListenersAdded) {
      // TODO: Throw error here.
      return;
    }

    fetchListenersAdded = true;
    self.addEventListener('fetch', event => {
      const precachedUrl = _getPrecachedUrl(event.request.url, options);
      if (!precachedUrl) {
        {
          logger_mjs.logger.debug(`Precaching found no match for ` + getFriendlyURL_mjs.getFriendlyURL(event.request.url));
        }
        return;
      }

      let responsePromise = caches.open(cacheName).then(cache => {
        return cache.match(precachedUrl);
      }).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fall back to the network if we don't have a cached response (perhaps
        // due to manual cache cleanup).
        {
          logger_mjs.logger.debug(`The precached response for ` + `${getFriendlyURL_mjs.getFriendlyURL(precachedUrl)} in ${cacheName} was not found. ` + `Falling back to the network instead.`);
        }

        return fetch(precachedUrl);
      });

      {
        responsePromise = responsePromise.then(response => {
          // Workbox is going to handle the route.
          // print the routing details to the console.
          logger_mjs.logger.groupCollapsed(`Precaching is responding to: ` + getFriendlyURL_mjs.getFriendlyURL(event.request.url));
          logger_mjs.logger.log(`Serving the precached url: ${precachedUrl}`);

          // The Request and Response objects contains a great deal of
          // information, hide it under a group in case developers want to see it.
          logger_mjs.logger.groupCollapsed(`View request details here.`);
          logger_mjs.logger.unprefixed.log(event.request);
          logger_mjs.logger.groupEnd();

          logger_mjs.logger.groupCollapsed(`View response details here.`);
          logger_mjs.logger.unprefixed.log(response);
          logger_mjs.logger.groupEnd();

          logger_mjs.logger.groupEnd();
          return response;
        });
      }
      event.respondWith(responsePromise);
    });
  };

  /**
   * This method will add entries to the precache list and add a route to
   * respond to fetch events.
   *
   * This is a convenience method that will call
   * [precache()]{@link module:workbox-precaching.precache} and
   * [addRoute()]{@link module:workbox-precaching.addRoute} in a single call.
   *
   * @param {Array<Object|string>} entries Array of entries to precache.
   * @param {Object} options See
   * [addRoute() options]{@link module:workbox-precaching.addRoute}.
   *
   * @alias workbox.precaching.precacheAndRoute
   */
  moduleExports.precacheAndRoute = (entries, options) => {
    moduleExports.precache(entries);
    moduleExports.addRoute(options);
  };

  /**
   * Warnings will be logged if any of the precached assets are entered without
   * a `revision` property. This is extremely dangerous if the URL's aren't
   * revisioned. However, the warnings can be supressed with this method.
   *
   * @param {boolean} suppress
   *
   * @alias workbox.precaching.suppressWarnings
   */
  moduleExports.suppressWarnings = suppress => {
    suppressWarnings = suppress;
  };

  /**
   * Add plugins to precaching.
   *
   * @param {Array<Object>} newPlugins
   *
   * @alias workbox.precaching.addPlugins
   */
  moduleExports.addPlugins = newPlugins => {
    plugins = plugins.concat(newPlugins);
  };

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

  const finalExport = Object.assign(moduleExports, publicAPI);

  return finalExport;

}(workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private));

//# sourceMappingURL=workbox-precaching.dev.js.map
