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
 * If the browser supports Navigation Preload, then this will enable it.
 *
 * @param {string} [headerValue] Optionally, allows developers to
 * [override](https://developers.google.com/web/updates/2017/02/navigation-preload#changing_the_header)
 * the value of the `Service-Worker-Navigation-Preload` header which will be
 * sent to the server when making the navigation request.
 *
 * @memberof workbox.navigationPreload
 */
function enable(headerValue) {
  if (isSupported()) {
    self.addEventListener('activate', (event) => {
        event.waitUntil(
          self.registration.navigationPreload.enable().then(() => {
            // Defaults to Service-Worker-Navigation-Preload: true if not set.
            if (headerValue) {
              self.registration.navigationPreload.setHeaderValue(headerValue);
            }

            if (process.env.NODE_ENV !== 'production') {
              logger.log(`Navigation preload is enabled.`);
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

export {enable};
