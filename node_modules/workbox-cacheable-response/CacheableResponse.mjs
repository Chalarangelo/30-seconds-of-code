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

import {WorkboxError} from 'workbox-core/_private/WorkboxError.mjs';
import {assert} from 'workbox-core/_private/assert.mjs';
import {getFriendlyURL} from 'workbox-core/_private/getFriendlyURL.mjs';
import {logger} from 'workbox-core/_private/logger.mjs';
import './_version.mjs';

/**
 * This class allows you to set up rules determining what
 * status codes and/or headers need to be present in order for a
 * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * to be considered cacheable.
 *
 * @memberof workbox.cacheableResponse
 */
class CacheableResponse {
  /**
   * To construct a new CacheableResponse instance you must provide at least
   * one of the `config` properties.
   *
   * If both `statuses` and `headers` are specified, then both conditions must
   * be met for the `Response` to be considered cacheable.
   *
   * @param {Object} config
   * @param {Array<number>} [config.statuses] One or more status codes that a
   * `Response` can have and be considered cacheable.
   * @param {Object<string,string>} [config.headers] A mapping of header names
   * and expected values that a `Response` can have and be considered cacheable.
   * If multiple headers are provided, only one needs to be present.
   */
  constructor(config = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!(config.statuses || config.headers)) {
        throw new WorkboxError('statuses-or-headers-required', {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor',
        });
      }

      if (config.statuses) {
        assert.isArray(config.statuses, {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor',
          paramName: 'config.statuses',
        });
      }

      if (config.headers) {
        assert.isType(config.headers, 'object', {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor',
          paramName: 'config.headers',
        });
      }
    }

    this._statuses = config.statuses;
    this._headers = config.headers;
  }

  /**
   * Checks a response to see whether it's cacheable or not, based on this
   * object's configuration.
   *
   * @param {Response} response The response whose cacheability is being
   * checked.
   * @return {boolean} `true` if the `Response` is cacheable, and `false`
   * otherwise.
   */
  isResponseCacheable(response) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isInstance(response, Response, {
        moduleName: 'workbox-cacheable-response',
        className: 'CacheableResponse',
        funcName: 'isResponseCacheable',
        paramName: 'response',
      });
    }

    let cacheable = true;

    if (this._statuses) {
      cacheable = this._statuses.includes(response.status);
    }

    if (this._headers && cacheable) {
      cacheable = Object.keys(this._headers).some((headerName) => {
        return response.headers.get(headerName) === this._headers[headerName];
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!cacheable) {
        logger.groupCollapsed(`The request for ` +
          `'${getFriendlyURL(response.url)}' returned a response that does ` +
          `not meet the criteria for being cached.`);

        logger.groupCollapsed(`View cacheability criteria here.`);
        logger.unprefixed.log(`Cacheable statuses: ` +
          JSON.stringify(this._statuses));
        logger.unprefixed.log(`Cacheable headers: ` +
          JSON.stringify(this._headers, null, 2));
        logger.groupEnd();

        const logFriendlyHeaders = {};
        response.headers.forEach((value, key) => {
          logFriendlyHeaders[key] = value;
        });

        logger.groupCollapsed(`View response status and headers here.`);
        logger.unprefixed.log(`Response status: ` + response.status);
        logger.unprefixed.log(`Response headers: ` +
          JSON.stringify(logFriendlyHeaders, null, 2));
        logger.groupEnd();

        logger.groupCollapsed(`View full response details here.`);
        logger.unprefixed.log(response.headers);
        logger.unprefixed.log(response);
        logger.groupEnd();

        logger.groupEnd();
      }
    }

    return cacheable;
  }
}

export {CacheableResponse};
