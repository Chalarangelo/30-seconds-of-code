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

import {logger} from './logger.mjs';
import {assert} from './assert.mjs';

import '../_version.mjs';

const callbacks = new Set();

/**
 * Adds a function to the set of callbacks that will be executed when there's
 * a quota error.
 *
 * @param {Function} callback
 * @memberof workbox.core
 */
function registerQuotaErrorCallback(callback) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isType(callback, 'function', {
      moduleName: 'workbox-core',
      funcName: 'register',
      paramName: 'callback',
    });
  }

  callbacks.add(callback);

  if (process.env.NODE_ENV !== 'production') {
    logger.log('Registered a callback to respond to quota errors.', callback);
  }
}

/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox.core
 * @private
 */
async function executeQuotaErrorCallbacks() {
  if (process.env.NODE_ENV !== 'production') {
    logger.log(`About to run ${callbacks.size} callbacks to clean up caches.`);
  }

  for (const callback of callbacks) {
    await callback();
    if (process.env.NODE_ENV !== 'production') {
      logger.log(callback, 'is complete.');
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    logger.log('Finished running callbacks.');
  }
}

export {
  executeQuotaErrorCallbacks,
  registerQuotaErrorCallback,
};
