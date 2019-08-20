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

import '../../_version.mjs';

export default {
  'invalid-value': ({paramName, validValueDescription, value}) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }
    return `The '${paramName}' parameter was given a value with an ` +
      `unexpected value. ${validValueDescription} Received a value of ` +
      `${JSON.stringify(value)}.`;
  },

  'not-in-sw': ({moduleName}) => {
    if (!moduleName) {
      throw new Error(`Unexpected input to 'not-in-sw' error.`);
    }
    return `The '${moduleName}' must be used in a service worker.`;
  },

  'not-an-array': ({moduleName, className, funcName, paramName}) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }
    return `The parameter '${paramName}' passed into ` +
      `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },

  'incorrect-type': ({expectedType, paramName, moduleName, className,
                   funcName}) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }
    return `The parameter '${paramName}' passed into ` +
      `'${moduleName}.${className ? (className + '.') : ''}` +
      `${funcName}()' must be of type ${expectedType}.`;
  },

  'incorrect-class': ({expectedClass, paramName, moduleName, className,
                       funcName, isReturnValueProblem}) => {
    if (!expectedClass || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }

    if (isReturnValueProblem) {
      return `The return value from ` +
        `'${moduleName}.${className ? (className + '.') : ''}${funcName}()' ` +
        `must be an instance of class ${expectedClass.name}.`;
    }

    return `The parameter '${paramName}' passed into ` +
      `'${moduleName}.${className ? (className + '.') : ''}${funcName}()' ` +
      `must be an instance of class ${expectedClass.name}.`;
  },

  'missing-a-method': ({expectedMethod, paramName, moduleName, className,
                    funcName}) => {
    if (!expectedMethod || !paramName || !moduleName || !className
        || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }
    return `${moduleName}.${className}.${funcName}() expected the ` +
      `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },

  'add-to-cache-list-unexpected-type': ({entry}) => {
    return `An unexpected entry was passed to ` +
    `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` +
    `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` +
    `strings with one or more characters, objects with a url property or ` +
    `Request objects.`;
  },

  'add-to-cache-list-conflicting-entries': ({firstEntry, secondEntry}) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` +
        `'add-to-cache-list-duplicate-entries' error.`);
    }

    return `Two of the entries passed to ` +
      `'workbox-precaching.PrecacheController.addToCacheList()' had matching ` +
      `URLs but different revision details. This means workbox-precaching ` +
      `is unable to determine cache the asset correctly. Please remove one ` +
      `of the entries.`;
  },

  'plugin-error-request-will-fetch': ({thrownError}) => {
    if (!thrownError) {
      throw new Error(`Unexpected input to ` +
        `'plugin-error-request-will-fetch', error.`);
    }

    return `An error was thrown by a plugins 'requestWillFetch()' method. ` +
      `The thrown error message was: '${thrownError.message}'.`;
  },

  'invalid-cache-name': ({cacheNameId, value}) => {
    if (!cacheNameId) {
      throw new Error(
        `Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }

    return `You must provide a name containing at least one character for ` +
      `setCacheDeatils({${cacheNameId}: '...'}). Received a value of ` +
      `'${JSON.stringify(value)}'`;
  },

  'unregister-route-but-not-found-with-method': ({method}) => {
    if (!method) {
      throw new Error(`Unexpected input to ` +
        `'unregister-route-but-not-found-with-method' error.`);
    }

    return `The route you're trying to unregister was not  previously ` +
      `registered for the method type '${method}'.`;
  },

  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` +
      `registered.`;
  },

  'queue-replay-failed': ({name, count}) => {
    return `${count} requests failed, while trying to replay Queue: ${name}.`;
  },

  'duplicate-queue-name': ({name}) => {
    return `The Queue name '${name}' is already being used. ` +
        `All instances of backgroundSync.Queue must be given unique names.`;
  },

  'expired-test-without-max-age': ({methodName, paramName}) => {
    return `The '${methodName}()' method can only be used when the ` +
      `'${paramName}' is used in the constructor.`;
  },

  'unsupported-route-type': ({moduleName, className, funcName, paramName}) => {
    return `The supplied '${paramName}' parameter was an unsupported type. ` +
      `Please check the docs for ${moduleName}.${className}.${funcName} for ` +
      `valid input types.`;
  },

  'not-array-of-class': ({value, expectedClass,
    moduleName, className, funcName, paramName}) => {
    return `The supplied '${paramName}' parameter must be an array of ` +
      `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` +
      `Please check the call to ${moduleName}.${className}.${funcName}() ` +
      `to fix the issue.`;
  },

  'max-entries-or-age-required': ({moduleName, className, funcName}) => {
    return `You must define either config.maxEntries or config.maxAgeSeconds` +
      `in ${moduleName}.${className}.${funcName}`;
  },

  'statuses-or-headers-required': ({moduleName, className, funcName}) => {
    return `You must define either config.statuses or config.headers` +
      `in ${moduleName}.${className}.${funcName}`;
  },

  'invalid-string': ({moduleName, className, funcName, paramName}) => {
    if (!paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }
    return `When using strings, the '${paramName}' parameter must start with ` +
      `'http' (for cross-origin matches) or '/' (for same-origin matches). ` +
      `Please see the docs for ${moduleName}.${className}.${funcName}() for ` +
      `more info.`;
  },
  'channel-name-required': () => {
    return `You must provide a channelName to construct a ` +
    `BroadcastCacheUpdate instance.`;
  },
  'invalid-responses-are-same-args': () => {
    return `The arguments passed into responsesAreSame() appear to be ` +
      `invalid. Please ensure valid Responses are used.`;
  },
  'expire-custom-caches-only': () => {
    return `You must provide a 'cacheName' property when using the ` +
      `expiration plugin with a runtime caching strategy.`;
  },
  'unit-must-be-bytes': ({normalizedRangeHeader}) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }
    return `The 'unit' portion of the Range header must be set to 'bytes'. ` +
      `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': ({normalizedRangeHeader}) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }
    return `Multiple ranges are not supported. Please use a  single start ` +
      `value, and optional end value. The Range header provided was ` +
      `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': ({normalizedRangeHeader}) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }
    return `The Range header is missing both start and end values. At least ` +
      `one of those values is needed. The Range header provided was ` +
      `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': ({size, start, end}) => {
    return `The start (${start}) and end (${end}) values in the Range are ` +
      `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': ({url, method}) => {
    return `Unable to cache '${url}' because it is a '${method}' request and ` +
      `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': ({url}) => {
    return `There was an attempt to cache '${url}' but the response was not ` +
      `defined.`;
  },
};
