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

import {assert} from 'workbox-core/_private/assert.mjs';
import {cacheNames} from 'workbox-core/_private/cacheNames.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import {getFriendlyURL} from 'workbox-core/_private/getFriendlyURL.mjs';
import PrecacheController from './controllers/PrecacheController.mjs';
import './_version.mjs';

if (process.env.NODE_ENV !== 'production') {
  assert.isSwEnv('workbox-precaching');
}

let installActivateListenersAdded = false;
let fetchListenersAdded = false;
let suppressWarnings = false;
let plugins = [];

const cacheName = cacheNames.getPrecacheName();
const precacheController = new PrecacheController(cacheName);

const _removeIgnoreUrlParams = (origUrlObject, ignoreUrlParametersMatching) => {
  // Exclude initial '?'
  const searchString = origUrlObject.search.slice(1);

  // Split into an array of 'key=value' strings
  const keyValueStrings = searchString.split('&');
  const keyValuePairs = keyValueStrings.map((keyValueString) => {
    // Split each 'key=value' string into a [key, value] array
    return keyValueString.split('=');
  });
  const filteredKeyValuesPairs = keyValuePairs.filter((keyValuePair) => {
    return ignoreUrlParametersMatching
      .every((ignoredRegex) => {
        // Return true iff the key doesn't match any of the regexes.
        return !ignoredRegex.test(keyValuePair[0]);
      });
  });
  const filteredStrings = filteredKeyValuesPairs.map((keyValuePair) => {
    // Join each [key, value] array into a 'key=value' string
    return keyValuePair.join('=');
  });

  // Join the array of 'key=value' strings into a string with '&' in
  // between each
  const urlClone = new URL(origUrlObject);
  urlClone.search = filteredStrings.join('&');
  return urlClone;
};

/**
 * This function will take the request URL and manipulate it based on the
 * configuration options.
 *
 * @param {string} url
 * @param {Object} options
 * @return {string|null} Returns the URL in the cache that matches the request
 * if available, other null.
 *
 * @private
 */
const _getPrecachedUrl = (url, {
  ignoreUrlParametersMatching = [/^utm_/],
  directoryIndex = 'index.html',
  cleanUrls = true,
  urlManipulation = null,
} = {}) => {
  const urlObject = new URL(url, location);

  // Change '/some-url#123' => '/some-url'
  urlObject.hash = '';

  const urlWithoutIgnoredParams = _removeIgnoreUrlParams(
    urlObject, ignoreUrlParametersMatching
  );

  let urlsToAttempt = [
    // Test the URL that was fetched
    urlObject,
    // Test the URL without search params
    urlWithoutIgnoredParams,
  ];

  // Test the URL with a directory index
  if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
    const directoryUrl = new URL(urlWithoutIgnoredParams);
    directoryUrl.pathname += directoryIndex;
    urlsToAttempt.push(directoryUrl);
  }

  // Test the URL with a '.html' extension
  if (cleanUrls) {
    const cleanUrl = new URL(urlWithoutIgnoredParams);
    cleanUrl.pathname += '.html';
    urlsToAttempt.push(cleanUrl);
  }

  if (urlManipulation) {
    const additionalUrls = urlManipulation({url: urlObject});
    urlsToAttempt = urlsToAttempt.concat(additionalUrls);
  }

  const cachedUrls = precacheController.getCachedUrls();
  for (const possibleUrl of urlsToAttempt) {
    if (cachedUrls.indexOf(possibleUrl.href) !== -1) {
      // It's a perfect match
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(`Precaching found a match for ` +
          getFriendlyURL(possibleUrl.toString()));
      }
      return possibleUrl.href;
    }
  }

  return null;
};

const moduleExports = {};

/**
 * Add items to the precache list, removing any duplicates and
 * store the files in the
 * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you,
 * it only precaches files. To respond to a network request you call
 * [addRoute()]{@link module:workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * [precacheAndRoute()]{@link module:workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 *
 * @alias workbox.precaching.precache
 */
