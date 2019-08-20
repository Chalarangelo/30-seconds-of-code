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

import LOG_LEVELS from './models/LogLevels.mjs';
import {WorkboxError} from './_private/WorkboxError.mjs';
import {cacheNames} from './_private/cacheNames.mjs';
import {logger} from './_private/logger.mjs';
import {assert} from './_private/assert.mjs';
import {checkSWFileCacheHeaders} from './_private/checkSWFileCacheHeaders.mjs';
import {setLoggerLevel, getLoggerLevel} from './_private/logger.mjs';
import './_version.mjs';

/**
 * This class is never exposed publicly. Inidividual methods are exposed
 * using jsdoc alias commands.
 *
 * @memberof workbox.core
 * @private
 */
class WorkboxCore {
  /**
   * You should not instantiate this object directly.
   *
   * @private
   */
  constructor() {
    // Give our version strings something to hang off of.
    try {
      self.workbox.v = self.workbox.v || {};
    } catch (err) {
      // NOOP
    }

    // A WorkboxCore instance must be exported before we can use the logger.
    // This is so it can get the current log level.
    if (process.env.NODE_ENV !== 'production') {
      const padding = '   ';
      logger.groupCollapsed('Welcome to Workbox!');
      logger.unprefixed.log(`You are currently using a development build. ` +
        `By default this will switch to prod builds when not on localhost. ` +
        `You can force this with workbox.setConfig({debug: true|false}).`);
      logger.unprefixed.log(
        `📖 Read the guides and documentation\n` +
        `${padding}https://developers.google.com/web/tools/workbox/`
      );
      logger.unprefixed.log(
        `❓ Use the [workbox] tag on Stack Overflow to ask questions\n` +
        `${padding}https://stackoverflow.com/questions/ask?tags=workbox`
      );
      logger.unprefixed.log(
        `🐛 Found a bug? Report it on GitHub\n` +
        `${padding}https://github.com/GoogleChrome/workbox/issues/new`
      );
      logger.groupEnd();

      if (typeof checkSWFileCacheHeaders === 'function') {
        checkSWFileCacheHeaders();
      }
    }
  }

  /**
   * Get the current cache names used by Workbox.
   *
   * `cacheNames.precache` is used for precached assets,
   * `cacheNames.googleAnalytics` is used by `workbox-google-analytics` to
   * store `analytics.js`,
   * and `cacheNames.runtime` is used for everything else.
   *
   * @return {Object} An object with `precache` and `runtime` cache names.
   *
   * @alias workbox.core.cacheNames
   */
  get cacheNames() {
    return {
      googleAnalytics: cacheNames.getGoogleAnalyticsName(),
      precache: cacheNames.getPrecacheName(),
      runtime: cacheNames.getRuntimeName(),
    };
  }

  /**
   * You can alter the default cache names used by the Workbox modules by
   * changing the cache name details.
   *
   * Cache names are generated as `<prefix>-<Cache Name>-<suffix>`.
   *
   * @param {Object} details
   * @param {Object} details.prefix The string to add to the beginning of
   * the precache and runtime cache names.
   * @param {Object} details.suffix The string to add to the end of
   * the precache and runtime cache names.
   * @param {Object} details.precache The cache name to use for precache
   * caching.
   * @param {Object} details.runtime The cache name to use for runtime caching.
   * @param {Object} details.googleAnalytics The cache name to use for
   * `workbox-google-analytics` caching.
   *
   * @alias workbox.core.setCacheNameDetails
   */
  setCacheNameDetails(details) {
    if (process.env.NODE_ENV !== 'production') {
      Object.keys(details).forEach((key) => {
        assert.isType(details[key], 'string', {
          moduleName: 'workbox-core',
          className: 'WorkboxCore',
          funcName: 'setCacheNameDetails',
          paramName: `details.${key}`,
        });
      });

      if ('precache' in details && details.precache.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'precache',
          value: details.precache,
        });
      }

      if ('runtime' in details && details.runtime.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'runtime',
          value: details.runtime,
        });
      }

      if ('googleAnalytics' in details &&
        details.googleAnalytics.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'googleAnalytics',
          value: details.googleAnalytics,
        });
      }
    }

    cacheNames.updateDetails(details);
  }

  /**
   * Get the current log level.
   *
   * @return {number}.
   *
   * @alias workbox.core.logLevel
   */
  get logLevel() {
    return getLoggerLevel();
  }

  /**
   * Set the current log level passing in one of the values from
   * [LOG_LEVELS]{@link module:workbox-core.LOG_LEVELS}.
   *
   * @param {number} newLevel The new log level to use.
   *
   * @alias workbox.core.setLogLevel
   */
  setLogLevel(newLevel) {
    if (process.env.NODE_ENV !== 'production') {
      assert.isType(newLevel, 'number', {
        moduleName: 'workbox-core',
        className: 'WorkboxCore',
        funcName: 'logLevel [setter]',
        paramName: `logLevel`,
      });
    }

    if (newLevel > LOG_LEVELS.silent ||
      newLevel < LOG_LEVELS.debug) {
      throw new WorkboxError('invalid-value', {
        paramName: 'logLevel',
        validValueDescription: `Please use a value from LOG_LEVELS, i.e ` +
          `'logLevel = workbox.core.LOG_LEVELS.debug'.`,
        value: newLevel,
      });
    }

    setLoggerLevel(newLevel);
  }
}

export default new WorkboxCore();
