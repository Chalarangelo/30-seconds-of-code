/*
 Copyright 2017 Google Inc. All Rights Reserved.
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

import {DBWrapper} from 'workbox-core/_private/DBWrapper.mjs';
import StorableRequest from './StorableRequest.mjs';
import {DB_NAME, OBJECT_STORE_NAME, INDEXED_PROP} from '../utils/constants.mjs';
import '../_version.mjs';

/**
 * A class to manage storing requests from a Queue in IndexedbDB,
 * indexed by their queue name for easier access.
 *
 * @private
 */
export class QueueStore {
  /**
   * Associates this instance with a Queue instance, so entries added can be
   * identified by their queue name.
   *
   * @param {Queue} queue
   *
   * @private
   */
  constructor(queue) {
    this._queue = queue;
    this._db = new DBWrapper(DB_NAME, 1, {
      onupgradeneeded: (evt) => evt.target.result
          .createObjectStore(OBJECT_STORE_NAME, {autoIncrement: true})
          .createIndex(INDEXED_PROP, INDEXED_PROP, {unique: false}),
    });
  }

  /**
   * Takes a StorableRequest instance, converts it to an object and adds it
   * as an entry in the object store.
   *
   * @param {StorableRequest} storableRequest
   *
   * @private
   */
  async addEntry(storableRequest) {
    await this._db.add(OBJECT_STORE_NAME, {
      queueName: this._queue.name,
      storableRequest: storableRequest.toObject(),
    });
  }

  /**
   * Gets the oldest entry in the object store, removes it, and returns the
   * value as a StorableRequest instance. If no entry exists, it returns
   * undefined.
   *
   * @return {StorableRequest|undefined}
   *
   * @private
   */
  async getAndRemoveOldestEntry() {
    const [entry] = await this._db.getAllMatching(OBJECT_STORE_NAME, {
      index: INDEXED_PROP,
      query: IDBKeyRange.only(this._queue.name),
      count: 1,
      includeKeys: true,
    });

    if (entry) {
      await this._db.delete(OBJECT_STORE_NAME, entry.primaryKey);
      return new StorableRequest(entry.value.storableRequest);
    }
  }
}
