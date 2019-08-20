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

import '../_version.mjs';

const serializableProperties = [
  'method',
  'referrer',
  'referrerPolicy',
  'mode',
  'credentials',
  'cache',
  'redirect',
  'integrity',
  'keepalive',
];


/**
 * A class to make it easier to serialize and de-serialize requests so they
 * can be stored in IndexedDB.
 *
 * @private
 */
export default class StorableRequest {
  /**
   * Converts a Request object to a plain object that can be structured
   * cloned or JSON-stringified.
   *
   * @param {Request} request
   * @return {Promise<StorableRequest>}
   *
   * @private
   */
  static async fromRequest(request) {
    const requestInit = {headers: {}};

    // Set the body if present.
    if (request.method !== 'GET') {
      // Use blob to support non-text request bodies,
      // and clone first in case the caller still needs the request.
      requestInit.body = await request.clone().blob();
    }

    // Convert the headers from an iterable to an object.
    for (const [key, value] of request.headers.entries()) {
      requestInit.headers[key] = value;
    }

    // Add all other serializable request properties
    for (const prop of serializableProperties) {
      if (request[prop] !== undefined) {
        requestInit[prop] = request[prop];
      }
    }

    return new StorableRequest({url: request.url, requestInit});
  }

  /**
   * Accepts a URL and RequestInit dictionary that can be used to create a
   * new Request object. A timestamp is also generated so consumers can
   * reference when the object was created.
   *
   * @param {Object} param1
   * @param {string} param1.url
   * @param {Object} param1.requestInit
   *     See: https://fetch.spec.whatwg.org/#requestinit
   * @param {number} param1.timestamp The time the request was created,
   *     defaulting to the current time if not specified.
   *
   * @private
   */
  constructor({url, requestInit, timestamp = Date.now()}) {
    this.url = url;
    this.requestInit = requestInit;

    // "Private"
    this._timestamp = timestamp;
  }

  /**
   * Gets the private _timestamp property.
   *
   * @return {number}
   *
   * @private
   */
  get timestamp() {
    return this._timestamp;
  }

  /**
   * Coverts this instance to a plain Object.
   *
   * @return {Object}
   *
   * @private
   */
  toObject() {
    return {
      url: this.url,
      timestamp: this.timestamp,
      requestInit: this.requestInit,
    };
  }

  /**
   * Converts this instance to a Request.
   *
   * @return {Request}
   *
   * @private
   */
  toRequest() {
    return new Request(this.url, this.requestInit);
  }

  /**
   * Creates and returns a deep clone of the instance.
   *
   * @return {StorableRequest}
   *
   * @private
   */
  clone() {
    const requestInit = Object.assign({}, this.requestInit);
    requestInit.headers = Object.assign({}, this.requestInit.headers);
    if (this.requestInit.body) {
      requestInit.body = this.requestInit.body.slice();
    }

    return new StorableRequest({
      url: this.url,
      timestamp: this.timestamp,
      requestInit,
    });
  }
}
