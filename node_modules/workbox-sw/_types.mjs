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

import './_version.mjs';

/**
 * A `ModulePathCallback` function can be used to modify the modify the where
 * Workbox modules are loaded.
 *
 * @callback ~ModulePathCallback
 * @param {string} moduleName The name of the module to load (i.e.
 * 'workbox-core', 'workbox-precaching' etc.).
 * @param {boolean} debug When true, `dev` builds should be loaded, otherwise
 * load `prod` builds.
 * @return {string} This callback should return a path of module. This will
 * be passed to `importScripts()`.
 *
 * @memberof workbox
 */
