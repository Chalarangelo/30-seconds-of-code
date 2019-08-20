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

import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {responsesAreSame} from './utils/responsesAreSame.mjs';
import {broadcastUpdate} from './broadcastUpdate.mjs';
import './_version.mjs';

/**
 * Uses the [Broadcast Channel API]{@link https://developers.google.com/web/updates/2016/09/broadcastchannel}
 * to notify interested parties when a cached response has been updated.
 *
 * For efficiency's sake, the underlying response bodies are not compared;
 * only specific response headers are checked.
 *
 * @memberof workbox.broadcastUpdate
 */
class BroadcastCacheUpdate {
  /**
   * Construct a BroadcastCacheUpdate instance with a specific `channelName` to
   * broadcast messages on
   *
   * @param {string} channelName The name that will be used when creating
   * the `BroadcastChannel`.
   * @param {Object} options
   * @param {Array<string>}
   * [options.headersToCheck=['content-length', 'etag', 'last-modified']] A
   * list of headers that will be used to determine whether the responses
   * differ.
   * @param {string} [options.source='workbox-broadcast-cache-update'] An
   * attribution value that indicates where the update originated.
   */
  constructor(channelName, {headersToCheck, source} = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof channelName !== 'string' || channelName.length === 0) {
        throw new WorkboxError('channel-name-required');
      }
    }

    this._channelName = channelName;
    this._headersToCheck = headersToCheck || [
      'content-length',
      'etag',
      'last-modified',
    ];
    this._source = source || 'workbox-broadcast-cache-update';

    // TODO assert typeof headersToCheck instanceof Array
  }

  /**
   * @return {BroadcastChannel|undefined} The BroadcastChannel instance used for
   * broadcasting updates, or undefined if the browser doesn't support the
   * Broadcast Channel API.
   *
   * @private
   */
  _getChannel() {
    if (('BroadcastChannel' in self) && !this._channel) {
      this._channel = new BroadcastChannel(this._channelName);
    }
    return this._channel;
  }

  /**
   * Compare two [Responses](https://developer.mozilla.org/en-US/docs/Web/API/Response)
   * and send a message via the
   * {@link https://developers.google.com/web/updates/2016/09/broadcastchannel|Broadcast Channel API}
   * if they differ.
   *
   * Neither of the Responses can be {@link http://stackoverflow.com/questions/39109789|opaque}.
   *
   * @param {Response} firstResponse First responses to compare.
   * @param {Response} secondResponse Second responses to compare.
   * @param {string} url The URL of the updated request.
   * @param {string} cacheName Name of the cache the responses belong to.
   * This is included in the message posted on the broadcast channel.
   */
  notifyIfUpdated(firstResponse, secondResponse, url, cacheName) {
    if (!responsesAreSame(
      firstResponse, secondResponse, this._headersToCheck)) {
      broadcastUpdate(this._getChannel(), cacheName, url, this._source);
    }
  }
}

export {BroadcastCacheUpdate};
