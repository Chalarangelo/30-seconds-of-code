/**
 * @fileoverview Main CLI object.
 * @author Nicholas C. Zakas
 */

"use strict";

/*
 * The CLI object should *not* call process.exit() directly. It should only return
 * exit codes. This allows other programs to use the CLI object and still control
 * when the program exits.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs"),
    path = require("path"),
    defaultOptions = require("../conf/default-cli-options"),
    Linter = require("./linter"),
    lodash = require("lodash"),
    IgnoredPaths = require("./util/ignored-paths"),
    Config = require("./config"),
    ConfigOps = require("./config/config-ops"),
    LintResultCache = require("./util/lint-result-cache"),
    globUtils = require("./util/glob-utils"),
    validator = require("./config/config-validator"),
    hash = require("./util/hash"),
    ModuleResolver = require("./util/module-resolver"),
    naming = require("./util/naming"),
    pkg = require("../package.json"),
    loadRules = require("./load-rules");

const debug = require("debug")("eslint:cli-engine");
const resolver = new ModuleResolver();
const validFixTypes = new Set(["problem", "suggestion", "layout"]);

//------------------------------------------------------------------------------
// Typedefs
//------------------------------------------------------------------------------

/**
 * The options to configure a CLI engine with.
 * @typedef {Object} CLIEngineOptions
 * @property {boolean} allowInlineConfig Enable or disable inline configuration comments.
 * @property {Object} baseConfig Base config object, extended by all configs used with this CLIEngine instance
 * @property {boolean} cache Enable result caching.
 * @property {string} cacheLocation The cache file to use instead of .eslintcache.
 * @property {string} configFile The configuration file to use.
 * @property {string} cwd The value to use for the current working directory.
 * @property {string[]} envs An array of environments to load.
 * @property {string[]} extensions An array of file extensions to check.
 * @property {boolean|Function} fix Execute in autofix mode. If a function, should return a boolean.
 * @property {string[]} fixTypes Array of rule types to apply fixes for.
 * @property {string[]} globals An array of global variables to declare.
 * @property {boolean} ignore False disables use of .eslintignore.
 * @property {string} ignorePath The ignore file to use instead of .eslintignore.
 * @property {string} ignorePattern A glob pattern of files to ignore.
 * @property {boolean} useEslintrc False disables looking for .eslintrc
 * @property {string} parser The name of the parser to use.
 * @property {Object} parserOptions An object of parserOption settings to use.
 * @property {string[]} plugins An array of plugins to load.
 * @property {Object<string,*>} rules An object of rules to use.
 * @property {string[]} rulePaths An array of directories to load custom rules from.
 * @property {boolean} reportUnusedDisableDirectives `true` adds reports for unused eslint-disable directives
 */

/**
 * A linting warning or error.
 * @typedef {Object} LintMessage
 * @property {string} message The message to display to the user.
 */

/**
 * A linting result.
 * @typedef {Object} LintResult
 * @property {string} filePath The path to the file that was linted.
 * @property {LintMessage[]} messages All of the messages for the result.
 * @property {number} errorCount Number of errors for the result.
 * @property {number} warningCount Number of warnings for the result.
 * @property {number} fixableErrorCount Number of fixable errors for the result.
 * @property {number} fixableWarningCount Number of fixable warnings for the result.
 * @property {string=} [source] The source code of the file that was linted.
 * @property {string=} [output] The source code of the file that was linted, with as many fixes applied as possible.
 */

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determines if each fix type in an array is supported by ESLint and throws
 * an error if not.
 * @param {string[]} fixTypes An array of fix types to check.
 * @returns {void}
 * @throws {Error} If an invalid fix type is found.
 */
function validateFixTypes(fixTypes) {
    for (const fixType of fixTypes) {
        if (!validFixTypes.has(fixType)) {
            throw new Error(`Invalid fix type "${fixType}" found.`);
        }
    }
}

/**
 * It will calculate the error and warning count for collection of messages per file
 * @param {Object[]} messages - Collection of messages
 * @returns {Object} Contains the stats
 * @private
 */
