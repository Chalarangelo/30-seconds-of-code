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

import CacheTimestampsModel from './models/CacheTimestampsModel.mjs';
import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';

import './_version.mjs';

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
    if (process.env.NODE_ENV !== 'production') {
      assert.isType(cacheName, 'string', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: 'constructor',
        paramName: 'cacheName',
      });

      if (!(config.maxEntries || config.maxAgeSeconds)) {
        throw new WorkboxError('max-entries-or-age-required', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
        });
      }

      if (config.maxEntries) {
        assert.isType(config.maxEntries, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxEntries',
        });

        // TODO: Assert is positive
      }

      if (config.maxAgeSeconds) {
        assert.isType(config.maxAgeSeconds, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxAgeSeconds',
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
  async expireEntries() {
    if (this._isRunning) {
      this._rerunRequested = true;
      return;
    }
    this._isRunning = true;

    const now = Date.now();

    // First, expire old entries, if maxAgeSeconds is set.
    const oldEntries = await this._findOldEntries(now);

    // Once that's done, check for the maximum size.
    const extraEntries = await this._findExtraEntries();

    // Use a Set to remove any duplicates following the concatenation, then
    // convert back into an array.
    const allUrls = [...new Set(oldEntries.concat(extraEntries))];

    await Promise.all([
      this._deleteFromCache(allUrls),
      this._deleteFromIDB(allUrls),
    ]);

    if (process.env.NODE_ENV !== 'production') {
      // TODO: break apart entries deleted due to expiration vs size restraints
      if (allUrls.length > 0) {
        logger.groupCollapsed(
          `Expired ${allUrls.length} ` +
          `${allUrls.length === 1 ? 'entry' : 'entries'} and removed ` +
          `${allUrls.length === 1 ? 'it' : 'them'} from the ` +
          `'${this._cacheName}' cache.`);
        logger.log(
          `Expired the following ${allUrls.length === 1 ? 'URL' : 'URLs'}:`);
        allUrls.forEach((url) => logger.log(`    ${url}`));
        logger.groupEnd();
      } else {
        logger.debug(`Cache expiration ran and found no entries to remove.`);
      }
    }

    this._isRunning = false;
    if (this._rerunRequested) {
      this._rerunRequested = false;
      this.expireEntries();
    }
  }

  /**
   * Expires entries based on the maximum age.
   *
   * @param {number} expireFromTimestamp A timestamp.
   * @return {Promise<Array<string>>} A list of the URLs that were expired.
   *
   * @private
   */
  async _findOldEntries(expireFromTimestamp) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isType(expireFromTimestamp, 'number', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: '_findOldEntries',
        paramName: 'expireFromTimestamp',
      });
    }

    if (!this._maxAgeSeconds) {
      return [];
    }

    const expireOlderThan = expireFromTimestamp - (this._maxAgeSeconds * 1000);
    const timestamps = await this._timestampModel.getAllTimestamps();
    const expiredUrls = [];
    timestamps.forEach((timestampDetails) => {
      if (timestampDetails.timestamp < expireOlderThan) {
        expiredUrls.push(timestampDetails.url);
      }
    });

    return expiredUrls;
  }

  /**
   * @return {Promise<Array>}
   *
   * @private
   */
  async _findExtraEntries() {
    const extraUrls = [];

    if (!this._maxEntries) {
      return [];
    }

    const timestamps = await this._timestampModel.getAllTimestamps();
    while (timestamps.length > this._maxEntries) {
      const lastUsed = timestamps.shift();
      extraUrls.push(lastUsed.url);
    }

    return extraUrls;
  }

  /**
   * @param {Array<string>} urls Array of URLs to delete from cache.
   *
   * @private
   */
  async _deleteFromCache(urls) {
    const cache = await caches.open(this._cacheName);
    for (const url of urls) {
      await cache.delete(url);
    }
  }

  /**
   * @param {Array<string>} urls Array of URLs to delete from IDB
   *
   * @private
   */
  async _deleteFromIDB(urls) {
    for (const url of urls) {
      await this._timestampModel.deleteUrl(url);
    }
  }

  /**
   * Update the timestamp for the given URL. This ensures the when
   * removing entries based on maximum entries, most recently used
   * is accurate or when expiring, the timestamp is up-to-date.
   *
   * @param {string} url
   */
  async updateTimestamp(url) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isType(url, 'string', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: 'updateTimestamp',
        paramName: 'url',
      });
    }

    const urlObject = new URL(url, location);
    urlObject.hash = '';

    await this._timestampModel.setTimestamp(urlObject.href, Date.now());
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
  async isURLExpired(url) {
    if (!this._maxAgeSeconds) {
      throw new WorkboxError(`expired-test-without-max-age`, {
        methodName: 'isURLExpired',
        paramName: 'maxAgeSeconds',
      });
    }
    const urlObject = new URL(url, location);
    urlObject.hash = '';

    const timestamp = await this._timestampModel.getTimestamp(urlObject.href);
    const expireOlderThan = Date.now() - (this._maxAgeSeconds * 1000);
    return (timestamp < expireOlderThan);
  }

  /**
   * Removes the IndexedDB object store used to keep track of cache expiration
   * metadata.
   */
  async delete() {
    // Make sure we don't attempt another rerun if we're called in the middle of
    // a cache expiration.
    this._rerunRequested = false;
    await this._timestampModel.delete();
  }
}

export {CacheExpiration};
