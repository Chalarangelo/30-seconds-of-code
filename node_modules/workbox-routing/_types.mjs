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

import './_version.mjs';

/**
 * The "match" callback is used to determine if a `Route` should handle a
 * service worker's `fetch` event. Returning a truthy value means
 * this `Route` will handle and respond to the event.
 *
 * Return `null` if this Route shouldn't match against the `fetch` event.
 *
 * Any truthy value returned by this callback will be passed to the
 * Route's
 * [handler callback]{@link workbox.routing.Route~handlerCallback}.
 *
 * @callback Route~matchCallback
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @param {FetchEvent} context.event The service worker`s `fetch`
 * event.
 * @return {Object|null} To signify a match, return anything other than `null`.
 * Return `null` if the route shouldn't match.
 * [handler]{@link workbox.routing.Route~handlerCallback}.
 *
 * @memberof workbox.routing
 */

/**
 * The "handler" callback is called when a service worker's `fetch` event
 * has been matched by a `Route`. This callback should return a Promise that
 * resolves with a `Response`.
 *
 * If a value is returned by the
 * [match callback]{@link workbox.routing.Route~matchCallback} it
 * will be passed in as the `context.params` argument.
 *
 * @callback Route~handlerCallback
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @param {FetchEvent} context.event The service worker's `fetch`
 * event.
 * @param {Object} [context.params] Parameters returned by the Route's
 * [match callback]{@link workbox.routing.Route~matchCallback} function.
 * This will be undefined if nothing was returned.
 * @return {Promise<Response>} The response that will fulfill the request.
 *
 * @memberof workbox.routing
 */
