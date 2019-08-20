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
 * A class that wraps common IndexedDB functionality in a promise-based API.
 * It exposes all the underlying power and functionality of IndexedDB, but
 * wraps the most commonly used features in a way that's much simpler to use.
 *
 * @private
 */
class DBWrapper {
  /**
   * @param {string} name
   * @param {number} version
   * @param {Object=} [callback]
   * @param {function(this:DBWrapper, Event)} [callbacks.onupgradeneeded]
   * @param {function(this:DBWrapper, Event)} [callbacks.onversionchange]
   *     Defaults to DBWrapper.prototype._onversionchange when not specified.
   */
  constructor(name, version, {
    onupgradeneeded,
    onversionchange = this._onversionchange,
  } = {}) {
    this._name = name;
    this._version = version;
    this._onupgradeneeded = onupgradeneeded;
    this._onversionchange = onversionchange;

    // If this is null, it means the database isn't open.
    this._db = null;
  }

  /**
   * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
   * callback, and added an onversionchange callback to the database.
   *
   * @return {IDBDatabase}
   *
   * @private
   */
  async open() {
    if (this._db) return;

    this._db = await new Promise((resolve, reject) => {
      // This flag is flipped to true if the timeout callback runs prior
      // to the request failing or succeeding. Note: we use a timeout instead
      // of an onblocked handler since there are cases where onblocked will
      // never never run. A timeout better handles all possible scenarios:
      // https://github.com/w3c/IndexedDB/issues/223
      let openRequestTimedOut = false;
      setTimeout(() => {
        openRequestTimedOut = true;
        reject(new Error('The open request was blocked and timed out'));
      }, this.OPEN_TIMEOUT);

      const openRequest = indexedDB.open(this._name, this._version);
      openRequest.onerror = (evt) => reject(openRequest.error);
      openRequest.onupgradeneeded = (evt) => {
        if (openRequestTimedOut) {
          openRequest.transaction.abort();
          evt.target.result.close();
        } else if (this._onupgradeneeded) {
          this._onupgradeneeded(evt);
        }
      };
      openRequest.onsuccess = (evt) => {
        const db = evt.target.result;
        if (openRequestTimedOut) {
          db.close();
        } else {
          db.onversionchange = this._onversionchange;
          resolve(db);
        }
      };
    });

    return this;
  }

  /**
   * Delegates to the native `get()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */
  async get(storeName, ...args) {
    return await this._call('get', storeName, 'readonly', ...args);
  }

  /**
   * Delegates to the native `add()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */
  async add(storeName, ...args) {
    return await this._call('add', storeName, 'readwrite', ...args);
  }

  /**
   * Delegates to the native `put()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */
  async put(storeName, ...args) {
    return await this._call('put', storeName, 'readwrite', ...args);
  }

  /**
   * Delegates to the native `delete()` method for the object store.
   *
   * @param {string} storeName
   * @param {...*} args The values passed to the delegated method.
   *
   * @private
   */
  async delete(storeName, ...args) {
    await this._call('delete', storeName, 'readwrite', ...args);
  }

  /**
   * Deletes the underlying database, ensuring that any open connections are
   * closed first.
   *
   * @private
   */
  async deleteDatabase() {
    this.close();
    this._db = null;
    await new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this._name);
      request.onerror = (evt) => reject(evt.target.error);
      request.onblocked = () => reject(new Error('Deletion was blocked.'));
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Delegates to the native `getAll()` or polyfills it via the `find()`
   * method in older browsers.
   *
   * @param {string} storeName
   * @param {*} query
   * @param {number} count
   * @return {Array}
   *
   * @private
   */
  async getAll(storeName, query, count) {
    if ('getAll' in IDBObjectStore.prototype) {
      return await this._call('getAll', storeName, 'readonly', query, count);
    } else {
      return await this.getAllMatching(storeName, {query, count});
    }
  }

