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

import {DBWrapper} from 'workbox-core/_private/DBWrapper.mjs';
import '../_version.mjs';

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
    this._db = new DBWrapper(filteredDBName, 2, {
      onupgradeneeded: this._handleUpgrade,
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
  async _isEntryCached(cacheName, precacheEntry) {
    const revisionDetails = await this._getRevision(precacheEntry._entryId);
    if (revisionDetails !== precacheEntry._revision) {
      return false;
    }

    const openCache = await caches.open(cacheName);
    const cachedResponse = await openCache.match(precacheEntry._cacheRequest);
    return !!cachedResponse;
  }

  /**
   * @return {Promise<Array>}
   *
   * @private
   */
  async _getAllEntries() {
    return await this._db.getAllMatching(DB_STORE_NAME, {
      includeKeys: true,
    });
  }

  /**
   * Get the current revision details.
   *
   * @param {Object} entryId
   * @return {Promise<string|null>}
   *
   * @private
   */
  async _getRevision(entryId) {
    const data = await this._db.get(DB_STORE_NAME, entryId);
    return data ? data[REVISON_IDB_FIELD] : null;
  }

  /**
   * Add an entry to the details model.
   *
   * @param {PrecacheEntry} precacheEntry
   *
   * @private
   */
  async _addEntry(precacheEntry) {
    await this._db.put(
      DB_STORE_NAME,
      {
        [REVISON_IDB_FIELD]: precacheEntry._revision,
        [URL_IDB_FIELD]: precacheEntry._cacheRequest.url,
      },
      precacheEntry._entryId
    );
  }

  /**
   * Delete entry from details model.
   *
   * @param {string} entryId
   *
   * @private
   */
  async _deleteEntry(entryId) {
    await this._db.delete(DB_STORE_NAME, entryId);
  }
}

export default PrecachedDetailsModel;