moduleExports.precache = (entries) => {
  precacheController.addToCacheList(entries);

  if (installActivateListenersAdded || entries.length <= 0) {
    return;
  }

  installActivateListenersAdded = true;
  self.addEventListener('install', (event) => {
    event.waitUntil(precacheController.install({
      event,
      plugins,
      suppressWarnings,
    }));
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(precacheController.activate({
      event,
      plugins,
    }));
  });
};

/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} options
 * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
 * check cache entries for a URLs ending with '/' to see if there is a hit when
 * appending the `directoryIndex` value.
 * @param {Array<RegExp>} [options.ignoreUrlParametersMatching=[/^utm_/]] An
 * array of regex's to remove search params when looking for a cache match.
 * @param {boolean} [options.cleanUrls=true] The `cleanUrls` option will
 * check the cache for the URL with a `.html` added to the end of the end.
 * @param {workbox.precaching~urlManipulation} [options.urlManipulation]
 * This is a function that should take a URL and return an array of
 * alternative URL's that should be checked for precache matches.
 *
 * @alias workbox.precaching.addRoute
 */
moduleExports.addRoute = (options) => {
  if (fetchListenersAdded) {
    // TODO: Throw error here.
    return;
  }

  fetchListenersAdded = true;
  self.addEventListener('fetch', (event) => {
    const precachedUrl = _getPrecachedUrl(event.request.url, options);
    if (!precachedUrl) {
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(`Precaching found no match for ` +
          getFriendlyURL(event.request.url));
      }
      return;
    }

    let responsePromise = caches.open(cacheName)
      .then((cache) => {
        return cache.match(precachedUrl);
      }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fall back to the network if we don't have a cached response (perhaps
        // due to manual cache cleanup).
        if (process.env.NODE_ENV !== 'production') {
          logger.debug(`The precached response for ` +
            `${getFriendlyURL(precachedUrl)} in ${cacheName} was not found. ` +
            `Falling back to the network instead.`);
        }

        return fetch(precachedUrl);
      });

    if (process.env.NODE_ENV !== 'production') {
      responsePromise = responsePromise.then((response) => {
        // Workbox is going to handle the route.
        // print the routing details to the console.
        logger.groupCollapsed(`Precaching is responding to: ` +
          getFriendlyURL(event.request.url));
        logger.log(`Serving the precached url: ${precachedUrl}`);

        // The Request and Response objects contains a great deal of
        // information, hide it under a group in case developers want to see it.
        logger.groupCollapsed(`View request details here.`);
        logger.unprefixed.log(event.request);
        logger.groupEnd();

        logger.groupCollapsed(`View response details here.`);
        logger.unprefixed.log(response);
        logger.groupEnd();

        logger.groupEnd();
        return response;
      });
    }
    event.respondWith(responsePromise);
  });
};

/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * [precache()]{@link module:workbox-precaching.precache} and
 * [addRoute()]{@link module:workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} options See
 * [addRoute() options]{@link module:workbox-precaching.addRoute}.
 *
 * @alias workbox.precaching.precacheAndRoute
 */
moduleExports.precacheAndRoute = (entries, options) => {
  moduleExports.precache(entries);
  moduleExports.addRoute(options);
};

/**
 * Warnings will be logged if any of the precached assets are entered without
 * a `revision` property. This is extremely dangerous if the URL's aren't
 * revisioned. However, the warnings can be supressed with this method.
 *
 * @param {boolean} suppress
 *
 * @alias workbox.precaching.suppressWarnings
 */
moduleExports.suppressWarnings = (suppress) => {
  suppressWarnings = suppress;
};

/**
 * Add plugins to precaching.
 *
 * @param {Array<Object>} newPlugins
 *
 * @alias workbox.precaching.addPlugins
 */
moduleExports.addPlugins = (newPlugins) => {
  plugins = plugins.concat(newPlugins);
};

export default moduleExports;
