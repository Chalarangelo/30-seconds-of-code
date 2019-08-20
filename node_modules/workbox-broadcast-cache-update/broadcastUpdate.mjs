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

import {assert} from 'workbox-core/_private/assert.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import messageTypes from './messageTypes.mjs';
import './_version.mjs';

/**
 * You would not normally call this method directly; it's called automatically
 * by an instance of the {@link BroadcastCacheUpdate} class. It's exposed here
 * for the benefit of developers who would rather not use the full
 * `BroadcastCacheUpdate` implementation.
 *
 * Calling this will dispatch a message on the provided
 * {@link https://developers.google.com/web/updates/2016/09/broadcastchannel|Broadcast Channel}
 * to notify interested subscribers about a change to a cached resource.
 *
 * The message that's posted has a formation inspired by the
 * [Flux standard action](https://github.com/acdlite/flux-standard-action#introduction)
 * format like so:
 *
 * ```
 * {
 *   type: 'CACHE_UPDATED',
 *   meta: 'workbox-broadcast-cache-update',
 *   payload: {
 *     cacheName: 'the-cache-name',
 *     updatedUrl: 'https://example.com/'
 *   }
 * }
 * ```
 *
 * (Usage of [Flux](https://facebook.github.io/flux/) itself is not at
 * all required.)
 *
 * @param {BroadcastChannel} channel The `BroadcastChannel` to use.
 * @param {string} cacheName The name of the cache in which the updated
 *        `Response` was stored.
 * @param {string} url The URL associated with the updated `Response`.
 * @param {string} source A string identifying this library as the source
 *        of the update message.
 *
 * @memberof workbox.broadcastUpdate
 */
const broadcastUpdate = (channel, cacheName, url, source) => {
  // There are browsers which support service workers but don't support the
  // Broadcast Channel API.
  // See https://github.com/GoogleChrome/workbox/issues/1304
  if (!(('BroadcastChannel' in self) && channel)) {
    if (process.env.NODE_ENV !== 'production') {
      logger.debug(`${url} was updated, but the Broadcast Channel API is not ` +
        `available in the current browser.`);
    }
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert.isInstance(channel, BroadcastChannel, {
      moduleName: 'workbox-broadcast-cache-update',
      className: '~',
      funcName: 'broadcastUpdate',
      paramName: 'channel',
    });
    assert.isType(cacheName, 'string', {
      moduleName: 'workbox-broadcast-cache-update',
      className: '~',
      funcName: 'broadcastUpdate',
      paramName: 'cacheName',
    });
    assert.isType(url, 'string', {
      moduleName: 'workbox-broadcast-cache-update',
      className: '~',
      funcName: 'broadcastUpdate',
      paramName: 'url',
    });
    assert.isType(source, 'string', {
      moduleName: 'workbox-broadcast-cache-update',
      className: '~',
      funcName: 'broadcastUpdate',
      paramName: 'source',
    });
  }

  channel.postMessage({
    type: messageTypes.CACHE_UPDATED,
    meta: source,
    payload: {
      cacheName: cacheName,
      updatedUrl: url,
    },
  });
};

export {broadcastUpdate};
