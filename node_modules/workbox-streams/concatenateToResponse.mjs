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

import {createHeaders} from './utils/createHeaders.mjs';
import {concatenate} from './concatenate.mjs';

import './_version.mjs';

/**
 * Takes multiple source Promises, each of which could resolve to a Response, a
 * ReadableStream, or a [BodyInit](https://fetch.spec.whatwg.org/#bodyinit),
 * along with a
 * [HeadersInit](https://fetch.spec.whatwg.org/#typedefdef-headersinit).
 *
 * Returns an object exposing a Response whose body consists of each individual
 * stream's data returned in sequence, along with a Promise which signals when
 * the stream is finished (useful for passing to a FetchEvent's waitUntil()).
 *
 * @param {Array<Promise<workbox.streams.StreamSource>>} sourcePromises
 * @param {HeadersInit} [headersInit] If there's no `Content-Type` specified,
 * `'text/html'` will be used by default.
 * @return {Object<{done: Promise, response: Response}>}
 *
 * @memberof workbox.streams
 */
function concatenateToResponse(sourcePromises, headersInit) {
  const {done, stream} = concatenate(sourcePromises);

  const headers = createHeaders(headersInit);
  const response = new Response(stream, {headers});

  return {done, response};
}

export {concatenateToResponse};