function calculateStatsPerFile(messages) {
    return messages.reduce((stat, message) => {
        if (message.fatal || message.severity === 2) {
            stat.errorCount++;
            if (message.fix) {
                stat.fixableErrorCount++;
            }
        } else {
            stat.warningCount++;
            if (message.fix) {
                stat.fixableWarningCount++;
            }
        }
        return stat;
    }, {
        errorCount: 0,
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0
    });
}

/**
 * It will calculate the error and warning count for collection of results from all files
 * @param {Object[]} results - Collection of messages from all the files
 * @returns {Object} Contains the stats
 * @private
 */
function calculateStatsPerRun(results) {
    return results.reduce((stat, result) => {
        stat.errorCount += result.errorCount;
        stat.warningCount += result.warningCount;
        stat.fixableErrorCount += result.fixableErrorCount;
        stat.fixableWarningCount += result.fixableWarningCount;
        return stat;
    }, {
        errorCount: 0,
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0
    });
}

/**
 * Processes an source code using ESLint.
 * @param {string} text The source code to check.
 * @param {Object} configHelper The configuration options for ESLint.
 * @param {string} filename An optional string representing the texts filename.
 * @param {boolean|Function} fix Indicates if fixes should be processed.
 * @param {boolean} allowInlineConfig Allow/ignore comments that change config.
 * @param {boolean} reportUnusedDisableDirectives Allow/ignore comments that change config.
 * @param {Linter} linter Linter context
 * @returns {{rules: LintResult, config: Object}} The results for linting on this text and the fully-resolved config for it.
 * @private
 */
function processText(text, configHelper, filename, fix, allowInlineConfig, reportUnusedDisableDirectives, linter) {
    let filePath,
        fileExtension,
        processor;

    if (filename) {
        filePath = path.resolve(filename);
        fileExtension = path.extname(filename);
    }

    const effectiveFilename = filename || "<text>";

    debug(`Linting ${effectiveFilename}`);
    const config = configHelper.getConfig(filePath);

    if (config.plugins) {
        configHelper.plugins.loadAll(config.plugins);
    }

    const loadedPlugins = configHelper.plugins.getAll();

    for (const plugin in loadedPlugins) {
        if (loadedPlugins[plugin].processors && Object.keys(loadedPlugins[plugin].processors).indexOf(fileExtension) >= 0) {
            processor = loadedPlugins[plugin].processors[fileExtension];
            break;
        }
    }

    const autofixingEnabled = typeof fix !== "undefined" && (!processor || processor.supportsAutofix);
    const fixedResult = linter.verifyAndFix(text, config, {
        filename: effectiveFilename,
        allowInlineConfig,
        reportUnusedDisableDirectives,
        fix: !!autofixingEnabled && fix,
        preprocess: processor && (rawText => processor.preprocess(rawText, effectiveFilename)),
        postprocess: processor && (problemLists => processor.postprocess(problemLists, effectiveFilename))
    });
    const stats = calculateStatsPerFile(fixedResult.messages);

    const result = {
        filePath: effectiveFilename,
        messages: fixedResult.messages,
        errorCount: stats.errorCount,
        warningCount: stats.warningCount,
        fixableErrorCount: stats.fixableErrorCount,
        fixableWarningCount: stats.fixableWarningCount
    };

    if (fixedResult.fixed) {
        result.output = fixedResult.output;
    }

    if (result.errorCount + result.warningCount > 0 && typeof result.output === "undefined") {
        result.source = text;
    }

    return { result, config };
}

/**
 * Processes an individual file using ESLint. Files used here are known to
 * exist, so no need to check that here.
 * @param {string} filename The filename of the file being checked.
 * @param {Object} configHelper The configuration options for ESLint.
 * @param {Object} options The CLIEngine options object.
 * @param {Linter} linter Linter context
 * @returns {{rules: LintResult, config: Object}} The results for linting on this text and the fully-resolved config for it.
 * @private
 */
