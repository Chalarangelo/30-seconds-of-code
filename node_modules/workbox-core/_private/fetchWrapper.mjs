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

import {WorkboxError} from './WorkboxError.mjs';
import {logger} from './logger.mjs';
import {assert} from './assert.mjs';
import {getFriendlyURL} from '../_private/getFriendlyURL.mjs';
import pluginEvents from '../models/pluginEvents.mjs';
import pluginUtils from '../utils/pluginUtils.mjs';
import '../_version.mjs';

/**
 * Wrapper around the fetch API.
 *
 * Will call requestWillFetch on available plugins.
 *
 * @param {Object} options
 * @param {Request|string} options.request
 * @param {Object} [options.fetchOptions]
 * @param {Event} [options.event]
 * @param {Array<Object>} [options.plugins=[]]
 * @return {Promise<Response>}
 *
 * @private
 * @memberof module:workbox-core
 */
const wrappedFetch = async ({
    request,
    fetchOptions,
    event,
    plugins = []}) => {
  // We *should* be able to call `await event.preloadResponse` even if it's
  // undefined, but for some reason, doing so leads to errors in our Node unit
  // tests. To work around that, explicitly check preloadResponse's value first.
  if (event && event.preloadResponse) {
    const possiblePreloadResponse = await event.preloadResponse;
    if (possiblePreloadResponse) {
      if (process.env.NODE_ENV !== 'production') {
        logger.log(`Using a preloaded navigation response for ` +
          `'${getFriendlyURL(request.url)}'`);
      }
      return possiblePreloadResponse;
    }
  }

  if (typeof request === 'string') {
    request = new Request(request);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert.isInstance(request, Request, {
      paramName: request,
      expectedClass: 'Request',
      moduleName: 'workbox-core',
      className: 'fetchWrapper',
      funcName: 'wrappedFetch',
    });
  }

  const failedFetchPlugins = pluginUtils.filter(
    plugins, pluginEvents.FETCH_DID_FAIL);

  // If there is a fetchDidFail plugin, we need to save a clone of the
  // original request before it's either modified by a requestWillFetch
  // plugin or before the original request's body is consumed via fetch().
  const originalRequest = failedFetchPlugins.length > 0 ?
    request.clone() : null;

  try {
    for (let plugin of plugins) {
      if (pluginEvents.REQUEST_WILL_FETCH in plugin) {
        request = await plugin[pluginEvents.REQUEST_WILL_FETCH].call(plugin, {
          request: request.clone(),
          event,
        });

        if (process.env.NODE_ENV !== 'production') {
          if (request) {
            assert.isInstance(request, Request, {
              moduleName: 'Plugin',
              funcName: pluginEvents.CACHED_RESPONSE_WILL_BE_USED,
              isReturnValueProblem: true,
            });
          }
        }
      }
    }
  } catch (err) {
    throw new WorkboxError('plugin-error-request-will-fetch', {
      thrownError: err,
    });
  }

  // The request can be altered by plugins with `requestWillFetch` making
  // the original request (Most likely from a `fetch` event) to be different
  // to the Request we make. Pass both to `fetchDidFail` to aid debugging.
  const pluginFilteredRequest = request.clone();

  try {
    const fetchResponse = await fetch(request, fetchOptions);
    if (process.env.NODE_ENV !== 'production') {
      logger.debug(`Network request for `+
      `'${getFriendlyURL(request.url)}' returned a response with ` +
      `status '${fetchResponse.status}'.`);
    }
    return fetchResponse;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      logger.error(`Network request for `+
      `'${getFriendlyURL(request.url)}' threw an error.`, error);
    }

    for (let plugin of failedFetchPlugins) {
      await plugin[pluginEvents.FETCH_DID_FAIL].call(plugin, {
        error,
        event,
        originalRequest: originalRequest.clone(),
        request: pluginFilteredRequest.clone(),
      });
    }

    throw error;
  }
};

const fetchWrapper = {
  fetch: wrappedFetch,
};

export {fetchWrapper};
