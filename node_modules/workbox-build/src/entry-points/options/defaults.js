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

module.exports = {
  clientsClaim: false,
  globFollow: true,
  globIgnores: ['**/node_modules/**/*'],
  globPatterns: ['**/*.{js,css,html}'],
  globStrict: true,
  importWorkboxFrom: 'cdn',
  injectionPointRegexp: /(\.precacheAndRoute\()\s*\[\s*\]\s*(\)|,)/,
  maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
  navigateFallback: undefined,
  offlineGoogleAnalytics: false,
  purgeOnQuotaError: false,
  skipWaiting: false,
};
