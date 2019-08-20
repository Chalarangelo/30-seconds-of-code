this.workbox = this.workbox || {};
this.workbox.expiration = (function (exports,DBWrapper_mjs,WorkboxError_mjs,assert_mjs,logger_mjs,cacheNames_mjs,index_mjs) {
  'use strict';

  try {
    self.workbox.v['workbox:cache-expiration:3.6.3'] = 1;
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

  const URL_KEY = 'url';
  const TIMESTAMP_KEY = 'timestamp';

  /**
   * Returns the timestamp model.
   *
   * @private
   */
  class CacheTimestampsModel {
    /**
     *
     * @param {string} cacheName
     *
     * @private
     */
    constructor(cacheName) {
      // TODO Check cacheName

      this._cacheName = cacheName;
      this._storeName = cacheName;

      this._db = new DBWrapper_mjs.DBWrapper(this._cacheName, 2, {
        onupgradeneeded: evt => this._handleUpgrade(evt)
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
        // Remove old databases.
        if (db.objectStoreNames.contains('workbox-cache-expiration')) {
          db.deleteObjectStore('workbox-cache-expiration');
        }
      }

      db.createObjectStore(this._storeName, { keyPath: URL_KEY }).createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY, { unique: false });
    }

    /**
     * @param {string} url
     * @param {number} timestamp
     *
     * @private
     */
    setTimestamp(url, timestamp) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        yield _this._db.put(_this._storeName, {
          [URL_KEY]: new URL(url, location).href,
          [TIMESTAMP_KEY]: timestamp
        });
      })();
    }

    /**
     * Get all of the timestamps in the indexedDB.
     *
     * @return {Array<Objects>}
     *
     * @private
     */
    getAllTimestamps() {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        return yield _this2._db.getAllMatching(_this2._storeName, {
          index: TIMESTAMP_KEY
        });
      })();
    }

    /**
     * Returns the timestamp stored for a given URL.
     *
     * @param {string} url
     * @return {number}
     *
     * @private
     */
    getTimestamp(url) {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const timestampObject = yield _this3._db.get(_this3._storeName, url);
        return timestampObject.timestamp;
      })();
    }

    /**
     * @param {string} url
     *
     * @private
     */
    deleteUrl(url) {
      var _this4 = this;

      return babelHelpers.asyncToGenerator(function* () {
        yield _this4._db.delete(_this4._storeName, new URL(url, location).href);
      })();
    }

    /**
     * Removes the underlying IndexedDB object store entirely.
     */
    delete() {
      var _this5 = this;

      return babelHelpers.asyncToGenerator(function* () {
        yield _this5._db.deleteDatabase();
        _this5._db = null;
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
   * The `CacheExpiration` class allows you define an expiration and / or
   * limit on the number of responses stored in a
   * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
   *
   * @memberof workbox.expiration
   */
  class CacheExpiration {
    /**
     * To construct a new CacheExpiration instance you must provide at least
     * one of the `config` properties.
     *
     * @param {string} cacheName Name of the cache to apply restrictions to.
     * @param {Object} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     */
    constructor(cacheName, config = {}) {
      {
        assert_mjs.assert.isType(cacheName, 'string', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'cacheName'
        });

        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError_mjs.WorkboxError('max-entries-or-age-required', {
            moduleName: 'workbox-cache-expiration',
            className: 'CacheExpiration',
            funcName: 'constructor'
          });
        }

        if (config.maxEntries) {
          assert_mjs.assert.isType(config.maxEntries, 'number', {
            moduleName: 'workbox-cache-expiration',
            className: 'CacheExpiration',
            funcName: 'constructor',
            paramName: 'config.maxEntries'
          });

          // TODO: Assert is positive
        }

        if (config.maxAgeSeconds) {
          assert_mjs.assert.isType(config.maxAgeSeconds, 'number', {
            moduleName: 'workbox-cache-expiration',
            className: 'CacheExpiration',
            funcName: 'constructor',
            paramName: 'config.maxAgeSeconds'
          });

          // TODO: Assert is positive
        }
      }

      this._isRunning = false;
      this._rerunRequested = false;
      this._maxEntries = config.maxEntries;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._cacheName = cacheName;
      this._timestampModel = new CacheTimestampsModel(cacheName);
    }

    /**
     * Expires entries for the given cache and given criteria.
     */
    expireEntries() {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        if (_this._isRunning) {
          _this._rerunRequested = true;
          return;
        }
        _this._isRunning = true;

        const now = Date.now();

        // First, expire old entries, if maxAgeSeconds is set.
        const oldEntries = yield _this._findOldEntries(now);

        // Once that's done, check for the maximum size.
        const extraEntries = yield _this._findExtraEntries();

        // Use a Set to remove any duplicates following the concatenation, then
        // convert back into an array.
        const allUrls = [...new Set(oldEntries.concat(extraEntries))];

        yield Promise.all([_this._deleteFromCache(allUrls), _this._deleteFromIDB(allUrls)]);

        {
          // TODO: break apart entries deleted due to expiration vs size restraints
          if (allUrls.length > 0) {
            logger_mjs.logger.groupCollapsed(`Expired ${allUrls.length} ` + `${allUrls.length === 1 ? 'entry' : 'entries'} and removed ` + `${allUrls.length === 1 ? 'it' : 'them'} from the ` + `'${_this._cacheName}' cache.`);
            logger_mjs.logger.log(`Expired the following ${allUrls.length === 1 ? 'URL' : 'URLs'}:`);
            allUrls.forEach(function (url) {
              return logger_mjs.logger.log(`    ${url}`);
            });
            logger_mjs.logger.groupEnd();
          } else {
            logger_mjs.logger.debug(`Cache expiration ran and found no entries to remove.`);
          }
        }

        _this._isRunning = false;
        if (_this._rerunRequested) {
          _this._rerunRequested = false;
          _this.expireEntries();
        }
      })();
    }

    /**
     * Expires entries based on the maximum age.
     *
     * @param {number} expireFromTimestamp A timestamp.
     * @return {Promise<Array<string>>} A list of the URLs that were expired.
     *
     * @private
     */
    _findOldEntries(expireFromTimestamp) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isType(expireFromTimestamp, 'number', {
            moduleName: 'workbox-cache-expiration',
            className: 'CacheExpiration',
            funcName: '_findOldEntries',
            paramName: 'expireFromTimestamp'
          });
        }

        if (!_this2._maxAgeSeconds) {
          return [];
        }

        const expireOlderThan = expireFromTimestamp - _this2._maxAgeSeconds * 1000;
        const timestamps = yield _this2._timestampModel.getAllTimestamps();
        const expiredUrls = [];
        timestamps.forEach(function (timestampDetails) {
          if (timestampDetails.timestamp < expireOlderThan) {
            expiredUrls.push(timestampDetails.url);
          }
        });

        return expiredUrls;
      })();
    }

    /**
     * @return {Promise<Array>}
     *
     * @private
     */
    _findExtraEntries() {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const extraUrls = [];

        if (!_this3._maxEntries) {
          return [];
        }

        const timestamps = yield _this3._timestampModel.getAllTimestamps();
        while (timestamps.length > _this3._maxEntries) {
          const lastUsed = timestamps.shift();
          extraUrls.push(lastUsed.url);
        }

        return extraUrls;
      })();
    }

    /**
     * @param {Array<string>} urls Array of URLs to delete from cache.
     *
     * @private
     */
    _deleteFromCache(urls) {
      var _this4 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const cache = yield caches.open(_this4._cacheName);
        for (const url of urls) {
          yield cache.delete(url);
        }
      })();
    }

    /**
     * @param {Array<string>} urls Array of URLs to delete from IDB
     *
     * @private
     */
    _deleteFromIDB(urls) {
      var _this5 = this;

      return babelHelpers.asyncToGenerator(function* () {
        for (const url of urls) {
          yield _this5._timestampModel.deleteUrl(url);
        }
      })();
    }

    /**
     * Update the timestamp for the given URL. This ensures the when
     * removing entries based on maximum entries, most recently used
     * is accurate or when expiring, the timestamp is up-to-date.
     *
     * @param {string} url
     */
    updateTimestamp(url) {
      var _this6 = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isType(url, 'string', {
            moduleName: 'workbox-cache-expiration',
            className: 'CacheExpiration',
            funcName: 'updateTimestamp',
            paramName: 'url'
          });
        }

        const urlObject = new URL(url, location);
        urlObject.hash = '';

        yield _this6._timestampModel.setTimestamp(urlObject.href, Date.now());
      })();
    }

    /**
     * Can be used to check if a URL has expired or not before it's used.
     *
     * This requires a look up from IndexedDB, so can be slow.
     *
     * Note: This method will not remove the cached entry, call
     * `expireEntries()` to remove indexedDB and Cache entries.
     *
     * @param {string} url
     * @return {boolean}
     */
    isURLExpired(url) {
      var _this7 = this;

      return babelHelpers.asyncToGenerator(function* () {
        if (!_this7._maxAgeSeconds) {
          throw new WorkboxError_mjs.WorkboxError(`expired-test-without-max-age`, {
            methodName: 'isURLExpired',
            paramName: 'maxAgeSeconds'
          });
        }
        const urlObject = new URL(url, location);
        urlObject.hash = '';

        const timestamp = yield _this7._timestampModel.getTimestamp(urlObject.href);
        const expireOlderThan = Date.now() - _this7._maxAgeSeconds * 1000;
        return timestamp < expireOlderThan;
      })();
    }

    /**
     * Removes the IndexedDB object store used to keep track of cache expiration
     * metadata.
     */
    delete() {
      var _this8 = this;

      return babelHelpers.asyncToGenerator(function* () {
        // Make sure we don't attempt another rerun if we're called in the middle of
        // a cache expiration.
        _this8._rerunRequested = false;
        yield _this8._timestampModel.delete();
      })();
    }
  }

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

  /**
   * This plugin can be used in the Workbox APIs to regularly enforce a
   * limit on the age and / or the number of cached requests.
   *
   * Whenever a cached request is used or updated, this plugin will look
   * at the used Cache and remove any old or extra requests.
   *
   * When using `maxAgeSeconds`, requests may be used *once* after expiring
   * because the expiration clean up will not have occurred until *after* the
   * cached request has been used. If the request has a "Date" header, then
   * a light weight expiration check is performed and the request will not be
   * used immediately.
   *
   * When using `maxEntries`, the last request to be used will be the request
   * that is removed from the Cache.
   *
   * @memberof workbox.expiration
   */
  class Plugin {
    /**
     * @param {Object} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
     * automatic deletion if the available storage quota has been exceeded.
     */
    constructor(config = {}) {
      {
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError_mjs.WorkboxError('max-entries-or-age-required', {
            moduleName: 'workbox-cache-expiration',
            className: 'Plugin',
            funcName: 'constructor'
          });
        }

        if (config.maxEntries) {
          assert_mjs.assert.isType(config.maxEntries, 'number', {
            moduleName: 'workbox-cache-expiration',
            className: 'Plugin',
            funcName: 'constructor',
            paramName: 'config.maxEntries'
          });
        }

        if (config.maxAgeSeconds) {
          assert_mjs.assert.isType(config.maxAgeSeconds, 'number', {
            moduleName: 'workbox-cache-expiration',
            className: 'Plugin',
            funcName: 'constructor',
            paramName: 'config.maxAgeSeconds'
          });
        }
      }

      this._config = config;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._cacheExpirations = new Map();

      if (config.purgeOnQuotaError) {
        index_mjs.registerQuotaErrorCallback(() => this.deleteCacheAndMetadata());
      }
    }

    /**
     * A simple helper method to return a CacheExpiration instance for a given
     * cache name.
     *
     * @param {string} cacheName
     * @return {CacheExpiration}
     *
     * @private
     */
    _getCacheExpiration(cacheName) {
      if (cacheName === cacheNames_mjs.cacheNames.getRuntimeName()) {
        throw new WorkboxError_mjs.WorkboxError('expire-custom-caches-only');
      }

      let cacheExpiration = this._cacheExpirations.get(cacheName);
      if (!cacheExpiration) {
        cacheExpiration = new CacheExpiration(cacheName, this._config);
        this._cacheExpirations.set(cacheName, cacheExpiration);
      }
      return cacheExpiration;
    }

    /**
     * A "lifecycle" callback that will be triggered automatically by the
     * `workbox.runtimeCaching` handlers when a `Response` is about to be returned
     * from a [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to
     * the handler. It allows the `Response` to be inspected for freshness and
     * prevents it from being used if the `Response`'s `Date` header value is
     * older than the configured `maxAgeSeconds`.
     *
     * @param {Object} options
     * @param {string} options.cacheName Name of the cache the response is in.
     * @param {Response} options.cachedResponse The `Response` object that's been
     *     read from a cache and whose freshness should be checked.
     * @return {Response} Either the `cachedResponse`, if it's
     *     fresh, or `null` if the `Response` is older than `maxAgeSeconds`.
     *
     * @private
     */
    cachedResponseWillBeUsed({ cacheName, cachedResponse }) {
      if (!cachedResponse) {
        return null;
      }

      let isFresh = this._isResponseDateFresh(cachedResponse);

      // Expire entries to ensure that even if the expiration date has
      // expired, it'll only be used once.
      const cacheExpiration = this._getCacheExpiration(cacheName);
      cacheExpiration.expireEntries();

      return isFresh ? cachedResponse : null;
    }

    /**
     * @param {Response} cachedResponse
     * @return {boolean}
     *
     * @private
     */
    _isResponseDateFresh(cachedResponse) {
      if (!this._maxAgeSeconds) {
        // We aren't expiring by age, so return true, it's fresh
        return true;
      }

      // Check if the 'date' header will suffice a quick expiration check.
      // See https://github.com/GoogleChromeLabs/sw-toolbox/issues/164 for
      // discussion.
      const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);
      if (dateHeaderTimestamp === null) {
        // Unable to parse date, so assume it's fresh.
        return true;
      }

      // If we have a valid headerTime, then our response is fresh iff the
      // headerTime plus maxAgeSeconds is greater than the current time.
      const now = Date.now();
      return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1000;
    }

    /**
     * This method will extract the data header and parse it into a useful
     * value.
     *
     * @param {Response} cachedResponse
     * @return {number}
     *
     * @private
     */
    _getDateHeaderTimestamp(cachedResponse) {
      if (!cachedResponse.headers.has('date')) {
        return null;
      }

      const dateHeader = cachedResponse.headers.get('date');
      const parsedDate = new Date(dateHeader);
      const headerTime = parsedDate.getTime();

      // If the Date header was invalid for some reason, parsedDate.getTime()
      // will return NaN.
      if (isNaN(headerTime)) {
        return null;
      }

      return headerTime;
    }

    /**
     * A "lifecycle" callback that will be triggered automatically by the
     * `workbox.runtimeCaching` handlers when an entry is added to a cache.
     *
     * @param {Object} options
     * @param {string} options.cacheName Name of the cache that was updated.
     * @param {string} options.request The Request for the cached entry.
     *
     * @private
     */
    cacheDidUpdate({ cacheName, request }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isType(cacheName, 'string', {
            moduleName: 'workbox-cache-expiration',
            className: 'Plugin',
            funcName: 'cacheDidUpdate',
            paramName: 'cacheName'
          });
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-cache-expiration',
            className: 'Plugin',
            funcName: 'cacheDidUpdate',
            paramName: 'request'
          });
        }

        const cacheExpiration = _this._getCacheExpiration(cacheName);
        yield cacheExpiration.updateTimestamp(request.url);
        yield cacheExpiration.expireEntries();
      })();
    }

    /**
     * This is a helper method that performs two operations:
     *
     * - Deletes *all* the underlying Cache instances associated with this plugin
     * instance, by calling caches.delete() on you behalf.
     * - Deletes the metadata from IndexedDB used to keep track of expiration
     * details for each Cache instance.
     *
     * When using cache expiration, calling this method is preferable to calling
     * `caches.delete()` directly, since this will ensure that the IndexedDB
     * metadata is also cleanly removed and open IndexedDB instances are deleted.
     *
     * Note that if you're *not* using cache expiration for a given cache, calling
     * `caches.delete()` and passing in the cache's name should be sufficient.
     * There is no Workbox-specific method needed for cleanup in that case.
     */
    deleteCacheAndMetadata() {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        // Do this one at a time instead of all at once via `Promise.all()` to
        // reduce the chance of inconsistency if a promise rejects.
        for (const [cacheName, cacheExpiration] of _this2._cacheExpirations) {
          yield caches.delete(cacheName);
          yield cacheExpiration.delete();
        }

        // Reset this._cacheExpirations to its initial state.
        _this2._cacheExpirations = new Map();
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

  exports.CacheExpiration = CacheExpiration;
  exports.Plugin = Plugin;

  return exports;

}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core));

//# sourceMappingURL=workbox-cache-expiration.dev.js.map
