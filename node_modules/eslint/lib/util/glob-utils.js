/**
 * @fileoverview Utilities for working with globs and the filesystem.
 * @author Ian VanSchooten
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const lodash = require("lodash"),
    fs = require("fs"),
    path = require("path"),
    GlobSync = require("./glob"),

    pathUtils = require("./path-utils"),
    IgnoredPaths = require("./ignored-paths");

const debug = require("debug")("eslint:glob-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether a directory exists at the given location
 * @param {string} resolvedPath A path from the CWD
 * @returns {boolean} `true` if a directory exists
 */
function directoryExists(resolvedPath) {
    return fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory();
}

/**
 * Checks if a provided path is a directory and returns a glob string matching
 * all files under that directory if so, the path itself otherwise.
 *
 * Reason for this is that `glob` needs `/**` to collect all the files under a
 * directory where as our previous implementation without `glob` simply walked
 * a directory that is passed. So this is to maintain backwards compatibility.
 *
 * Also makes sure all path separators are POSIX style for `glob` compatibility.
 *
 * @param {Object}   [options]                    An options object
 * @param {string[]} [options.extensions=[".js"]] An array of accepted extensions
 * @param {string}   [options.cwd=process.cwd()]  The cwd to use to resolve relative pathnames
 * @returns {Function} A function that takes a pathname and returns a glob that
 *                     matches all files with the provided extensions if
 *                     pathname is a directory.
 */
function processPath(options) {
    const cwd = (options && options.cwd) || process.cwd();
    let extensions = (options && options.extensions) || [".js"];

    extensions = extensions.map(ext => ext.replace(/^\./u, ""));

    let suffix = "/**";

    if (extensions.length === 1) {
        suffix += `/*.${extensions[0]}`;
    } else {
        suffix += `/*.{${extensions.join(",")}}`;
    }

    /**
     * A function that converts a directory name to a glob pattern
     *
     * @param {string} pathname The directory path to be modified
     * @returns {string} The glob path or the file path itself
     * @private
     */
    return function(pathname) {
        if (pathname === "") {
            return "";
        }

        let newPath = pathname;
        const resolvedPath = path.resolve(cwd, pathname);

        if (directoryExists(resolvedPath)) {
            newPath = pathname.replace(/[/\\]$/u, "") + suffix;
        }

        return pathUtils.convertPathToPosix(newPath);
    };
}

/**
 * The error type when no files match a glob.
 */
class NoFilesFoundError extends Error {

    /**
     * @param {string} pattern - The glob pattern which was not found.
     */
    constructor(pattern) {
        super(`No files matching '${pattern}' were found.`);

        this.messageTemplate = "file-not-found";
        this.messageData = { pattern };
    }

}

/**
 * The error type when there are files matched by a glob, but all of them have been ignored.
 */
class AllFilesIgnoredError extends Error {

    /**
     * @param {string} pattern - The glob pattern which was not found.
     */
    constructor(pattern) {
        super(`All files matched by '${pattern}' are ignored.`);
        this.messageTemplate = "all-files-ignored";
        this.messageData = { pattern };
    }
}

const NORMAL_LINT = {};
const SILENTLY_IGNORE = {};
const IGNORE_AND_WARN = {};

/**
 * Tests whether a file should be linted or ignored
 * @param {string} filename The file to be processed
 * @param {{ignore: (boolean|null)}} options If `ignore` is false, updates the behavior to
 * not process custom ignore paths, and lint files specified by direct path even if they
 * match the default ignore path
 * @param {boolean} isDirectPath True if the file was provided as a direct path
 * (as opposed to being resolved from a glob)
 * @param {IgnoredPaths} ignoredPaths An instance of IgnoredPaths to check whether a given
 * file is ignored.
 * @returns {(NORMAL_LINT|SILENTLY_IGNORE|IGNORE_AND_WARN)} A directive for how the
 * file should be processed (either linted normally, or silently ignored, or ignored
 * with a warning that it is being ignored)
 */
