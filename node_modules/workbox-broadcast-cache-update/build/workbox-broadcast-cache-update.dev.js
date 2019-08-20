this.workbox = this.workbox || {};
this.workbox.broadcastUpdate = (function (exports,WorkboxError_mjs,logger_mjs,assert_mjs) {
  'use strict';

  try {
    self.workbox.v['workbox:broadcast-cache-update:3.6.3'] = 1;
  } catch (e) {} // eslint-disable-line

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
   * Given two `Response's`, compares several header values to see if they are
   * the same or not.
   *
   * @param {Response} firstResponse
   * @param {Response} secondResponse
   * @param {Array<string>} headersToCheck
   * @return {boolean}
   *
   * @memberof workbox.broadcastUpdate
   * @private
   */
  const responsesAreSame = (firstResponse, secondResponse, headersToCheck) => {
    {
      if (!(firstResponse instanceof Response && secondResponse instanceof Response)) {
        throw new WorkboxError_mjs.WorkboxError('invalid-responses-are-same-args');
      }
    }

    const atLeastOneHeaderAvailable = headersToCheck.some(header => {
      return firstResponse.headers.has(header) && secondResponse.headers.has(header);
    });

    if (!atLeastOneHeaderAvailable) {
      {
        logger_mjs.logger.warn(`Unable to determine where the response has been updated ` + `because none of the headers that would be checked are present.`);
        logger_mjs.logger.debug(`Attempting to compare the following: `, firstResponse, secondResponse, headersToCheck);
      }

      // Just return true, indicating the that responses are the same, since we
      // can't determine otherwise.
      return true;
    }

    return headersToCheck.every(header => {
      const headerStateComparison = firstResponse.headers.has(header) === secondResponse.headers.has(header);
      const headerValueComparison = firstResponse.headers.get(header) === secondResponse.headers.get(header);

      return headerStateComparison && headerValueComparison;
    });
  };

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

  var messageTypes = {
    CACHE_UPDATED: 'CACHE_UPDATED'
  };

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
    if (!('BroadcastChannel' in self && channel)) {
      {
        logger_mjs.logger.debug(`${url} was updated, but the Broadcast Channel API is not ` + `available in the current browser.`);
      }
      return;
    }

    {
      assert_mjs.assert.isInstance(channel, BroadcastChannel, {
        moduleName: 'workbox-broadcast-cache-update',
        className: '~',
        funcName: 'broadcastUpdate',
        paramName: 'channel'
      });
      assert_mjs.assert.isType(cacheName, 'string', {
        moduleName: 'workbox-broadcast-cache-update',
        className: '~',
        funcName: 'broadcastUpdate',
        paramName: 'cacheName'
      });
      assert_mjs.assert.isType(url, 'string', {
        moduleName: 'workbox-broadcast-cache-update',
        className: '~',
        funcName: 'broadcastUpdate',
        paramName: 'url'
      });
      assert_mjs.assert.isType(source, 'string', {
        moduleName: 'workbox-broadcast-cache-update',
        className: '~',
        funcName: 'broadcastUpdate',
        paramName: 'source'
      });
    }

    channel.postMessage({
      type: messageTypes.CACHE_UPDATED,
      meta: source,
      payload: {
        cacheName: cacheName,
        updatedUrl: url
      }
    });
  };

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
    constructor(channelName, { headersToCheck, source } = {}) {
      {
        if (typeof channelName !== 'string' || channelName.length === 0) {
          throw new WorkboxError_mjs.WorkboxError('channel-name-required');
        }
      }

      this._channelName = channelName;
      this._headersToCheck = headersToCheck || ['content-length', 'etag', 'last-modified'];
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
      if ('BroadcastChannel' in self && !this._channel) {
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
      if (!responsesAreSame(firstResponse, secondResponse, this._headersToCheck)) {
        broadcastUpdate(this._getChannel(), cacheName, url, this._source);
      }
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
   * This plugin will automatically broadcast a message whenever a cached response
   * is updated.
   *
   * @memberof workbox.broadcastUpdate
   */
  class Plugin {
    /**
    * Construct a new instance with a specific `channelName` to
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
    constructor(channelName, options) {
      this._broadcastUpdate = new BroadcastCacheUpdate(channelName, options);
    }
    /**
     * A "lifecycle" callback that will be triggered automatically by the
     * `workbox-sw` and `workbox-runtime-caching` handlers when an entry is
     * added to a cache.
     *
     * @private
     * @param {Object} options The input object to this function.
     * @param {string} options.cacheName Name of the cache being updated.
     * @param {Response} [options.oldResponse] The previous cached value, if any.
     * @param {Response} options.newResponse The new value in the cache.
     */
    cacheDidUpdate({ cacheName, oldResponse, newResponse, request }) {
      {
        assert_mjs.assert.isType(cacheName, 'string', {
          moduleName: 'workbox-broadcast-cache-update',
          className: 'Plugin',
          funcName: 'cacheDidUpdate',
          paramName: 'cacheName'
        });
        assert_mjs.assert.isInstance(newResponse, Response, {
          moduleName: 'workbox-broadcast-cache-update',
          className: 'Plugin',
          funcName: 'cacheDidUpdate',
          paramName: 'newResponse'
        });
        assert_mjs.assert.isInstance(request, Request, {
          moduleName: 'workbox-broadcast-cache-update',
          className: 'Plugin',
          funcName: 'cacheDidUpdate',
          paramName: 'request'
        });
      }

      if (!oldResponse) {
        // Without a two responses there is nothing to compare.
        return;
      }

      this._broadcastUpdate.notifyIfUpdated(oldResponse, newResponse, request.url, cacheName);
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

  exports.BroadcastCacheUpdate = BroadcastCacheUpdate;
  exports.Plugin = Plugin;
  exports.broadcastUpdate = broadcastUpdate;
  exports.messageTypes = messageTypes;

  return exports;

}({},workbox.core._private,workbox.core._private,workbox.core._private));

//# sourceMappingURL=workbox-broadcast-cache-update.dev.js.map
