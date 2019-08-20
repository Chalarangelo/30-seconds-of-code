"use strict";

const _ = require(`lodash`);
/**
 * Defines how a theme object is merged with the user's config
 */


module.exports = (a, b) => {
  // a and b are gatsby configs, If they have keys, that means there are values to merge
  const allGatsbyConfigKeysWithAValue = _.uniq(Object.keys(a).concat(Object.keys(b))); // reduce the array of mergable keys into a single gatsby config object


  const mergedConfig = allGatsbyConfigKeysWithAValue.reduce((config, gatsbyConfigKey) => {
    // choose a merge function for the config key if there's one defined,
    // otherwise use the default value merge function
    const mergeFn = howToMerge[gatsbyConfigKey] || howToMerge.byDefault;
    return Object.assign({}, config, {
      [gatsbyConfigKey]: mergeFn(a[gatsbyConfigKey], b[gatsbyConfigKey])
    });
  }, {}); // return the fully merged config

  return mergedConfig;
};
/**
 * Normalize plugin spec before comparing so
 *  - `gatsby-plugin-name`
 *  - { resolve: `gatsby-plugin-name` }
 *  - { resolve: `gatsby-plugin-name`, options: {} }
 * are all considered equal
 */


const normalizePluginEntry = entry => _.isString(entry) ? {
  resolve: entry,
  options: {}
} : _.isObject(entry) ? Object.assign({
  options: {}
}, entry) : entry;

const howToMerge = {
  /**
   * pick a truthy value by default.
   * This makes sure that if a single value is defined, that one it used.
   * We prefer the "right" value, because the user's config will be "on the right"
   */
  byDefault: (a, b) => b || a,
  siteMetadata: (objA, objB) => _.merge({}, objA, objB),
  // plugins are concatenated and uniq'd, so we don't get two of the same plugin value
  plugins: (a = [], b = []) => _.uniqWith(a.concat(b), (a, b) => _.isEqual(normalizePluginEntry(a), normalizePluginEntry(b))),
  mapping: (objA, objB) => _.merge({}, objA, objB)
};
//# sourceMappingURL=merge-gatsby-config.js.map