function testFileAgainstIgnorePatterns(filename, options, isDirectPath, ignoredPaths) {
    const shouldProcessCustomIgnores = options.ignore !== false;
    const shouldLintIgnoredDirectPaths = options.ignore === false;
    const fileMatchesIgnorePatterns = ignoredPaths.contains(filename, "default") ||
        (shouldProcessCustomIgnores && ignoredPaths.contains(filename, "custom"));

    if (fileMatchesIgnorePatterns && isDirectPath && !shouldLintIgnoredDirectPaths) {
        return IGNORE_AND_WARN;
    }

    if (!fileMatchesIgnorePatterns || (isDirectPath && shouldLintIgnoredDirectPaths)) {
        return NORMAL_LINT;
    }

    return SILENTLY_IGNORE;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Resolves any directory patterns into glob-based patterns for easier handling.
 * @param   {string[]} patterns               File patterns (such as passed on the command line).
 * @param   {Object} options                  An options object.
 * @param   {string} [options.globInputPaths] False disables glob resolution.
 * @returns {string[]} The equivalent glob patterns and filepath strings.
 */
function resolveFileGlobPatterns(patterns, options) {
    if (options.globInputPaths === false) {
        return patterns;
    }

    const processPathExtensions = processPath(options);

    return patterns.map(processPathExtensions);
}

const dotfilesPattern = /(?:(?:^\.)|(?:[/\\]\.))[^/\\.].*/u;

/**
 * Build a list of absolute filesnames on which ESLint will act.
 * Ignored files are excluded from the results, as are duplicates.
 *
 * @param   {string[]} globPatterns                     Glob patterns.
 * @param   {Object}   [providedOptions]                An options object.
 * @param   {string}   [providedOptions.cwd]            CWD (considered for relative filenames)
 * @param   {boolean}  [providedOptions.ignore]         False disables use of .eslintignore.
 * @param   {string}   [providedOptions.ignorePath]     The ignore file to use instead of .eslintignore.
 * @param   {string}   [providedOptions.ignorePattern]  A pattern of files to ignore.
 * @param   {string}   [providedOptions.globInputPaths] False disables glob resolution.
 * @returns {string[]} Resolved absolute filenames.
 */
function listFilesToProcess(globPatterns, providedOptions) {
    const options = providedOptions || { ignore: true };
    const cwd = options.cwd || process.cwd();

    const getIgnorePaths = lodash.memoize(
        optionsObj =>
            new IgnoredPaths(optionsObj)
    );

    /*
     * The test "should use default options if none are provided" (source-code-utils.js) checks that 'module.exports.resolveFileGlobPatterns' was called.
     * So it cannot use the local function "resolveFileGlobPatterns".
     */
    const resolvedGlobPatterns = module.exports.resolveFileGlobPatterns(globPatterns, options);

    debug("Creating list of files to process.");
    const resolvedPathsByGlobPattern = resolvedGlobPatterns.map(pattern => {
        if (pattern === "") {
            return [{
                filename: "",
                behavior: SILENTLY_IGNORE
            }];
        }

        const file = path.resolve(cwd, pattern);

        if (options.globInputPaths === false || (fs.existsSync(file) && fs.statSync(file).isFile())) {
            const ignoredPaths = getIgnorePaths(options);
            const fullPath = options.globInputPaths === false ? file : fs.realpathSync(file);

            return [{
                filename: fullPath,
                behavior: testFileAgainstIgnorePatterns(fullPath, options, true, ignoredPaths)
            }];
        }

        // regex to find .hidden or /.hidden patterns, but not ./relative or ../relative
        const globIncludesDotfiles = dotfilesPattern.test(pattern);
        let newOptions = options;

        if (!options.dotfiles) {
            newOptions = Object.assign({}, options, { dotfiles: globIncludesDotfiles });
        }

        const ignoredPaths = getIgnorePaths(newOptions);
        const shouldIgnore = ignoredPaths.getIgnoredFoldersGlobChecker();
        const globOptions = {
            nodir: true,
            dot: true,
            cwd
        };

        return new GlobSync(pattern, globOptions, shouldIgnore).found.map(globMatch => {
            const relativePath = path.resolve(cwd, globMatch);

            return {
                filename: relativePath,
                behavior: testFileAgainstIgnorePatterns(relativePath, options, false, ignoredPaths)
            };
        });
    });

    const allPathDescriptors = resolvedPathsByGlobPattern.reduce((pathsForAllGlobs, pathsForCurrentGlob, index) => {
        if (pathsForCurrentGlob.every(pathDescriptor => pathDescriptor.behavior === SILENTLY_IGNORE && pathDescriptor.filename !== "")) {
            throw new (pathsForCurrentGlob.length ? AllFilesIgnoredError : NoFilesFoundError)(globPatterns[index]);
        }

        pathsForCurrentGlob.forEach(pathDescriptor => {
            switch (pathDescriptor.behavior) {
                case NORMAL_LINT:
                    pathsForAllGlobs.push({ filename: pathDescriptor.filename, ignored: false });
                    break;
                case IGNORE_AND_WARN:
                    pathsForAllGlobs.push({ filename: pathDescriptor.filename, ignored: true });
                    break;
                case SILENTLY_IGNORE:

                    // do nothing
                    break;

                default:
                    throw new Error(`Unexpected file behavior for ${pathDescriptor.filename}`);
            }
        });

        return pathsForAllGlobs;
    }, []);

    return lodash.uniqBy(allPathDescriptors, pathDescriptor => pathDescriptor.filename);
}

module.exports = {
    resolveFileGlobPatterns,
    listFilesToProcess
};
