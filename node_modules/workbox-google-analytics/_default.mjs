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

import {Plugin} from 'workbox-background-sync/Plugin.mjs';
import {cacheNames} from 'workbox-core/_private/cacheNames.mjs';
import {Route} from 'workbox-routing/Route.mjs';
import {Router} from 'workbox-routing/Router.mjs';
import {NetworkFirst} from 'workbox-strategies/NetworkFirst.mjs';
import {NetworkOnly} from 'workbox-strategies/NetworkOnly.mjs';
import {
  QUEUE_NAME,
  MAX_RETENTION_TIME,
  GOOGLE_ANALYTICS_HOST,
  GTM_HOST,
  ANALYTICS_JS_PATH,
  GTAG_JS_PATH,
  COLLECT_PATHS_REGEX,
} from './utils/constants.mjs';
import './_version.mjs';

/**
 * Promisifies the FileReader API to await a text response from a Blob.
 *
 * @param {Blob} blob
 * @return {Promise<string>}
 *
 * @private
 */
const getTextFromBlob = async (blob) => {
  // This usage of `return await new Promise...` is intentional to work around
  // a bug in the transpiled/minified output.
  // See https://github.com/GoogleChrome/workbox/issues/1186
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
};

/**
 * Creates the requestWillDequeue callback to be used with the background
 * sync queue plugin. The callback takes the failed request and adds the
 * `qt` param based on the current time, as well as applies any other
 * user-defined hit modifications.
 *
 * @param {Object} config See workbox.googleAnalytics.initialize.
 * @return {Function} The requestWillDequeu callback function.
 *
 * @private
 */
const createRequestWillReplayCallback = (config) => {
  return async (storableRequest) => {
    let {url, requestInit, timestamp} = storableRequest;
    url = new URL(url);

    // Measurement protocol requests can set their payload parameters in either
    // the URL query string (for GET requests) or the POST body.
    let params;
    if (requestInit.body) {
      const payload = requestInit.body instanceof Blob ?
          await getTextFromBlob(requestInit.body) : requestInit.body;

      params = new URLSearchParams(payload);
    } else {
      params = url.searchParams;
    }

    // Calculate the qt param, accounting for the fact that an existing
    // qt param may be present and should be updated rather than replaced.
    const originalHitTime = timestamp - (Number(params.get('qt')) || 0);
    const queueTime = Date.now() - originalHitTime;

    // Set the qt param prior to applying the hitFilter or parameterOverrides.
    params.set('qt', queueTime);

    if (config.parameterOverrides) {
      for (const param of Object.keys(config.parameterOverrides)) {
        const value = config.parameterOverrides[param];
        params.set(param, value);
      }
    }

    if (typeof config.hitFilter === 'function') {
      config.hitFilter.call(null, params);
    }

    requestInit.body = params.toString();
    requestInit.method = 'POST';
    requestInit.mode = 'cors';
    requestInit.credentials = 'omit';
    requestInit.headers = {'Content-Type': 'text/plain'};

    // Ignore URL search params as they're now in the post body.
    storableRequest.url = `${url.origin}${url.pathname}`;
  };
};

/**
 * Creates GET and POST routes to catch failed Measurement Protocol hits.
 *
 * @param {Plugin} queuePlugin
 * @return {Array<Route>} The created routes.
 *
 * @private
 */
const createCollectRoutes = (queuePlugin) => {
  const match = ({url}) => url.hostname === GOOGLE_ANALYTICS_HOST &&
      COLLECT_PATHS_REGEX.test(url.pathname);

  const handler = new NetworkOnly({
    plugins: [queuePlugin],
  });

  return [
    new Route(match, handler, 'GET'),
    new Route(match, handler, 'POST'),
  ];
};

/**
 * Creates a route with a network first strategy for the analytics.js script.
 *
 * @param {string} cacheName
 * @return {Route} The created route.
 *
 * @private
 */
const createAnalyticsJsRoute = (cacheName) => {
  const match = ({url}) => url.hostname === GOOGLE_ANALYTICS_HOST &&
      url.pathname === ANALYTICS_JS_PATH;
  const handler = new NetworkFirst({cacheName});

  return new Route(match, handler, 'GET');
};

/**
 * Creates a route with a network first strategy for the gtag.js script.
 *
 * @param {string} cacheName
 * @return {Route} The created route.
 *
 * @private
 */
const createGtagJsRoute = (cacheName) => {
  const match = ({url}) => url.hostname === GTM_HOST &&
      url.pathname === GTAG_JS_PATH;
  const handler = new NetworkFirst({cacheName});

  return new Route(match, handler, 'GET');
};

/**
 * @param {Object=} [options]
 * @param {Object} [options.cacheName] The cache name to store and retrieve
 *     analytics.js. Defaults to the cache names provided by `workbox-core`.
 * @param {Object} [options.parameterOverrides]
 *     [Measurement Protocol parameters](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters),
 *     expressed as key/value pairs, to be added to replayed Google Analytics
 *     requests. This can be used to, e.g., set a custom dimension indicating
 *     that the request was replayed.
 * @param {Function} [options.hitFilter] A function that allows you to modify
 *     the hit parameters prior to replaying
 *     the hit. The function is invoked with the original hit's URLSearchParams
 *     object as its only argument.
 *
 * @memberof workbox.googleAnalytics
 */
const initialize = (options = {}) => {
  const cacheName = cacheNames.getGoogleAnalyticsName(options.cacheName);

  const queuePlugin = new Plugin(QUEUE_NAME, {
    maxRetentionTime: MAX_RETENTION_TIME,
    callbacks: {
      requestWillReplay: createRequestWillReplayCallback(options),
    },
  });

  const routes = [
    createAnalyticsJsRoute(cacheName),
    createGtagJsRoute(cacheName),
    ...createCollectRoutes(queuePlugin),
  ];

  const router = new Router();
  for (const route of routes) {
    router.registerRoute(route);
  }

  self.addEventListener('fetch', (evt) => {
    const responsePromise = router.handleRequest(evt);
    if (responsePromise) {
      evt.respondWith(responsePromise);
    }
  });
};

export {
  initialize,
};
