/**
 * @fileoverview Responsible for caching config files
 * @author Sylvan Mably
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Get a string hash for a config vector
 * @param {Array<Object>} vector config vector to hash
 * @returns {string} hash of the vector values
 * @private
 */
function hash(vector) {
    return JSON.stringify(vector);
}

//------------------------------------------------------------------------------
// API
//------------------------------------------------------------------------------

/**
 * Configuration caching class
 */
module.exports = class ConfigCache {

    constructor() {
        this.configFullNameCache = new Map();
        this.localHierarchyCache = new Map();
        this.mergedVectorCache = new Map();
        this.mergedCache = new Map();
    }

    /**
     * Gets a config object from the cache for the specified config file path.
     * @param {string} configFullName the name of the configuration as used in the eslint config(e.g. 'plugin:node/recommended'),
     * or the absolute path to a config file. This should uniquely identify a config.
     * @returns {Object|null} config object, if found in the cache, otherwise null
     * @private
     */
    getConfig(configFullName) {
        return this.configFullNameCache.get(configFullName);
    }

    /**
     * Sets a config object in the cache for the specified config file path.
     * @param {string} configFullName the name of the configuration as used in the eslint config(e.g. 'plugin:node/recommended'),
     * or the absolute path to a config file. This should uniquely identify a config.
     * @param {Object} config the config object to add to the cache
     * @returns {void}
     * @private
     */
    setConfig(configFullName, config) {
        this.configFullNameCache.set(configFullName, config);
    }

    /**
     * Gets a list of hierarchy-local config objects that apply to the specified directory.
     * @param {string} directory the path to the directory
     * @returns {Object[]|null} a list of config objects, if found in the cache, otherwise null
     * @private
     */
    getHierarchyLocalConfigs(directory) {
        return this.localHierarchyCache.get(directory);
    }

    /**
     * For each of the supplied parent directories, sets the list of config objects for that directory to the
     * appropriate subset of the supplied parent config objects.
     * @param {string[]} parentDirectories a list of parent directories to add to the config cache
     * @param {Object[]} parentConfigs a list of config objects that apply to the lowest directory in parentDirectories
     * @returns {void}
     * @private
     */
    setHierarchyLocalConfigs(parentDirectories, parentConfigs) {
        parentDirectories.forEach((localConfigDirectory, i) => {
            const directoryParentConfigs = parentConfigs.slice(0, parentConfigs.length - i);

            this.localHierarchyCache.set(localConfigDirectory, directoryParentConfigs);
        });
    }

    /**
     * Gets a merged config object corresponding to the supplied vector.
     * @param {Array<Object>} vector the vector to find a merged config for
     * @returns {Object|null} a merged config object, if found in the cache, otherwise null
     * @private
     */
    getMergedVectorConfig(vector) {
        return this.mergedVectorCache.get(hash(vector));
    }

    /**
     * Sets a merged config object in the cache for the supplied vector.
     * @param {Array<Object>} vector the vector to save a merged config for
     * @param {Object} config the merged config object to add to the cache
     * @returns {void}
     * @private
     */
    setMergedVectorConfig(vector, config) {
        this.mergedVectorCache.set(hash(vector), config);
    }

    /**
     * Gets a merged config object corresponding to the supplied vector, including configuration options from outside
     * the vector.
     * @param {Array<Object>} vector the vector to find a merged config for
     * @returns {Object|null} a merged config object, if found in the cache, otherwise null
     * @private
     */
    getMergedConfig(vector) {
        return this.mergedCache.get(hash(vector));
    }

    /**
     * Sets a merged config object in the cache for the supplied vector, including configuration options from outside
     * the vector.
     * @param {Array<Object>} vector the vector to save a merged config for
     * @param {Object} config the merged config object to add to the cache
     * @returns {void}
     * @private
     */
    setMergedConfig(vector, config) {
        this.mergedCache.set(hash(vector), config);
    }
};
