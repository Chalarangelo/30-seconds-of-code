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

import '../_version.mjs';

const CDN_PATH = `WORKBOX_CDN_ROOT_URL`;

const MODULE_KEY_TO_NAME_MAPPING = {
  backgroundSync: 'background-sync',
  broadcastUpdate: 'broadcast-cache-update',
  cacheableResponse: 'cacheable-response',
  core: 'core',
  expiration: 'cache-expiration',
  googleAnalytics: 'google-analytics',
  navigationPreload: 'navigation-preload',
  precaching: 'precaching',
  rangeRequests: 'range-requests',
  routing: 'routing',
  strategies: 'strategies',
  streams: 'streams',
};

/**
 * This class can be used to make it easy to use the various parts of
 * Workbox.
 *
 * @private
 */
class WorkboxSW {
  /**
   * Creates a proxy that automatically loads workbox namespaces on demand.
   *
   * @private
   */
  constructor() {
    this.v = {};
    this._options = {
      debug: self.location.hostname === 'localhost',
      modulePathPrefix: null,
      modulePathCb: null,
    };

    this._env = this._options.debug ? 'dev' : 'prod';
    this._modulesLoaded = false;

    return new Proxy(this, {
      get(target, key) {
        if (target[key]) {
          return target[key];
        }

        const moduleName = MODULE_KEY_TO_NAME_MAPPING[key];
        if (moduleName) {
          target.loadModule(`workbox-${moduleName}`);
        }

        return target[key];
      },
    });
  }

  /**
   * Updates the configuration options. You can specify whether to treat as a
   * debug build and whether to use a CDN or a specific path when importing
   * other workbox-modules
   *
   * @param {Object} [options]
   * @param {boolean} [options.debug] If true, `dev` builds are using, otherwise
   * `prod` builds are used. By default, `prod` is used unless on localhost.
   * @param {Function} [options.modulePathPrefix] To avoid using the CDN with
   * `workbox-sw` set the path prefix of where modules should be loaded from.
   * For example `modulePathPrefix: '/third_party/workbox/v3.0.0/'`.
   * @param {workbox~ModulePathCallback} [options.modulePathCb] If defined,
   * this callback will be responsible for determining the path of each
   * workbox module.
   *
   * @alias workbox.setConfig
   */
  setConfig(options = {}) {
    if (!this._modulesLoaded) {
      Object.assign(this._options, options);
      this._env = this._options.debug ? 'dev' : 'prod';
    } else {
      throw new Error('Config must be set before accessing workbox.* modules');
    }
  }

  /**
   * Force a service worker to become active, instead of waiting. This is
   * normally used in conjunction with `clientsClaim()`.
   *
   * @alias workbox.skipWaiting
   */
  skipWaiting() {
    self.addEventListener('install', () => self.skipWaiting());
  }

  /**
   * Claim any currently available clients once the service worker
   * becomes active. This is normally used in conjunction with `skipWaiting()`.
   *
   * @alias workbox.clientsClaim
   */
  clientsClaim() {
    self.addEventListener('activate', () => self.clients.claim());
  }

  /**
   * Load a Workbox module by passing in the appropriate module name.
   *
   * This is not generally needed unless you know there are modules that are
   * dynamically used and you want to safe guard use of the module while the
   * user may be offline.
   *
   * @param {string} moduleName
   *
   * @alias workbox.loadModule
   */
  loadModule(moduleName) {
    const modulePath = this._getImportPath(moduleName);
    try {
      importScripts(modulePath);
      this._modulesLoaded = true;
    } catch (err) {
      // TODO Add context of this error if using the CDN vs the local file.

      // We can't rely on workbox-core being loaded so using console
      // eslint-disable-next-line
      console.error(
        `Unable to import module '${moduleName}' from '${modulePath}'.`);
      throw err;
    }
  }

  /**
   * This method will get the path / CDN URL to be used for importScript calls.
   *
   * @param {string} moduleName
   * @return {string} URL to the desired module.
   *
   * @private
   */
  _getImportPath(moduleName) {
    if (this._options.modulePathCb) {
      return this._options.modulePathCb(moduleName, this._options.debug);
    }

    // TODO: This needs to be dynamic some how.
    let pathParts = [CDN_PATH];

    const fileName = `${moduleName}.${this._env}.js`;

    const pathPrefix = this._options.modulePathPrefix;
    if (pathPrefix) {
      // Split to avoid issues with developers ending / not ending with slash
      pathParts = pathPrefix.split('/');

      // We don't need a slash at the end as we will be adding
      // a filename regardless
      if (pathParts[pathParts.length - 1] === '') {
        pathParts.splice(pathParts.length - 1, 1);
      }
    }

    pathParts.push(fileName);

    return pathParts.join('/');
  }
}

export default WorkboxSW;