function processFile(filename, configHelper, options, linter) {

    const text = fs.readFileSync(path.resolve(filename), "utf8");

    return processText(
        text,
        configHelper,
        filename,
        options.fix,
        options.allowInlineConfig,
        options.reportUnusedDisableDirectives,
        linter
    );
}

/**
 * Returns result with warning by ignore settings
 * @param {string} filePath - File path of checked code
 * @param {string} baseDir  - Absolute path of base directory
 * @returns {LintResult} Result with single warning
 * @private
 */
function createIgnoreResult(filePath, baseDir) {
    let message;
    const isHidden = /^\./u.test(path.basename(filePath));
    const isInNodeModules = baseDir && path.relative(baseDir, filePath).startsWith("node_modules");
    const isInBowerComponents = baseDir && path.relative(baseDir, filePath).startsWith("bower_components");

    if (isHidden) {
        message = "File ignored by default.  Use a negated ignore pattern (like \"--ignore-pattern '!<relative/path/to/filename>'\") to override.";
    } else if (isInNodeModules) {
        message = "File ignored by default. Use \"--ignore-pattern '!node_modules/*'\" to override.";
    } else if (isInBowerComponents) {
        message = "File ignored by default. Use \"--ignore-pattern '!bower_components/*'\" to override.";
    } else {
        message = "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.";
    }

    return {
        filePath: path.resolve(filePath),
        messages: [
            {
                fatal: false,
                severity: 1,
                message
            }
        ],
        errorCount: 0,
        warningCount: 1,
        fixableErrorCount: 0,
        fixableWarningCount: 0
    };
}

/**
 * Produces rule warnings (i.e. deprecation) from configured rules
 * @param {(Array<string>|Set<string>)} usedRules - Rules configured
 * @param {Map} loadedRules - Map of loaded rules
 * @returns {Array<Object>} Contains rule warnings
 * @private
 */
function createRuleDeprecationWarnings(usedRules, loadedRules) {
    const usedDeprecatedRules = [];

    usedRules.forEach(name => {
        const loadedRule = loadedRules.get(name);

        if (loadedRule && loadedRule.meta && loadedRule.meta.deprecated) {
            const deprecatedRule = { ruleId: name };
            const replacedBy = lodash.get(loadedRule, "meta.replacedBy", []);

            if (replacedBy.every(newRule => lodash.isString(newRule))) {
                deprecatedRule.replacedBy = replacedBy;
            }

            usedDeprecatedRules.push(deprecatedRule);
        }
    });

    return usedDeprecatedRules;
}

/**
 * Checks if the given message is an error message.
 * @param {Object} message The message to check.
 * @returns {boolean} Whether or not the message is an error message.
 * @private
 */
function isErrorMessage(message) {
    return message.severity === 2;
}


/**
 * return the cacheFile to be used by eslint, based on whether the provided parameter is
 * a directory or looks like a directory (ends in `path.sep`), in which case the file
 * name will be the `cacheFile/.cache_hashOfCWD`
 *
 * if cacheFile points to a file or looks like a file then in will just use that file
 *
 * @param {string} cacheFile The name of file to be used to store the cache
 * @param {string} cwd Current working directory
 * @returns {string} the resolved path to the cache file
 */