  /**
   * Supports flexible lookup in an object store by specifying an index,
   * query, direction, and count. This method returns an array of objects
   * with the signature .
   *
   * @param {string} storeName
   * @param {Object} [opts]
   * @param {IDBCursorDirection} [opts.direction]
   * @param {*} [opts.query]
   * @param {string} [opts.index] The index to use (if specified).
   * @param {number} [opts.count] The max number of results to return.
   * @param {boolean} [opts.includeKeys] When true, the structure of the
   *     returned objects is changed from an array of values to an array of
   *     objects in the form {key, primaryKey, value}.
   * @return {Array}
   *
   * @private
   */
  async getAllMatching(storeName, opts = {}) {
    return await this.transaction([storeName], 'readonly', (stores, done) => {
      const store = stores[storeName];
      const target = opts.index ? store.index(opts.index) : store;
      const results = [];

      // Passing `undefined` arguments to Edge's `openCursor(...)` causes
      // 'DOMException: DataError'
      // Details in issue: https://github.com/GoogleChrome/workbox/issues/1509
      const query = opts.query || null;
      const direction = opts.direction || 'next';
      target.openCursor(query, direction).onsuccess = (evt) => {
        const cursor = evt.target.result;
        if (cursor) {
          const {primaryKey, key, value} = cursor;
          results.push(opts.includeKeys ? {primaryKey, key, value} : value);
          if (opts.count && results.length >= opts.count) {
            done(results);
          } else {
            cursor.continue();
          }
        } else {
          done(results);
        }
      };
    });
  }

  /**
   * Accepts a list of stores, a transaction type, and a callback and
   * performs a transaction. A promise is returned that resolves to whatever
   * value the callback chooses. The callback holds all the transaction logic
   * and is invoked with three arguments:
   *   1. An object mapping object store names to IDBObjectStore values.
   *   2. A `done` function, that's used to resolve the promise when
   *      when the transaction is done.
   *   3. An `abort` function that can be called to abort the transaction
   *      at any time.
   *
   * @param {Array<string>} storeNames An array of object store names
   *     involved in the transaction.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {function(Object, function(), function(*)):?IDBRequest} callback
   * @return {*} The result of the transaction ran by the callback.
   *
   * @private
   */
  async transaction(storeNames, type, callback) {
    await this.open();
    const result = await new Promise((resolve, reject) => {
      const txn = this._db.transaction(storeNames, type);
      const done = (value) => resolve(value);
      const abort = () => {
        reject(new Error('The transaction was manually aborted'));
        txn.abort();
      };
      txn.onerror = (evt) => reject(evt.target.error);
      txn.onabort = (evt) => reject(evt.target.error);
      txn.oncomplete = () => resolve();

      const stores = {};
      for (const storeName of storeNames) {
        stores[storeName] = txn.objectStore(storeName);
      }
      callback(stores, done, abort);
    });
    return result;
  }

  /**
   * Delegates async to a native IDBObjectStore method.
   *
   * @param {string} method The method name.
   * @param {string} storeName The object store name.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {...*} args The list of args to pass to the native method.
   * @return {*} The result of the transaction.
   *
   * @private
   */
  async _call(method, storeName, type, ...args) {
    await this.open();
    const callback = (stores, done) => {
      stores[storeName][method](...args).onsuccess = (evt) => {
        done(evt.target.result);
      };
    };

    return await this.transaction([storeName], type, callback);
  }

  /**
   * The default onversionchange handler, which closes the database so other
   * connections can open without being blocked.
   *
   * @param {Event} evt
   *
   * @private
   */
  _onversionchange(evt) {
    this.close();
  }

  /**
   * Closes the connection opened by `DBWrapper.open()`. Generally this method
   * doesn't need to be called since:
   *   1. It's usually better to keep a connection open since opening
   *      a new connection is somewhat slow.
   *   2. Connections are automatically closed when the reference is
   *      garbage collected.
   * The primary use case for needing to close a connection is when another
   * reference (typically in another tab) needs to upgrade it and would be
   * blocked by the current, open connection.
   *
   * @private
   */
  close() {
    if (this._db) this._db.close();
  }
}

// Exposed to let users modify the default timeout on a per-instance
// or global basis.
DBWrapper.prototype.OPEN_TIMEOUT = 2000;

export {DBWrapper};
