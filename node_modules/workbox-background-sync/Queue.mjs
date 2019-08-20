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

import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';
import {getFriendlyURL} from 'workbox-core/_private/getFriendlyURL.mjs';
import {QueueStore} from './models/QueueStore.mjs';
import StorableRequest from './models/StorableRequest.mjs';
import {TAG_PREFIX, MAX_RETENTION_TIME} from './utils/constants.mjs';
import './_version.mjs';

const queueNames = new Set();

/**
 * A class to manage storing failed requests in IndexedDB and retrying them
 * later. All parts of the storing and replaying process are observable via
 * callbacks.
 *
 * @memberof workbox.backgroundSync
 */
class Queue {
  /**
   * Creates an instance of Queue with the given options
   *
   * @param {string} name The unique name for this queue. This name must be
   *     unique as it's used to register sync events and store requests
   *     in IndexedDB specific to this instance. An error will be thrown if
   *     a duplicate name is detected.
   * @param {Object} [options]
   * @param {Object} [options.callbacks] Callbacks to observe the lifecycle of
   *     queued requests. Use these to respond to or modify the requests
   *     during the replay process.
   * @param {function(StorableRequest):undefined}
   *     [options.callbacks.requestWillEnqueue]
   *     Invoked immediately before the request is stored to IndexedDB. Use
   *     this callback to modify request data at store time.
   * @param {function(StorableRequest):undefined}
   *     [options.callbacks.requestWillReplay]
   *     Invoked immediately before the request is re-fetched. Use this
   *     callback to modify request data at fetch time.
   * @param {function(Array<StorableRequest>):undefined}
   *     [options.callbacks.queueDidReplay]
   *     Invoked after all requests in the queue have successfully replayed.
   * @param {number} [options.maxRetentionTime = 7 days] The amount of time (in
   *     minutes) a request may be retried. After this amount of time has
   *     passed, the request will be deleted from the queue.
   */
  constructor(name, {
    callbacks = {},
    maxRetentionTime = MAX_RETENTION_TIME,
  } = {}) {
    // Ensure the store name is not already being used
    if (queueNames.has(name)) {
      throw new WorkboxError('duplicate-queue-name', {name});
    } else {
      queueNames.add(name);
    }

    this._name = name;
    this._callbacks = callbacks;
    this._maxRetentionTime = maxRetentionTime;
    this._queueStore = new QueueStore(this);

    this._addSyncListener();
  }

  /**
   * @return {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Stores the passed request into IndexedDB. The database used is
   * `workbox-background-sync` and the object store name is the same as
   * the name this instance was created with (to guarantee it's unique).
   *
   * @param {Request} request The request object to store.
   */
  async addRequest(request) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isInstance(request, Request, {
        moduleName: 'workbox-background-sync',
        className: 'Queue',
        funcName: 'addRequest',
        paramName: 'request',
      });
    }

    const storableRequest = await StorableRequest.fromRequest(request.clone());
    await this._runCallback('requestWillEnqueue', storableRequest);
    await this._queueStore.addEntry(storableRequest);
    await this._registerSync();
    if (process.env.NODE_ENV !== 'production') {
      logger.log(`Request for '${getFriendlyURL(storableRequest.url)}' has been
          added to background sync queue '${this._name}'.`);
    }
  }

  /**
   * Retrieves all stored requests in IndexedDB and retries them. If the
   * queue contained requests that were successfully replayed, the
   * `queueDidReplay` callback is invoked (which implies the queue is
   * now empty). If any of the requests fail, a new sync registration is
   * created to retry again later.
   */
  async replayRequests() {
    const now = Date.now();
    const replayedRequests = [];
    const failedRequests = [];

    let storableRequest;
    while (storableRequest = await this._queueStore.getAndRemoveOldestEntry()) {
      // Make a copy so the unmodified request can be stored
      // in the event of a replay failure.
      const storableRequestClone = storableRequest.clone();

      // Ignore requests older than maxRetentionTime.
      const maxRetentionTimeInMs = this._maxRetentionTime * 60 * 1000;
      if (now - storableRequest.timestamp > maxRetentionTimeInMs) {
        continue;
      }

      await this._runCallback('requestWillReplay', storableRequest);

      const replay = {request: storableRequest.toRequest()};

      try {
        // Clone the request before fetching so callbacks get an unused one.
        replay.response = await fetch(replay.request.clone());
        if (process.env.NODE_ENV !== 'production') {
          logger.log(`Request for '${getFriendlyURL(storableRequest.url)}'
             has been replayed`);
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          logger.log(`Request for '${getFriendlyURL(storableRequest.url)}'
             failed to replay`);
        }
        replay.error = err;
        failedRequests.push(storableRequestClone);
      }

      replayedRequests.push(replay);
    }

    await this._runCallback('queueDidReplay', replayedRequests);

    // If any requests failed, put the failed requests back in the queue
    // and rethrow the failed requests count.
    if (failedRequests.length) {
      await Promise.all(failedRequests.map((storableRequest) => {
        return this._queueStore.addEntry(storableRequest);
      }));

      throw new WorkboxError('queue-replay-failed',
        {name: this._name, count: failedRequests.length});
    }
  }

  /**
   * Runs the passed callback if it exists.
   *
   * @private
   * @param {string} name The name of the callback on this._callbacks.
   * @param {...*} args The arguments to invoke the callback with.
   */
  async _runCallback(name, ...args) {
    if (typeof this._callbacks[name] === 'function') {
      await this._callbacks[name].apply(null, args);
    }
  }

  /**
   * In sync-supporting browsers, this adds a listener for the sync event.
   * In non-sync-supporting browsers, this will retry the queue on service
   * worker startup.
   *
   * @private
   */
  _addSyncListener() {
    if ('sync' in registration) {
      self.addEventListener('sync', (event) => {
        if (event.tag === `${TAG_PREFIX}:${this._name}`) {
          if (process.env.NODE_ENV !== 'production') {
            logger.log(`Background sync for tag '${event.tag}'
                has been received, starting replay now`);
          }
          event.waitUntil(this.replayRequests());
        }
      });
    } else {
      if (process.env.NODE_ENV !== 'production') {
        logger.log(`Background sync replaying without background sync event`);
      }
      // If the browser doesn't support background sync, retry
      // every time the service worker starts up as a fallback.
      this.replayRequests();
    }
  }

  /**
   * Registers a sync event with a tag unique to this instance.
   *
   * @private
   */
  async _registerSync() {
    if ('sync' in registration) {
      try {
        await registration.sync.register(`${TAG_PREFIX}:${this._name}`);
      } catch (err) {
        // This means the registration failed for some reason, possibly due to
        // the user disabling it.
        if (process.env.NODE_ENV !== 'production') {
          logger.warn(
            `Unable to register sync event for '${this._name}'.`, err);
        }
      }
    }
  }

  /**
   * Returns the set of queue names. This is primarily used to reset the list
   * of queue names in tests.
   *
   * @return {Set}
   *
   * @private
   */
  static get _queueNames() {
    return queueNames;
  }
}

export {Queue};
