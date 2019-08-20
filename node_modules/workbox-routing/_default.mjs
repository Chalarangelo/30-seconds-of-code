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

import {NavigationRoute} from './NavigationRoute.mjs';
import {RegExpRoute} from './RegExpRoute.mjs';
import {Router} from './Router.mjs';
import {Route} from './Route.mjs';
import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';
import {cacheNames} from 'workbox-core/_private/cacheNames.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import './_version.mjs';

if (process.env.NODE_ENV !== 'production') {
  assert.isSwEnv('workbox-routing');
}

/**
 * @private
 */
class DefaultRouter extends Router {
  /**
   * Easily register a RegExp, string, or function with a caching
   * strategy to the Router.
   *
   * This method will generate a Route for you if needed and
   * call [Router.registerRoute()]{@link
   * workbox.routing.Router#registerRoute}.
   *
   * @param {
   * RegExp|
   * string|
   * workbox.routing.Route~matchCallback|
   * workbox.routing.Route
   * } capture
   * If the capture param is a `Route`, all other arguments will be ignored.
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   * @return {workbox.routing.Route} The generated `Route`(Useful for
   * unregistering).
   *
   * @alias workbox.routing.registerRoute
   */
  registerRoute(capture, handler, method = 'GET') {
    let route;

    if (typeof capture === 'string') {
      const captureUrl = new URL(capture, location);

      if (process.env.NODE_ENV !== 'production') {
        if (!(capture.startsWith('/') || capture.startsWith('http'))) {
          throw new WorkboxError('invalid-string', {
            moduleName: 'workbox-routing',
            className: 'DefaultRouter',
            funcName: 'registerRoute',
            paramName: 'capture',
          });
        }

        // We want to check if Express-style wildcards are in the pathname only.
        // TODO: Remove this log message in v4.
        const valueToCheck = capture.startsWith('http') ?
          captureUrl.pathname :
          capture;
        // See https://github.com/pillarjs/path-to-regexp#parameters
        const wildcards = '[*:?+]';
        if (valueToCheck.match(new RegExp(`${wildcards}`))) {
          logger.debug(
            `The '$capture' parameter contains an Express-style wildcard ` +
            `character (${wildcards}). Strings are now always interpreted as ` +
            `exact matches; use a RegExp for partial or wildcard matches.`
          );
        }
      }

      const matchCallback = ({url}) => {
        if (process.env.NODE_ENV !== 'production') {
          if ((url.pathname === captureUrl.pathname) &&
              (url.origin !== captureUrl.origin)) {
            logger.debug(
              `${capture} only partially matches the cross-origin URL ` +
              `${url}. This route will only handle cross-origin requests ` +
              `if they match the entire URL.`
            );
          }
        }

        return url.href === captureUrl.href;
      };

      route = new Route(matchCallback, handler, method);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute(capture, handler, method);
    } else if (typeof capture === 'function') {
      route = new Route(capture, handler, method);
    } else if (capture instanceof Route) {
      route = capture;
    } else {
      throw new WorkboxError('unsupported-route-type', {
        moduleName: 'workbox-routing',
        className: 'DefaultRouter',
        funcName: 'registerRoute',
        paramName: 'capture',
      });
    }

    super.registerRoute(route);
    return route;
  }

  /**
   * Register a route that will return a precached file for a navigation
   * request. This is useful for the
   * [application shell pattern]{@link https://developers.google.com/web/fundamentals/architecture/app-shell}.
   *
   * This method will generate a
   * [NavigationRoute]{@link workbox.routing.NavigationRoute}
   * and call
   * [Router.registerRoute()]{@link workbox.routing.Router#registerRoute}
   * .
   *
   * @param {string} cachedAssetUrl
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to precache cache name provided by
   * [workbox-core.cacheNames]{@link workbox.core.cacheNames}.
   * @param {Array<RegExp>} [options.blacklist=[]] If any of these patterns
   * match, the route will not handle the request (even if a whitelist entry
   * matches).
   * @param {Array<RegExp>} [options.whitelist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the blacklist doesn't match).
   * @return {workbox.routing.NavigationRoute} Returns the generated
   * Route.
   *
   * @alias workbox.routing.registerNavigationRoute
   */
  registerNavigationRoute(cachedAssetUrl, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isType(cachedAssetUrl, 'string', {
        moduleName: 'workbox-routing',
        className: '[default export]',
        funcName: 'registerNavigationRoute',
        paramName: 'cachedAssetUrl',
      });
    }

    const cacheName = cacheNames.getPrecacheName(options.cacheName);
    const handler = () => caches.match(cachedAssetUrl, {cacheName})
      .then((response) => {
        if (response) {
          return response;
        }
        // This shouldn't normally happen, but there are edge cases:
        // https://github.com/GoogleChrome/workbox/issues/1441
        throw new Error(`The cache ${cacheName} did not have an entry for ` +
          `${cachedAssetUrl}.`);
      }).catch((error) => {
        // If there's either a cache miss, or the caches.match() call threw
        // an exception, then attempt to fulfill the navigation request with
        // a response from the network rather than leaving the user with a
        // failed navigation.
        if (process.env.NODE_ENV !== 'production') {
          logger.debug(`Unable to respond to navigation request with cached ` +
            `response: ${error.message}. Falling back to network.`);
        }

        // This might still fail if the browser is offline...
        return fetch(cachedAssetUrl);
      });

    const route = new NavigationRoute(handler, {
      whitelist: options.whitelist,
      blacklist: options.blacklist,
    });
    super.registerRoute(route);

    return route;
  }
}

const router = new DefaultRouter();

// By default, register a fetch event listener that will respond to a request
// only if there's a matching route.
self.addEventListener('fetch', (event) => {
  const responsePromise = router.handleRequest(event);
  if (responsePromise) {
    event.respondWith(responsePromise);
  }
});

export default router;
