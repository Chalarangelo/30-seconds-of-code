/**
 * @fileoverview Config file operations. This file must be usable in the browser,
 * so no Node-specific code can be here.
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const minimatch = require("minimatch"),
    path = require("path");

const debug = require("debug")("eslint:config-ops");

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

const RULE_SEVERITY_STRINGS = ["off", "warn", "error"],
    RULE_SEVERITY = RULE_SEVERITY_STRINGS.reduce((map, value, index) => {
        map[value] = index;
        return map;
    }, {}),
    VALID_SEVERITIES = [0, 1, 2, "off", "warn", "error"];

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {

    /**
     * Creates an empty configuration object suitable for merging as a base.
     * @returns {Object} A configuration object.
     */
    createEmptyConfig() {
        return {
            globals: {},
            env: {},
            rules: {},
            parserOptions: {}
        };
    },

    /**
     * Creates an environment config based on the specified environments.
     * @param {Object<string,boolean>} env The environment settings.
     * @param {Environments} envContext The environment context.
     * @returns {Object} A configuration object with the appropriate rules and globals
     *      set.
     */
    createEnvironmentConfig(env, envContext) {

        const envConfig = this.createEmptyConfig();

        if (env) {

            envConfig.env = env;

            Object.keys(env).filter(name => env[name]).forEach(name => {
                const environment = envContext.get(name);

                if (environment) {
                    debug(`Creating config for environment ${name}`);
                    if (environment.globals) {
                        Object.assign(envConfig.globals, environment.globals);
                    }

                    if (environment.parserOptions) {
                        Object.assign(envConfig.parserOptions, environment.parserOptions);
                    }
                }
            });
        }

        return envConfig;
    },

    /**
     * Given a config with environment settings, applies the globals and
     * ecmaFeatures to the configuration and returns the result.
     * @param {Object} config The configuration information.
     * @param {Environments} envContent env context.
     * @returns {Object} The updated configuration information.
     */
    applyEnvironments(config, envContent) {
        if (config.env && typeof config.env === "object") {
            debug("Apply environment settings to config");
            return this.merge(this.createEnvironmentConfig(config.env, envContent), config);
        }

        return config;
    },

    /**
     * Merges two config objects. This will not only add missing keys, but will also modify values to match.
     * @param {Object} target config object
     * @param {Object} src config object. Overrides in this config object will take priority over base.
     * @param {boolean} [combine] Whether to combine arrays or not
     * @param {boolean} [isRule] Whether its a rule
     * @returns {Object} merged config object.
     */
    merge: function deepmerge(target, src, combine, isRule) {

        /*
         * The MIT License (MIT)
         *
         * Copyright (c) 2012 Nicholas Fisher
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /*
         * This code is taken from deepmerge repo
         * (https://github.com/KyleAMathews/deepmerge)
         * and modified to meet our needs.
         */
        const array = Array.isArray(src) || Array.isArray(target);
        let dst = array && [] || {};

        if (array) {
            const resolvedTarget = target || [];

            // src could be a string, so check for array
            if (isRule && Array.isArray(src) && src.length > 1) {
                dst = dst.concat(src);
            } else {
                dst = dst.concat(resolvedTarget);
            }
            const resolvedSrc = typeof src === "object" ? src : [src];

            Object.keys(resolvedSrc).forEach((_, i) => {
                const e = resolvedSrc[i];

                if (typeof dst[i] === "undefined") {
                    dst[i] = e;
                } else if (typeof e === "object") {
                    if (isRule) {
                        dst[i] = e;
                    } else {
                        dst[i] = deepmerge(resolvedTarget[i], e, combine, isRule);
                    }
                } else {
                    if (!combine) {
                        dst[i] = e;
                    } else {
                        if (dst.indexOf(e) === -1) {
                            dst.push(e);
                        }
                    }
                }
            });
        } else {
            if (target && typeof target === "object") {
                Object.keys(target).forEach(key => {
                    dst[key] = target[key];
                });
            }
            Object.keys(src).forEach(key => {
                if (key === "overrides") {
                    dst[key] = (target[key] || []).concat(src[key] || []);
                } else if (Array.isArray(src[key]) || Array.isArray(target[key])) {
                    dst[key] = deepmerge(target[key], src[key], key === "plugins" || key === "extends", isRule);
                } else if (typeof src[key] !== "object" || !src[key] || key === "exported" || key === "astGlobals") {
                    dst[key] = src[key];
                } else {
                    dst[key] = deepmerge(target[key] || {}, src[key], combine, key === "rules");
                }
            });
        }

        return dst;
    },

    /**
     * Normalizes the severity value of a rule's configuration to a number
     * @param {(number|string|[number, ...*]|[string, ...*])} ruleConfig A rule's configuration value, generally
     * received from the user. A valid config value is either 0, 1, 2, the string "off" (treated the same as 0),
     * the string "warn" (treated the same as 1), the string "error" (treated the same as 2), or an array
     * whose first element is one of the above values. Strings are matched case-insensitively.
     * @returns {(0|1|2)} The numeric severity value if the config value was valid, otherwise 0.
     */
    getRuleSeverity(ruleConfig) {
        const severityValue = Array.isArray(ruleConfig) ? ruleConfig[0] : ruleConfig;

        if (severityValue === 0 || severityValue === 1 || severityValue === 2) {
            return severityValue;
        }

        if (typeof severityValue === "string") {
            return RULE_SEVERITY[severityValue.toLowerCase()] || 0;
        }

        return 0;
    },

    /**
     * Converts old-style severity settings (0, 1, 2) into new-style
     * severity settings (off, warn, error) for all rules. Assumption is that severity
     * values have already been validated as correct.
     * @param {Object} config The config object to normalize.
     * @returns {void}
     */
    normalizeToStrings(config) {

        if (config.rules) {
            Object.keys(config.rules).forEach(ruleId => {
                const ruleConfig = config.rules[ruleId];

                if (typeof ruleConfig === "number") {
                    config.rules[ruleId] = RULE_SEVERITY_STRINGS[ruleConfig] || RULE_SEVERITY_STRINGS[0];
                } else if (Array.isArray(ruleConfig) && typeof ruleConfig[0] === "number") {
                    ruleConfig[0] = RULE_SEVERITY_STRINGS[ruleConfig[0]] || RULE_SEVERITY_STRINGS[0];
                }
            });
        }
    },

    /**
     * Determines if the severity for the given rule configuration represents an error.
     * @param {int|string|Array} ruleConfig The configuration for an individual rule.
     * @returns {boolean} True if the rule represents an error, false if not.
     */
    isErrorSeverity(ruleConfig) {
        return module.exports.getRuleSeverity(ruleConfig) === 2;
    },

    /**
     * Checks whether a given config has valid severity or not.
     * @param {number|string|Array} ruleConfig - The configuration for an individual rule.
     * @returns {boolean} `true` if the configuration has valid severity.
     */
    isValidSeverity(ruleConfig) {
        let severity = Array.isArray(ruleConfig) ? ruleConfig[0] : ruleConfig;

        if (typeof severity === "string") {
            severity = severity.toLowerCase();
        }
        return VALID_SEVERITIES.indexOf(severity) !== -1;
    },

    /**
     * Checks whether every rule of a given config has valid severity or not.
     * @param {Object} config - The configuration for rules.
     * @returns {boolean} `true` if the configuration has valid severity.
     */
    isEverySeverityValid(config) {
        return Object.keys(config).every(ruleId => this.isValidSeverity(config[ruleId]));
    },

    /**
     * Merges all configurations in a given config vector. A vector is an array of objects, each containing a config
     * file path and a list of subconfig indices that match the current file path. All config data is assumed to be
     * cached.
     * @param {Array<Object>} vector list of config files and their subconfig indices that match the current file path
     * @param {Object} configCache the config cache
     * @returns {Object} config object
     */
    getConfigFromVector(vector, configCache) {

        const cachedConfig = configCache.getMergedVectorConfig(vector);

        if (cachedConfig) {
            return cachedConfig;
        }

        debug("Using config from partial cache");

        const subvector = Array.from(vector);
        let nearestCacheIndex = subvector.length - 1,
            partialCachedConfig;

        while (nearestCacheIndex >= 0) {
            partialCachedConfig = configCache.getMergedVectorConfig(subvector);
            if (partialCachedConfig) {
                break;
            }
            subvector.pop();
            nearestCacheIndex--;
        }

        if (!partialCachedConfig) {
            partialCachedConfig = {};
        }

        let finalConfig = partialCachedConfig;

        // Start from entry immediately following nearest cached config (first uncached entry)
        for (let i = nearestCacheIndex + 1; i < vector.length; i++) {
            finalConfig = this.mergeVectorEntry(finalConfig, vector[i], configCache);
            configCache.setMergedVectorConfig(vector.slice(0, i + 1), finalConfig);
        }

        return finalConfig;
    },

    /**
     * Merges the config options from a single vector entry into the supplied config.
     * @param {Object} config the base config to merge the vector entry's options into
     * @param {Object} vectorEntry a single entry from a vector, consisting of a config file path and an array of
     * matching override indices
     * @param {Object} configCache the config cache
     * @returns {Object} merged config object
     */
    mergeVectorEntry(config, vectorEntry, configCache) {
        const vectorEntryConfig = Object.assign({}, configCache.getConfig(vectorEntry.filePath));
        let mergedConfig = Object.assign({}, config),
            overrides;

        if (vectorEntryConfig.overrides) {
            overrides = vectorEntryConfig.overrides.filter(
                (override, overrideIndex) => vectorEntry.matchingOverrides.indexOf(overrideIndex) !== -1
            );
        } else {
            overrides = [];
        }

        mergedConfig = this.merge(mergedConfig, vectorEntryConfig);

        delete mergedConfig.overrides;

        mergedConfig = overrides.reduce((lastConfig, override) => this.merge(lastConfig, override), mergedConfig);

        if (mergedConfig.filePath) {
            delete mergedConfig.filePath;
            delete mergedConfig.baseDirectory;
        } else if (mergedConfig.files) {
            delete mergedConfig.files;
        }

        return mergedConfig;
    },

    /**
     * Checks that the specified file path matches all of the supplied glob patterns.
     * @param {string} filePath The file path to test patterns against
     * @param {string|string[]} patterns One or more glob patterns, of which at least one should match the file path
     * @param {string|string[]} [excludedPatterns] One or more glob patterns, of which none should match the file path
     * @returns {boolean} True if all the supplied patterns match the file path, false otherwise
     */
    pathMatchesGlobs(filePath, patterns, excludedPatterns) {
        const patternList = [].concat(patterns);
        const excludedPatternList = [].concat(excludedPatterns || []);

        patternList.concat(excludedPatternList).forEach(pattern => {
            if (path.isAbsolute(pattern) || pattern.includes("..")) {
                throw new Error(`Invalid override pattern (expected relative path not containing '..'): ${pattern}`);
            }
        });

        const opts = { matchBase: true };

        return patternList.some(pattern => minimatch(filePath, pattern, opts)) &&
            !excludedPatternList.some(excludedPattern => minimatch(filePath, excludedPattern, opts));
    },

    /**
     * Normalizes a value for a global in a config
     * @param {(boolean|string|null)} configuredValue The value given for a global in configuration or in
     * a global directive comment
     * @returns {("readable"|"writeable"|"off")} The value normalized as a string
     */
    normalizeConfigGlobal(configuredValue) {
        switch (configuredValue) {
            case "off":
                return "off";

            case true:
            case "true":
            case "writeable":
            case "writable":
                return "writeable";

            case null:
            case false:
            case "false":
            case "readable":
            case "readonly":
                return "readable";

            // Fallback to minimize compatibility impact
            default:
                return "writeable";
        }
    }
};
