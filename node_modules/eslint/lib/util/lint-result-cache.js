/**
 * @fileoverview Utility for caching lint results.
 * @author Kevin Partington
 */
"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("assert"),
    fs = require("fs"),
    fileEntryCache = require("file-entry-cache"),
    hash = require("./hash"),
    pkg = require("../../package.json"),
    stringify = require("json-stable-stringify-without-jsonify");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const configHashCache = new WeakMap();

/**
 * Calculates the hash of the config file used to validate a given file
 * @param {Object} configHelper The config helper for retrieving configuration information
 * @param {string} filename The path of the file to retrieve a config object for to calculate the hash
 * @returns {string} The hash of the config
 */
function hashOfConfigFor(configHelper, filename) {
    const config = configHelper.getConfig(filename);

    if (!configHashCache.has(config)) {
        configHashCache.set(config, hash(`${pkg.version}_${stringify(config)}`));
    }

    return configHashCache.get(config);
}

//-----------------------------------------------------------------------------
// Public Interface
//-----------------------------------------------------------------------------

/**
 * Lint result cache. This wraps around the file-entry-cache module,
 * transparently removing properties that are difficult or expensive to
 * serialize and adding them back in on retrieval.
 */
class LintResultCache {

    /**
     * Creates a new LintResultCache instance.
     * @constructor
     * @param {string} cacheFileLocation The cache file location.
     * @param {Object} configHelper The configuration helper (used for
     *   configuration lookup by file path).
     */
    constructor(cacheFileLocation, configHelper) {
        assert(cacheFileLocation, "Cache file location is required");
        assert(configHelper, "Config helper is required");

        this.fileEntryCache = fileEntryCache.create(cacheFileLocation);
        this.configHelper = configHelper;
    }

    /**
     * Retrieve cached lint results for a given file path, if present in the
     * cache. If the file is present and has not been changed, rebuild any
     * missing result information.
     * @param {string} filePath The file for which to retrieve lint results.
     * @returns {Object|null} The rebuilt lint results, or null if the file is
     *   changed or not in the filesystem.
     */
    getCachedLintResults(filePath) {

        /*
         * Cached lint results are valid if and only if:
         * 1. The file is present in the filesystem
         * 2. The file has not changed since the time it was previously linted
         * 3. The ESLint configuration has not changed since the time the file
         *    was previously linted
         * If any of these are not true, we will not reuse the lint results.
         */

        const fileDescriptor = this.fileEntryCache.getFileDescriptor(filePath);
        const hashOfConfig = hashOfConfigFor(this.configHelper, filePath);
        const changed = fileDescriptor.changed || fileDescriptor.meta.hashOfConfig !== hashOfConfig;

        if (fileDescriptor.notFound || changed) {
            return null;
        }

        // If source is present but null, need to reread the file from the filesystem.
        if (fileDescriptor.meta.results && fileDescriptor.meta.results.source === null) {
            fileDescriptor.meta.results.source = fs.readFileSync(filePath, "utf-8");
        }

        return fileDescriptor.meta.results;
    }

    /**
     * Set the cached lint results for a given file path, after removing any
     * information that will be both unnecessary and difficult to serialize.
     * Avoids caching results with an "output" property (meaning fixes were
     * applied), to prevent potentially incorrect results if fixes are not
     * written to disk.
     * @param {string} filePath The file for which to set lint results.
     * @param {Object} result The lint result to be set for the file.
     * @returns {void}
     */
    setCachedLintResults(filePath, result) {
        if (result && Object.prototype.hasOwnProperty.call(result, "output")) {
            return;
        }

        const fileDescriptor = this.fileEntryCache.getFileDescriptor(filePath);

        if (fileDescriptor && !fileDescriptor.notFound) {

            // Serialize the result, except that we want to remove the file source if present.
            const resultToSerialize = Object.assign({}, result);

            /*
             * Set result.source to null.
             * In `getCachedLintResults`, if source is explicitly null, we will
             * read the file from the filesystem to set the value again.
             */
            if (Object.prototype.hasOwnProperty.call(resultToSerialize, "source")) {
                resultToSerialize.source = null;
            }

            fileDescriptor.meta.results = resultToSerialize;
            fileDescriptor.meta.hashOfConfig = hashOfConfigFor(this.configHelper, result.filePath);
        }
    }

    /**
     * Persists the in-memory cache to disk.
     * @returns {void}
     */
    reconcile() {
        this.fileEntryCache.reconcile();
    }
}

module.exports = LintResultCache;