function getCacheFile(cacheFile, cwd) {

    /*
     * make sure the path separators are normalized for the environment/os
     * keeping the trailing path separator if present
     */
    const normalizedCacheFile = path.normalize(cacheFile);

    const resolvedCacheFile = path.resolve(cwd, normalizedCacheFile);
    const looksLikeADirectory = normalizedCacheFile.slice(-1) === path.sep;

    /**
     * return the name for the cache file in case the provided parameter is a directory
     * @returns {string} the resolved path to the cacheFile
     */
    function getCacheFileForDirectory() {
        return path.join(resolvedCacheFile, `.cache_${hash(cwd)}`);
    }

    let fileStats;

    try {
        fileStats = fs.lstatSync(resolvedCacheFile);
    } catch (ex) {
        fileStats = null;
    }


    /*
     * in case the file exists we need to verify if the provided path
     * is a directory or a file. If it is a directory we want to create a file
     * inside that directory
     */
    if (fileStats) {

        /*
         * is a directory or is a file, but the original file the user provided
         * looks like a directory but `path.resolve` removed the `last path.sep`
         * so we need to still treat this like a directory
         */
        if (fileStats.isDirectory() || looksLikeADirectory) {
            return getCacheFileForDirectory();
        }

        // is file so just use that file
        return resolvedCacheFile;
    }

    /*
     * here we known the file or directory doesn't exist,
     * so we will try to infer if its a directory if it looks like a directory
     * for the current operating system.
     */

    // if the last character passed is a path separator we assume is a directory
    if (looksLikeADirectory) {
        return getCacheFileForDirectory();
    }

    return resolvedCacheFile;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

class CLIEngine {

    /**
     * Creates a new instance of the core CLI engine.
     * @param {CLIEngineOptions} providedOptions The options for this instance.
     * @constructor
     */
    constructor(providedOptions) {

        const options = Object.assign(
            Object.create(null),
            defaultOptions,
            { cwd: process.cwd() },
            providedOptions
        );

        /*
         * if an --ignore-path option is provided, ensure that the ignore
         * file exists and is not a directory
         */
        if (options.ignore && options.ignorePath) {
            try {
                if (!fs.statSync(options.ignorePath).isFile()) {
                    throw new Error(`${options.ignorePath} is not a file`);
                }
            } catch (e) {
                e.message = `Error: Could not load file ${options.ignorePath}\nError: ${e.message}`;
                throw e;
            }
        }

        /**
         * Stored options for this instance
         * @type {Object}
         */
        this.options = options;
        this.linter = new Linter();

        // load in additional rules
        if (this.options.rulePaths) {
            const cwd = this.options.cwd;

            this.options.rulePaths.forEach(rulesdir => {
                debug(`Loading rules from ${rulesdir}`);
                this.linter.defineRules(loadRules(rulesdir, cwd));
            });
        }

        if (this.options.rules && Object.keys(this.options.rules).length) {
            const loadedRules = this.linter.getRules();

            // Ajv validator with default schema will mutate original object, so we must clone it recursively.
            this.options.rules = lodash.cloneDeep(this.options.rules);

            Object.keys(this.options.rules).forEach(name => {
                validator.validateRuleOptions(loadedRules.get(name), name, this.options.rules[name], "CLI");
            });
        }

        this.config = new Config(this.options, this.linter);

        if (this.options.cache) {
            const cacheFile = getCacheFile(this.options.cacheLocation || this.options.cacheFile, this.options.cwd);

            /**
             * Cache used to avoid operating on files that haven't changed since the
             * last successful execution.
             * @type {Object}
             */
            this._lintResultCache = new LintResultCache(cacheFile, this.config);
        }

        // setup special filter for fixes
        if (this.options.fix && this.options.fixTypes && this.options.fixTypes.length > 0) {

            debug(`Using fix types ${this.options.fixTypes}`);

            // throw an error if any invalid fix types are found
            validateFixTypes(this.options.fixTypes);

            // convert to Set for faster lookup
            const fixTypes = new Set(this.options.fixTypes);

            // save original value of options.fix in case it's a function
            const originalFix = (typeof this.options.fix === "function")
                ? this.options.fix : () => this.options.fix;

            // create a cache of rules (but don't populate until needed)
            this._rulesCache = null;

            this.options.fix = lintResult => {
                const rule = this._rulesCache.get(lintResult.ruleId);
                const matches = rule.meta && fixTypes.has(rule.meta.type);

                return matches && originalFix(lintResult);
            };
        }

    }

    getRules() {
        return this.linter.getRules();
    }

    /**
     * Returns results that only contains errors.
     * @param {LintResult[]} results The results to filter.
     * @returns {LintResult[]} The filtered results.
     */
    static getErrorResults(results) {
        const filtered = [];

        results.forEach(result => {
            const filteredMessages = result.messages.filter(isErrorMessage);

            if (filteredMessages.length > 0) {
                filtered.push(
                    Object.assign(result, {
                        messages: filteredMessages,
                        errorCount: filteredMessages.length,
                        warningCount: 0,
                        fixableErrorCount: result.fixableErrorCount,
                        fixableWarningCount: 0
                    })
                );
            }
        });

        return filtered;
    }

    /**
     * Outputs fixes from the given results to files.
     * @param {Object} report The report object created by CLIEngine.
     * @returns {void}
     */
    static outputFixes(report) {
        report.results.filter(result => Object.prototype.hasOwnProperty.call(result, "output")).forEach(result => {
            fs.writeFileSync(result.filePath, result.output);
        });
    }


    /**
     * Add a plugin by passing its configuration
     * @param {string} name Name of the plugin.
     * @param {Object} pluginobject Plugin configuration object.
     * @returns {void}
     */
    addPlugin(name, pluginobject) {
        this.config.plugins.define(name, pluginobject);
    }

    /**
     * Resolves the patterns passed into executeOnFiles() into glob-based patterns
     * for easier handling.
     * @param {string[]} patterns The file patterns passed on the command line.
     * @returns {string[]} The equivalent glob patterns.
     */
    resolveFileGlobPatterns(patterns) {
        return globUtils.resolveFileGlobPatterns(patterns.filter(Boolean), this.options);
    }

    /**
     * Executes the current configuration on an array of file and directory names.
     * @param {string[]} patterns An array of file and directory names.
     * @returns {Object} The results for all files that were linted.
     */
    executeOnFiles(patterns) {
        const options = this.options,
            lintResultCache = this._lintResultCache,
            configHelper = this.config;
        const cacheFile = getCacheFile(this.options.cacheLocation || this.options.cacheFile, this.options.cwd);

        if (!options.cache && fs.existsSync(cacheFile)) {
            fs.unlinkSync(cacheFile);
        }

        const startTime = Date.now();
        const fileList = globUtils.listFilesToProcess(patterns, options);
        const allUsedRules = new Set();
        const results = fileList.map(fileInfo => {
            if (fileInfo.ignored) {
                return createIgnoreResult(fileInfo.filename, options.cwd);
            }

            if (options.cache) {
                const cachedLintResults = lintResultCache.getCachedLintResults(fileInfo.filename);

                if (cachedLintResults) {
                    const resultHadMessages = cachedLintResults.messages && cachedLintResults.messages.length;

                    if (resultHadMessages && options.fix) {
                        debug(`Reprocessing cached file to allow autofix: ${fileInfo.filename}`);
                    } else {
                        debug(`Skipping file since it hasn't changed: ${fileInfo.filename}`);

                        return cachedLintResults;
                    }
                }
            }

            // if there's a cache, populate it
            if ("_rulesCache" in this) {
                this._rulesCache = this.getRules();
            }

            debug(`Processing ${fileInfo.filename}`);

            const { result, config } = processFile(fileInfo.filename, configHelper, options, this.linter);

            Object.keys(config.rules)
                .filter(ruleId => ConfigOps.getRuleSeverity(config.rules[ruleId]))
                .forEach(ruleId => allUsedRules.add(ruleId));

            return result;
        });

        if (options.cache) {
            results.forEach(result => {

                /*
                 * Store the lint result in the LintResultCache.
                 * NOTE: The LintResultCache will remove the file source and any
                 * other properties that are difficult to serialize, and will
                 * hydrate those properties back in on future lint runs.
                 */
                lintResultCache.setCachedLintResults(result.filePath, result);
            });

            // persist the cache to disk
            lintResultCache.reconcile();
        }

        const stats = calculateStatsPerRun(results);

        const usedDeprecatedRules = createRuleDeprecationWarnings(allUsedRules, this.getRules());

        debug(`Linting complete in: ${Date.now() - startTime}ms`);

        return {
            results,
            errorCount: stats.errorCount,
            warningCount: stats.warningCount,
            fixableErrorCount: stats.fixableErrorCount,
            fixableWarningCount: stats.fixableWarningCount,
            usedDeprecatedRules
        };
    }

    /**
     * Executes the current configuration on text.
     * @param {string} text A string of JavaScript code to lint.
     * @param {string} filename An optional string representing the texts filename.
     * @param {boolean} warnIgnored Always warn when a file is ignored
     * @returns {Object} The results for the linting.
     */
    executeOnText(text, filename, warnIgnored) {

        const results = [],
            options = this.options,
            configHelper = this.config,
            ignoredPaths = new IgnoredPaths(options);

        // resolve filename based on options.cwd (for reporting, ignoredPaths also resolves)

        const resolvedFilename = filename && !path.isAbsolute(filename)
            ? path.resolve(options.cwd, filename)
            : filename;
        let usedDeprecatedRules;

        if (resolvedFilename && ignoredPaths.contains(resolvedFilename)) {
            if (warnIgnored) {
                results.push(createIgnoreResult(resolvedFilename, options.cwd));
            }
            usedDeprecatedRules = [];
        } else {

            // if there's a cache, populate it
            if ("_rulesCache" in this) {
                this._rulesCache = this.getRules();
            }

            const { result, config } = processText(
                text,
                configHelper,
                resolvedFilename,
                options.fix,
                options.allowInlineConfig,
                options.reportUnusedDisableDirectives,
                this.linter
            );

            results.push(result);
            usedDeprecatedRules = createRuleDeprecationWarnings(
                Object.keys(config.rules).filter(rule => ConfigOps.getRuleSeverity(config.rules[rule])),
                this.getRules()
            );
        }

        const stats = calculateStatsPerRun(results);

        return {
            results,
            errorCount: stats.errorCount,
            warningCount: stats.warningCount,
            fixableErrorCount: stats.fixableErrorCount,
            fixableWarningCount: stats.fixableWarningCount,
            usedDeprecatedRules
        };
    }

    /**
     * Returns a configuration object for the given file based on the CLI options.
     * This is the same logic used by the ESLint CLI executable to determine
     * configuration for each file it processes.
     * @param {string} filePath The path of the file to retrieve a config object for.
     * @returns {Object} A configuration object for the file.
     */
    getConfigForFile(filePath) {
        const configHelper = this.config;

        return configHelper.getConfig(filePath);
    }

    /**
     * Checks if a given path is ignored by ESLint.
     * @param {string} filePath The path of the file to check.
     * @returns {boolean} Whether or not the given path is ignored.
     */
    isPathIgnored(filePath) {
        const resolvedPath = path.resolve(this.options.cwd, filePath);
        const ignoredPaths = new IgnoredPaths(this.options);

        return ignoredPaths.contains(resolvedPath);
    }

    /**
     * Returns the formatter representing the given format or null if no formatter
     * with the given name can be found.
     * @param {string} [format] The name of the format to load or the path to a
     *      custom formatter.
     * @returns {Function} The formatter function or null if not found.
     */
    getFormatter(format) {

        // default is stylish
        const resolvedFormatName = format || "stylish";

        // only strings are valid formatters
        if (typeof resolvedFormatName === "string") {

            // replace \ with / for Windows compatibility
            const normalizedFormatName = resolvedFormatName.replace(/\\/gu, "/");

            const cwd = this.options ? this.options.cwd : process.cwd();
            const namespace = naming.getNamespaceFromTerm(normalizedFormatName);

            let formatterPath;

            // if there's a slash, then it's a file
            if (!namespace && normalizedFormatName.indexOf("/") > -1) {
                formatterPath = path.resolve(cwd, normalizedFormatName);
            } else {
                try {
                    const npmFormat = naming.normalizePackageName(normalizedFormatName, "eslint-formatter");

                    formatterPath = resolver.resolve(npmFormat, `${cwd}/node_modules`);
                } catch (e) {
                    formatterPath = `./formatters/${normalizedFormatName}`;
                }
            }

            try {
                return require(formatterPath);
            } catch (ex) {
                ex.message = `There was a problem loading formatter: ${formatterPath}\nError: ${ex.message}`;
                throw ex;
            }

        } else {
            return null;
        }
    }
}

CLIEngine.version = pkg.version;
CLIEngine.getFormatter = CLIEngine.prototype.getFormatter;

module.exports = CLIEngine;
