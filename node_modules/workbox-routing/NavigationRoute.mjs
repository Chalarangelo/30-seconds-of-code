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
import {Route} from './Route.mjs';
import './_version.mjs';

/**
 * NavigationRoute makes it easy to create a [Route]{@link
 * workbox.routing.Route} that matches for browser
 * [navigation requests]{@link https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests}.
 *
 * It will only match incoming Requests whose
 * [`mode`]{@link https://fetch.spec.whatwg.org/#concept-request-mode}
 * is set to `navigate`.
 *
 * You can optionally only apply this route to a subset of navigation requests
 * by using one or both of the `blacklist` and `whitelist` parameters.
 *
 * @memberof workbox.routing
 * @extends workbox.routing.Route
 */
class NavigationRoute extends Route {
  /**
   * If both `blacklist` and `whiltelist` are provided, the `blacklist` will
   * take precedence and the request will not match this route.
   *
   * The regular expressions in `whitelist` and `blacklist`
   * are matched against the concatenated
   * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
   * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
   * portions of the requested URL.
   *
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {Object} options
   * @param {Array<RegExp>} [options.blacklist] If any of these patterns match,
   * the route will not handle the request (even if a whitelist RegExp matches).
   * @param {Array<RegExp>} [options.whitelist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the blacklist doesn't match).
   */
  constructor(handler, {whitelist = [/./], blacklist = []} = {}) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isArrayOfClass(whitelist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.whitelist',
      });
      assert.isArrayOfClass(blacklist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.blacklist',
      });
    }

    super((...args) => this._match(...args), handler);

    this._whitelist = whitelist;
    this._blacklist = blacklist;
  }

  /**
   * Routes match handler.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event
   * @param {URL} options.url
   * @return {boolean}
   *
   * @private
   */
  _match({event, url}) {
    if (event.request.mode !== 'navigate') {
      return false;
    }

    const pathnameAndSearch = url.pathname + url.search;

    if (this._blacklist.some((regExp) => regExp.test(pathnameAndSearch))) {
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(`The navigation route is not being used, since the ` +
          `request URL matches both the whitelist and blacklist.`);
      }
      return false;
    }

    if (this._whitelist.some((regExp) => regExp.test(pathnameAndSearch))) {
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(`The navigation route is being used.`);
      }
      return true;
    } else {
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(
          `The navigation route is not being used, since the ` +
          `URL being navigated to doesn't match the whitelist.`
        );
      }
    }

    return false;
  }
}

export {NavigationRoute};
