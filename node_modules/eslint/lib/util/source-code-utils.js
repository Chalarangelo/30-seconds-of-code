/**
 * @fileoverview Tools for obtaining SourceCode objects.
 * @author Ian VanSchooten
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const CLIEngine = require("../cli-engine"),
    globUtils = require("./glob-utils"),
    baseDefaultOptions = require("../../conf/default-cli-options");

const debug = require("debug")("eslint:source-code-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Get the SourceCode object for a single file
 * @param   {string}     filename The fully resolved filename to get SourceCode from.
 * @param   {Object}     options  A CLIEngine options object.
 * @returns {Array}               Array of the SourceCode object representing the file
 *                                and fatal error message.
 */
function getSourceCodeOfFile(filename, options) {
    debug("getting sourceCode of", filename);
    const opts = Object.assign({}, options, { rules: {} });
    const cli = new CLIEngine(opts);
    const results = cli.executeOnFiles([filename]);

    if (results && results.results[0] && results.results[0].messages[0] && results.results[0].messages[0].fatal) {
        const msg = results.results[0].messages[0];

        throw new Error(`(${filename}:${msg.line}:${msg.column}) ${msg.message}`);
    }
    const sourceCode = cli.linter.getSourceCode();

    return sourceCode;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------


/**
 * This callback is used to measure execution status in a progress bar
 * @callback progressCallback
 * @param {number} The total number of times the callback will be called.
 */

/**
 * Gets the SourceCode of a single file, or set of files.
 * @param {string[]|string} patterns A filename, directory name, or glob, or an array of them
 * @param {Object} [providedOptions] A CLIEngine options object. If not provided, the default cli options will be used.
 * @param {progressCallback} [providedCallback] Callback for reporting execution status
 * @returns {Object} The SourceCode of all processed files.
 */
function getSourceCodeOfFiles(patterns, providedOptions, providedCallback) {
    const sourceCodes = {};
    const globPatternsList = typeof patterns === "string" ? [patterns] : patterns;
    let options, callback;

    const defaultOptions = Object.assign({}, baseDefaultOptions, { cwd: process.cwd() });

    if (typeof providedOptions === "undefined") {
        options = defaultOptions;
        callback = null;
    } else if (typeof providedOptions === "function") {
        callback = providedOptions;
        options = defaultOptions;
    } else if (typeof providedOptions === "object") {
        options = Object.assign({}, defaultOptions, providedOptions);
        callback = providedCallback;
    }
    debug("constructed options:", options);

    const filenames = globUtils.listFilesToProcess(globPatternsList, options)
        .filter(fileInfo => !fileInfo.ignored)
        .reduce((files, fileInfo) => files.concat(fileInfo.filename), []);

    if (filenames.length === 0) {
        debug(`Did not find any files matching pattern(s): ${globPatternsList}`);
    }
    filenames.forEach(filename => {
        const sourceCode = getSourceCodeOfFile(filename, options);

        if (sourceCode) {
            debug("got sourceCode of", filename);
            sourceCodes[filename] = sourceCode;
        }
        if (callback) {
            callback(filenames.length); // eslint-disable-line callback-return
        }
    });
    return sourceCodes;
}

module.exports = {
    getSourceCodeOfFiles
};
