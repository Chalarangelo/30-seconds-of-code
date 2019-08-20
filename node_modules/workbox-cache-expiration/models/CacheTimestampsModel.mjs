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

    this._db = new DBWrapper(this._cacheName, 2, {
      onupgradeneeded: (evt) => this._handleUpgrade(evt),
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

    db
    .createObjectStore(this._storeName, {keyPath: URL_KEY})
    .createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY, {unique: false});
  }

  /**
   * @param {string} url
   * @param {number} timestamp
   *
   * @private
   */
  async setTimestamp(url, timestamp) {
    await this._db.put(this._storeName, {
      [URL_KEY]: new URL(url, location).href,
      [TIMESTAMP_KEY]: timestamp,
    });
  }

  /**
   * Get all of the timestamps in the indexedDB.
   *
   * @return {Array<Objects>}
   *
   * @private
   */
  async getAllTimestamps() {
    return await this._db.getAllMatching(this._storeName, {
      index: TIMESTAMP_KEY,
    });
  }

  /**
   * Returns the timestamp stored for a given URL.
   *
   * @param {string} url
   * @return {number}
   *
   * @private
   */
  async getTimestamp(url) {
    const timestampObject = await this._db.get(this._storeName, url);
    return timestampObject.timestamp;
  }

  /**
   * @param {string} url
   *
   * @private
   */
  async deleteUrl(url) {
    await this._db.delete(this._storeName, new URL(url, location).href);
  }

  /**
   * Removes the underlying IndexedDB object store entirely.
   */
  async delete() {
    await this._db.deleteDatabase();
    this._db = null;
  }
}

export default CacheTimestampsModel;
