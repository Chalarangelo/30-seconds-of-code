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

import {logger} from 'workbox-core/_private/logger.mjs';

import {isSupported} from './utils/isSupported.mjs';

import './_version.mjs';

/**
 * If the browser supports Navigation Preload, then this will disable it.
 *
 * @memberof workbox.navigationPreload
 */
function disable() {
  if (isSupported()) {
    self.addEventListener('activate', (event) => {
        event.waitUntil(
          self.registration.navigationPreload.disable().then(() => {
            if (process.env.NODE_ENV !== 'production') {
              logger.log(`Navigation preload is disabled.`);
            }
          })
        );
    });
  } else {
    if (process.env.NODE_ENV !== 'production') {
      logger.log(`Navigation preload is not supported in this browser.`);
    }
  }
}

export {disable};
