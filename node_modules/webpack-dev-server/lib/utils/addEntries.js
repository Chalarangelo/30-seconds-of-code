'use strict';

const webpack = require('webpack');
const createDomain = require('./createDomain');

/**
 * A Entry, it can be of type string or string[] or Object<string | string[],string>
 * @typedef {(string[] | string | Object<string | string[],string>)} Entry
 */

/**
 * Add entries Method
 * @param {?Object} config - Webpack config
 * @param {?Object} options - Dev-Server options
 * @param {?Object} server
 * @returns {void}
 */
function addEntries(config, options, server) {
  if (options.inline !== false) {
    // we're stubbing the app in this method as it's static and doesn't require
    // a server to be supplied. createDomain requires an app with the
    // address() signature.

    const app = server || {
      address() {
        return { port: options.port };
      },
    };

    /** @type {string} */
    const domain = createDomain(options, app);
    /** @type {string} */
    const sockHost = options.sockHost ? `&sockHost=${options.sockHost}` : '';
    /** @type {string} */
    const sockPath = options.sockPath ? `&sockPath=${options.sockPath}` : '';
    /** @type {string} */
    const sockPort = options.sockPort ? `&sockPort=${options.sockPort}` : '';
    /** @type {string} */
    const clientEntry = `${require.resolve(
      '../../client/'
    )}?${domain}${sockHost}${sockPath}${sockPort}`;

    /** @type {(string[] | string)} */
    let hotEntry;

    if (options.hotOnly) {
      hotEntry = require.resolve('webpack/hot/only-dev-server');
    } else if (options.hot) {
      hotEntry = require.resolve('webpack/hot/dev-server');
    }
    /**
     * prependEntry Method
     * @param {Entry} originalEntry
     * @param {Entry} additionalEntries
     * @returns {Entry}
     */
    const prependEntry = (originalEntry, additionalEntries) => {
      if (typeof originalEntry === 'function') {
        return () =>
          Promise.resolve(originalEntry()).then((entry) =>
            prependEntry(entry, additionalEntries)
          );
      }

      if (typeof originalEntry === 'object' && !Array.isArray(originalEntry)) {
        /** @type {Object<string,string>} */
        const clone = {};

        Object.keys(originalEntry).forEach((key) => {
          // entry[key] should be a string here
          clone[key] = prependEntry(originalEntry[key], additionalEntries);
        });

        return clone;
      }

      // in this case, entry is a string or an array.
      // make sure that we do not add duplicates.
      /** @type {Entry} */
      const entriesClone = additionalEntries.slice(0);
      [].concat(originalEntry).forEach((newEntry) => {
        if (!entriesClone.includes(newEntry)) {
          entriesClone.push(newEntry);
        }
      });
      return entriesClone;
    };

    /**
     *
     * Description of the option for checkInject method
     * @typedef {Function} checkInjectOptionsParam
     * @param {Object} _config - compilerConfig
     * @return {Boolean}
     */

    /**
     *
     * @param {Boolean | checkInjectOptionsParam} option - inject(Hot|Client) it is Boolean | fn => Boolean
     * @param {Object} _config
     * @param {Boolean} defaultValue
     * @return {Boolean}
     */
    // eslint-disable-next-line no-shadow
    const checkInject = (option, _config, defaultValue) => {
      if (typeof option === 'boolean') return option;
      if (typeof option === 'function') return option(_config);
      return defaultValue;
    };

    // eslint-disable-next-line no-shadow
    [].concat(config).forEach((config) => {
      /** @type {Boolean} */
      const webTarget =
        config.target === 'web' ||
        config.target === 'webworker' ||
        config.target === 'electron-renderer' ||
        config.target === 'node-webkit' ||
        config.target == null;
      /** @type {Entry} */
      const additionalEntries = checkInject(
        options.injectClient,
        config,
        webTarget
      )
        ? [clientEntry]
        : [];

      if (hotEntry && checkInject(options.injectHot, config, true)) {
        additionalEntries.push(hotEntry);
      }

      config.entry = prependEntry(config.entry || './src', additionalEntries);

      if (options.hot || options.hotOnly) {
        config.plugins = config.plugins || [];
        if (
          !config.plugins.find(
            // Check for the name rather than the constructor reference in case
            // there are multiple copies of webpack installed
            (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
          )
        ) {
          config.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
      }
    });
  }
}

module.exports = addEntries;
