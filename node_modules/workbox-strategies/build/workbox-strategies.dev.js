this.workbox = this.workbox || {};
this.workbox.strategies = (function (logger_mjs,assert_mjs,cacheNames_mjs,cacheWrapper_mjs,fetchWrapper_mjs,getFriendlyURL_mjs) {
  'use strict';

  try {
    self.workbox.v['workbox:strategies:3.6.3'] = 1;
  } catch (e) {} // eslint-disable-line

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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

  const getFriendlyURL = url => {
    const urlObj = new URL(url, location);
    if (urlObj.origin === location.origin) {
      return urlObj.pathname;
    }
    return urlObj.href;
  };

  var messages = {
    strategyStart: (strategyName, request) => `Using ${strategyName} to ` + `respond to '${getFriendlyURL(request.url)}'`,
    printFinalResponse: response => {
      if (response) {
        logger_mjs.logger.groupCollapsed(`View the final response here.`);
        logger_mjs.logger.unprefixed.log(response);
        logger_mjs.logger.groupEnd();
      }
    }
  };

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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
   * An implementation of a [cache-first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network}
   * request strategy.
   *
   * A cache first strategy is useful for assets that have been revisioned,
   * such as URLs like `/styles/example.a8f5f1.css`, since they
   * can be cached for long periods of time.
   *
   * @memberof workbox.strategies
   */
  class CacheFirst {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link workbox.core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.fetchOptions Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of all fetch() requests made by this strategy.
     * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     */
    constructor(options = {}) {
      this._cacheName = cacheNames_mjs.cacheNames.getRuntimeName(options.cacheName);
      this._plugins = options.plugins || [];
      this._fetchOptions = options.fetchOptions || null;
      this._matchOptions = options.matchOptions || null;
    }

    /**
     * This method will perform a request strategy and follows an API that
     * will work with the
     * [Workbox Router]{@link workbox.routing.Router}.
     *
     * @param {Object} options
     * @param {FetchEvent} options.event The fetch event to run this strategy
     * against.
     * @return {Promise<Response>}
     */
    handle({ event }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isInstance(event, FetchEvent, {
            moduleName: 'workbox-strategies',
            className: 'CacheFirst',
            funcName: 'handle',
            paramName: 'event'
          });
        }

        return _this.makeRequest({
          event,
          request: event.request
        });
      })();
    }

    /**
     * This method can be used to perform a make a standalone request outside the
     * context of the [Workbox Router]{@link workbox.routing.Router}.
     *
     * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
     * for more usage information.
     *
     * @param {Object} options
     * @param {Request|string} options.request Either a
     *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
     *     object, or a string URL, corresponding to the request to be made.
     * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
           be called automatically to extend the service worker's lifetime.
     * @return {Promise<Response>}
     */
    makeRequest({ event, request }) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const logs = [];

        if (typeof request === 'string') {
          request = new Request(request);
        }

        {
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: 'CacheFirst',
            funcName: 'makeRequest',
            paramName: 'request'
          });
        }

        let response = yield cacheWrapper_mjs.cacheWrapper.match({
          cacheName: _this2._cacheName,
          request,
          event,
          matchOptions: _this2._matchOptions,
          plugins: _this2._plugins
        });

        let error;
        if (!response) {
          {
            logs.push(`No response found in the '${_this2._cacheName}' cache. ` + `Will respond with a network request.`);
          }
          try {
            response = yield _this2._getFromNetwork(request, event);
          } catch (err) {
            error = err;
          }

          {
            if (response) {
              logs.push(`Got response from network.`);
            } else {
              logs.push(`Unable to get a response from the network.`);
            }
          }
        } else {
          {
            logs.push(`Found a cached response in the '${_this2._cacheName}' cache.`);
          }
        }

        {
          logger_mjs.logger.groupCollapsed(messages.strategyStart('CacheFirst', request));
          for (let log of logs) {
            logger_mjs.logger.log(log);
          }
          messages.printFinalResponse(response);
          logger_mjs.logger.groupEnd();
        }

        if (error) {
          // Don't swallow error as we'll want it to throw and enable catch
          // handlers in router.
          throw error;
        }

        return response;
      })();
    }

    /**
     * Handles the network and cache part of CacheFirst.
     *
     * @param {Request} request
     * @param {FetchEvent} [event]
     * @return {Promise<Response>}
     *
     * @private
     */
    _getFromNetwork(request, event) {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const response = yield fetchWrapper_mjs.fetchWrapper.fetch({
          request,
          event,
          fetchOptions: _this3._fetchOptions,
          plugins: _this3._plugins
        });

        // Keep the service worker while we put the request to the cache
        const responseClone = response.clone();
        const cachePutPromise = cacheWrapper_mjs.cacheWrapper.put({
          cacheName: _this3._cacheName,
          request,
          response: responseClone,
          event,
          plugins: _this3._plugins
        });

        if (event) {
          try {
            event.waitUntil(cachePutPromise);
          } catch (error) {
            {
              logger_mjs.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL_mjs.getFriendlyURL(event.request.url)}'.`);
            }
          }
        }

        return response;
      })();
    }
  }

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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
   * An implementation of a
   * [cache-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only}
   * request strategy.
   *
   * This class is useful if you want to take advantage of any [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
   *
   * @memberof workbox.strategies
   */
  class CacheOnly {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link workbox.core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     */
    constructor(options = {}) {
      this._cacheName = cacheNames_mjs.cacheNames.getRuntimeName(options.cacheName);
      this._plugins = options.plugins || [];
      this._matchOptions = options.matchOptions || null;
    }

    /**
     * This method will perform a request strategy and follows an API that
     * will work with the
     * [Workbox Router]{@link workbox.routing.Router}.
     *
     * @param {Object} options
     * @param {FetchEvent} options.event The fetch event to run this strategy
     * against.
     * @return {Promise<Response>}
     */
    handle({ event }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isInstance(event, FetchEvent, {
            moduleName: 'workbox-strategies',
            className: 'CacheOnly',
            funcName: 'handle',
            paramName: 'event'
          });
        }

        return _this.makeRequest({
          event,
          request: event.request
        });
      })();
    }

    /**
     * This method can be used to perform a make a standalone request outside the
     * context of the [Workbox Router]{@link workbox.routing.Router}.
     *
     * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
     * for more usage information.
     *
     * @param {Object} options
     * @param {Request|string} options.request Either a
     *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
     *     object, or a string URL, corresponding to the request to be made.
     * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
     *     be called automatically to extend the service worker's lifetime.
     * @return {Promise<Response>}
     */
    makeRequest({ event, request }) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        if (typeof request === 'string') {
          request = new Request(request);
        }

        {
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: 'CacheOnly',
            funcName: 'makeRequest',
            paramName: 'request'
          });
        }

        const response = yield cacheWrapper_mjs.cacheWrapper.match({
          cacheName: _this2._cacheName,
          request,
          event,
          matchOptions: _this2._matchOptions,
          plugins: _this2._plugins
        });

        {
          logger_mjs.logger.groupCollapsed(messages.strategyStart('CacheOnly', request));
          if (response) {
            logger_mjs.logger.log(`Found a cached response in the '${_this2._cacheName}'` + ` cache.`);
            messages.printFinalResponse(response);
          } else {
            logger_mjs.logger.log(`No response found in the '${_this2._cacheName}' cache.`);
          }
          logger_mjs.logger.groupEnd();
        }

        return response;
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

  var cacheOkAndOpaquePlugin = {
    /**
     * Return return a response (i.e. allow caching) if the
     * response is ok (i.e. 200) or is opaque.
     *
     * @param {Object} options
     * @param {Response} options.response
     * @return {Response|null}
     *
     * @private
     */
    cacheWillUpdate: ({ response }) => {
      if (response.ok || response.status === 0) {
        return response;
      }
      return null;
    }
  };

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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
   * An implementation of a
   * [network first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache}
   * request strategy.
   *
   * By default, this strategy will cache responses with a 200 status code as
   * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
   * Opaque responses are are cross-origin requests where the response doesn't
   * support [CORS]{@link https://enable-cors.org/}.
   *
   * @memberof workbox.strategies
   */
  class NetworkFirst {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link workbox.core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.fetchOptions Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of all fetch() requests made by this strategy.
     * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     * @param {number} options.networkTimeoutSeconds If set, any network requests
     * that fail to respond within the timeout will fallback to the cache.
     *
     * This option can be used to combat
     * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
     * scenarios.
     */
    constructor(options = {}) {
      this._cacheName = cacheNames_mjs.cacheNames.getRuntimeName(options.cacheName);

      if (options.plugins) {
        let isUsingCacheWillUpdate = options.plugins.some(plugin => !!plugin.cacheWillUpdate);
        this._plugins = isUsingCacheWillUpdate ? options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
      } else {
        // No plugins passed in, use the default plugin.
        this._plugins = [cacheOkAndOpaquePlugin];
      }

      this._networkTimeoutSeconds = options.networkTimeoutSeconds;
      {
        if (this._networkTimeoutSeconds) {
          assert_mjs.assert.isType(this._networkTimeoutSeconds, 'number', {
            moduleName: 'workbox-strategies',
            className: 'NetworkFirst',
            funcName: 'constructor',
            paramName: 'networkTimeoutSeconds'
          });
        }
      }

      this._fetchOptions = options.fetchOptions || null;
      this._matchOptions = options.matchOptions || null;
    }

    /**
     * This method will perform a request strategy and follows an API that
     * will work with the
     * [Workbox Router]{@link workbox.routing.Router}.
     *
     * @param {Object} options
     * @param {FetchEvent} options.event The fetch event to run this strategy
     * against.
     * @return {Promise<Response>}
     */
    handle({ event }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isInstance(event, FetchEvent, {
            moduleName: 'workbox-strategies',
            className: 'NetworkFirst',
            funcName: 'handle',
            paramName: 'event'
          });
        }

        return _this.makeRequest({
          event,
          request: event.request
        });
      })();
    }

    /**
     * This method can be used to perform a make a standalone request outside the
     * context of the [Workbox Router]{@link workbox.routing.Router}.
     *
     * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
     * for more usage information.
     *
     * @param {Object} options
     * @param {Request|string} options.request Either a
     *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
     *     object, or a string URL, corresponding to the request to be made.
     * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
     *     be called automatically to extend the service worker's lifetime.
     * @return {Promise<Response>}
     */
    makeRequest({ event, request }) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const logs = [];

        if (typeof request === 'string') {
          request = new Request(request);
        }

        {
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: 'NetworkFirst',
            funcName: 'handle',
            paramName: 'makeRequest'
          });
        }

        const promises = [];
        let timeoutId;

        if (_this2._networkTimeoutSeconds) {
          const { id, promise } = _this2._getTimeoutPromise({ request, event, logs });
          timeoutId = id;
          promises.push(promise);
        }

        const networkPromise = _this2._getNetworkPromise({ timeoutId, request, event, logs });
        promises.push(networkPromise);

        // Promise.race() will resolve as soon as the first promise resolves.
        let response = yield Promise.race(promises);
        // If Promise.race() resolved with null, it might be due to a network
        // timeout + a cache miss. If that were to happen, we'd rather wait until
        // the networkPromise resolves instead of returning null.
        // Note that it's fine to await an already-resolved promise, so we don't
        // have to check to see if it's still "in flight".
        if (!response) {
          response = yield networkPromise;
        }

        {
          logger_mjs.logger.groupCollapsed(messages.strategyStart('NetworkFirst', request));
          for (let log of logs) {
            logger_mjs.logger.log(log);
          }
          messages.printFinalResponse(response);
          logger_mjs.logger.groupEnd();
        }

        return response;
      })();
    }

    /**
     * @param {Object} options
     * @param {Request} options.request
     * @param {Array} options.logs A reference to the logs array
     * @param {Event} [options.event]
     * @return {Promise<Response>}
     *
     * @private
     */
    _getTimeoutPromise({ request, logs, event }) {
      var _this3 = this;

      let timeoutId;
      const timeoutPromise = new Promise(resolve => {
        const onNetworkTimeout = (() => {
          var _ref = babelHelpers.asyncToGenerator(function* () {
            {
              logs.push(`Timing out the network response at ` + `${_this3._networkTimeoutSeconds} seconds.`);
            }

            resolve((yield _this3._respondFromCache({ request, event })));
          });

          return function onNetworkTimeout() {
            return _ref.apply(this, arguments);
          };
        })();

        timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1000);
      });

      return {
        promise: timeoutPromise,
        id: timeoutId
      };
    }

    /**
     * @param {Object} options
     * @param {number|undefined} options.timeoutId
     * @param {Request} options.request
     * @param {Array} options.logs A reference to the logs Array.
     * @param {Event} [options.event]
     * @return {Promise<Response>}
     *
     * @private
     */
    _getNetworkPromise({ timeoutId, request, logs, event }) {
      var _this4 = this;

      return babelHelpers.asyncToGenerator(function* () {
        let error;
        let response;
        try {
          response = yield fetchWrapper_mjs.fetchWrapper.fetch({
            request,
            event,
            fetchOptions: _this4._fetchOptions,
            plugins: _this4._plugins
          });
        } catch (err) {
          error = err;
        }

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        {
          if (response) {
            logs.push(`Got response from network.`);
          } else {
            logs.push(`Unable to get a response from the network. Will respond ` + `with a cached response.`);
          }
        }

        if (error || !response) {
          response = yield _this4._respondFromCache({ request, event });
          {
            if (response) {
              logs.push(`Found a cached response in the '${_this4._cacheName}'` + ` cache.`);
            } else {
              logs.push(`No response found in the '${_this4._cacheName}' cache.`);
            }
          }
        } else {
          // Keep the service worker alive while we put the request in the cache
          const responseClone = response.clone();
          const cachePut = cacheWrapper_mjs.cacheWrapper.put({
            cacheName: _this4._cacheName,
            request,
            response: responseClone,
            event,
            plugins: _this4._plugins
          });

          if (event) {
            try {
              // The event has been responded to so we can keep the SW alive to
              // respond to the request
              event.waitUntil(cachePut);
            } catch (err) {
              {
                logger_mjs.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL_mjs.getFriendlyURL(event.request.url)}'.`);
              }
            }
          }
        }

        return response;
      })();
    }

    /**
     * Used if the network timeouts or fails to make the request.
     *
     * @param {Object} options
     * @param {Request} request The request to match in the cache
     * @param {Event} [options.event]
     * @return {Promise<Object>}
     *
     * @private
     */
    _respondFromCache({ event, request }) {
      return cacheWrapper_mjs.cacheWrapper.match({
        cacheName: this._cacheName,
        request,
        event,
        matchOptions: this._matchOptions,
        plugins: this._plugins
      });
    }
  }

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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
   * An implementation of a
   * [network-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-only}
   * request strategy.
   *
   * This class is useful if you want to take advantage of any [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
   *
   * @memberof workbox.strategies
   */
  class NetworkOnly {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link workbox.core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.fetchOptions Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of all fetch() requests made by this strategy.
     */
    constructor(options = {}) {
      this._cacheName = cacheNames_mjs.cacheNames.getRuntimeName(options.cacheName);
      this._plugins = options.plugins || [];
      this._fetchOptions = options.fetchOptions || null;
    }

    /**
     * This method will perform a request strategy and follows an API that
     * will work with the
     * [Workbox Router]{@link workbox.routing.Router}.
     *
     * @param {Object} options
     * @param {FetchEvent} options.event The fetch event to run this strategy
     * against.
     * @return {Promise<Response>}
     */
    handle({ event }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isInstance(event, FetchEvent, {
            moduleName: 'workbox-strategies',
            className: 'NetworkOnly',
            funcName: 'handle',
            paramName: 'event'
          });
        }

        return _this.makeRequest({
          event,
          request: event.request
        });
      })();
    }

    /**
     * This method can be used to perform a make a standalone request outside the
     * context of the [Workbox Router]{@link workbox.routing.Router}.
     *
     * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
     * for more usage information.
     *
     * @param {Object} options
     * @param {Request|string} options.request Either a
     *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
     *     object, or a string URL, corresponding to the request to be made.
     * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
     *     be called automatically to extend the service worker's lifetime.
     * @return {Promise<Response>}
     */
    makeRequest({ event, request }) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        if (typeof request === 'string') {
          request = new Request(request);
        }

        {
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: 'NetworkOnly',
            funcName: 'handle',
            paramName: 'request'
          });
        }

        let error;
        let response;
        try {
          response = yield fetchWrapper_mjs.fetchWrapper.fetch({
            request,
            event,
            fetchOptions: _this2._fetchOptions,
            plugins: _this2._plugins
          });
        } catch (err) {
          error = err;
        }

        {
          logger_mjs.logger.groupCollapsed(messages.strategyStart('NetworkOnly', request));
          if (response) {
            logger_mjs.logger.log(`Got response from network.`);
          } else {
            logger_mjs.logger.log(`Unable to get a response from the network.`);
          }
          messages.printFinalResponse(response);
          logger_mjs.logger.groupEnd();
        }

        // If there was an error thrown, re-throw it to ensure the Routers
        // catch handler is triggered.
        if (error) {
          throw error;
        }

        return response;
      })();
    }
  }

  /*
   Copyright 2018 Google Inc. All Rights Reserved.
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
   * An implementation of a
   * [stale-while-revalidate]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate}
   * request strategy.
   *
   * Resources are requested from both the cache and the network in parallel.
   * The strategy will respond with the cached version if available, otherwise
   * wait for the network response. The cache is updated with the network response
   * with each successful request.
   *
   * By default, this strategy will cache responses with a 200 status code as
   * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
   * Opaque responses are are cross-origin requests where the response doesn't
   * support [CORS]{@link https://enable-cors.org/}.
   *
   * @memberof workbox.strategies
   */
  class StaleWhileRevalidate {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link workbox.core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.fetchOptions Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of all fetch() requests made by this strategy.
     * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     */
    constructor(options = {}) {
      this._cacheName = cacheNames_mjs.cacheNames.getRuntimeName(options.cacheName);
      this._plugins = options.plugins || [];

      if (options.plugins) {
        let isUsingCacheWillUpdate = options.plugins.some(plugin => !!plugin.cacheWillUpdate);
        this._plugins = isUsingCacheWillUpdate ? options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
      } else {
        // No plugins passed in, use the default plugin.
        this._plugins = [cacheOkAndOpaquePlugin];
      }

      this._fetchOptions = options.fetchOptions || null;
      this._matchOptions = options.matchOptions || null;
    }

    /**
     * This method will perform a request strategy and follows an API that
     * will work with the
     * [Workbox Router]{@link workbox.routing.Router}.
     *
     * @param {Object} options
     * @param {FetchEvent} options.event The fetch event to run this strategy
     * against.
     * @return {Promise<Response>}
     */
    handle({ event }) {
      var _this = this;

      return babelHelpers.asyncToGenerator(function* () {
        {
          assert_mjs.assert.isInstance(event, FetchEvent, {
            moduleName: 'workbox-strategies',
            className: 'StaleWhileRevalidate',
            funcName: 'handle',
            paramName: 'event'
          });
        }

        return _this.makeRequest({
          event,
          request: event.request
        });
      })();
    }

    /**
     * This method can be used to perform a make a standalone request outside the
     * context of the [Workbox Router]{@link workbox.routing.Router}.
     *
     * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
     * for more usage information.
     *
     * @param {Object} options
     * @param {Request|string} options.request Either a
     *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
     *     object, or a string URL, corresponding to the request to be made.
     * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
     *     be called automatically to extend the service worker's lifetime.
     * @return {Promise<Response>}
     */
    makeRequest({ event, request }) {
      var _this2 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const logs = [];

        if (typeof request === 'string') {
          request = new Request(request);
        }

        {
          assert_mjs.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: 'StaleWhileRevalidate',
            funcName: 'handle',
            paramName: 'request'
          });
        }

        const fetchAndCachePromise = _this2._getFromNetwork({ request, event });

        let response = yield cacheWrapper_mjs.cacheWrapper.match({
          cacheName: _this2._cacheName,
          request,
          event,
          matchOptions: _this2._matchOptions,
          plugins: _this2._plugins
        });

        if (response) {
          {
            logs.push(`Found a cached response in the '${_this2._cacheName}'` + ` cache. Will update with the network response in the background.`);
          }

          if (event) {
            try {
              event.waitUntil(fetchAndCachePromise);
            } catch (error) {
              {
                logger_mjs.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL_mjs.getFriendlyURL(event.request.url)}'.`);
              }
            }
          }
        } else {
          {
            logs.push(`No response found in the '${_this2._cacheName}' cache. ` + `Will wait for the network response.`);
          }
          response = yield fetchAndCachePromise;
        }

        {
          logger_mjs.logger.groupCollapsed(messages.strategyStart('StaleWhileRevalidate', request));
          for (let log of logs) {
            logger_mjs.logger.log(log);
          }
          messages.printFinalResponse(response);
          logger_mjs.logger.groupEnd();
        }

        return response;
      })();
    }

    /**
     * @param {Object} options
     * @param {Request} options.request
     * @param {Event} [options.event]
     * @return {Promise<Response>}
     *
     * @private
     */
    _getFromNetwork({ request, event }) {
      var _this3 = this;

      return babelHelpers.asyncToGenerator(function* () {
        const response = yield fetchWrapper_mjs.fetchWrapper.fetch({
          request,
          event,
          fetchOptions: _this3._fetchOptions,
          plugins: _this3._plugins
        });

        const cachePutPromise = cacheWrapper_mjs.cacheWrapper.put({
          cacheName: _this3._cacheName,
          request,
          response: response.clone(),
          event,
          plugins: _this3._plugins
        });

        if (event) {
          try {
            event.waitUntil(cachePutPromise);
          } catch (error) {
            {
              logger_mjs.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL_mjs.getFriendlyURL(event.request.url)}'.`);
            }
          }
        }

        return response;
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

  var publicAPI = /*#__PURE__*/Object.freeze({
    CacheFirst: CacheFirst,
    CacheOnly: CacheOnly,
    NetworkFirst: NetworkFirst,
    NetworkOnly: NetworkOnly,
    StaleWhileRevalidate: StaleWhileRevalidate
  });

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
   * @function workbox.strategies.cacheFirst
   * @param {Object} options See the {@link workbox.strategies.CacheFirst}
   * constructor for more info.
   */

  /**
   * @function workbox.strategies.cacheOnly
   * @param {Object} options See the {@link workbox.strategies.CacheOnly}
   * constructor for more info.
   */

  /**
   * @function workbox.strategies.networkFirst
   * @param {Object} options See the {@link workbox.strategies.NetworkFirst}
   * constructor for more info.
   */

  /**
   * @function workbox.strategies.networkOnly
   * @param {Object} options See the {@link workbox.strategies.NetworkOnly}
   * constructor for more info.
   */

  /**
   * @function workbox.strategies.staleWhileRevalidate
   * @param {Object} options See the
   * {@link workbox.strategies.StaleWhileRevalidate} constructor for more info.
   */

  const mapping = {
    cacheFirst: CacheFirst,
    cacheOnly: CacheOnly,
    networkFirst: NetworkFirst,
    networkOnly: NetworkOnly,
    staleWhileRevalidate: StaleWhileRevalidate
  };

  const defaultExport = {};
  Object.keys(mapping).forEach(keyName => {
    defaultExport[keyName] = (options = {}) => {
      const StrategyClass = mapping[keyName];
      return new StrategyClass(Object.assign(options));
    };
  });

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

  const finalExport = Object.assign(defaultExport, publicAPI);

  return finalExport;

}(workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private));

//# sourceMappingURL=workbox-strategies.dev.js.map
