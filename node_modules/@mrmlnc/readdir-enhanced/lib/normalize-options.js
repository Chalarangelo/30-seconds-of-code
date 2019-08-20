'use strict';

const path = require('path');
const globToRegExp = require('glob-to-regexp');

module.exports = normalizeOptions;

let isWindows = /^win/.test(process.platform);

/**
 * @typedef {Object} FSFacade
 * @property {fs.readdir} readdir
 * @property {fs.stat} stat
 * @property {fs.lstat} lstat
 */

/**
 * Validates and normalizes the options argument
 *
 * @param {object} [options] - User-specified options, if any
 * @param {object} internalOptions - Internal options that aren't part of the public API
 *
 * @param {number|boolean|function} [options.deep]
 * The number of directories to recursively traverse. Any falsy value or negative number will
 * default to zero, so only the top-level contents will be returned. Set to `true` or `Infinity`
 * to traverse all subdirectories.  Or provide a function that accepts a {@link fs.Stats} object
 * and returns a truthy value if the directory's contents should be crawled.
 *
 * @param {function|string|RegExp} [options.filter]
 * A function that accepts a {@link fs.Stats} object and returns a truthy value if the data should
 * be returned.  Or a RegExp or glob string pattern, to filter by file name.
 *
 * @param {string} [options.sep]
 * The path separator to use. By default, the OS-specific separator will be used, but this can be
 * set to a specific value to ensure consistency across platforms.
 *
 * @param {string} [options.basePath]
 * The base path to prepend to each result. If empty, then all results will be relative to `dir`.
 *
 * @param {FSFacade} [options.fs]
 * Synchronous or asynchronous facades for Node.js File System module
 *
 * @param {object} [internalOptions.facade]
 * Synchronous or asynchronous facades for various methods, including for the Node.js File System module
 *
 * @param {boolean} [internalOptions.emit]
 * Indicates whether the reader should emit "file", "directory", and "symlink" events
 *
 * @param {boolean} [internalOptions.stats]
 * Indicates whether the reader should emit {@link fs.Stats} objects instead of path strings
 *
 * @returns {object}
 */
function normalizeOptions (options, internalOptions) {
  if (options === null || options === undefined) {
    options = {};
  }
  else if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }

  let recurseDepth, recurseFn, recurseRegExp, recurseGlob, deep = options.deep;
  if (deep === null || deep === undefined) {
    recurseDepth = 0;
  }
  else if (typeof deep === 'boolean') {
    recurseDepth = deep ? Infinity : 0;
  }
  else if (typeof deep === 'number') {
    if (deep < 0 || isNaN(deep)) {
      throw new Error('options.deep must be a positive number');
    }
    else if (Math.floor(deep) !== deep) {
      throw new Error('options.deep must be an integer');
    }
    else {
      recurseDepth = deep;
    }
  }
  else if (typeof deep === 'function') {
    recurseDepth = Infinity;
    recurseFn = deep;
  }
  else if (deep instanceof RegExp) {
    recurseDepth = Infinity;
    recurseRegExp = deep;
  }
  else if (typeof deep === 'string' && deep.length > 0) {
    recurseDepth = Infinity;
    recurseGlob = globToRegExp(deep, { extended: true, globstar: true });
  }
  else {
    throw new TypeError('options.deep must be a boolean, number, function, regular expression, or glob pattern');
  }

  let filterFn, filterRegExp, filterGlob, filter = options.filter;
  if (filter !== null && filter !== undefined) {
    if (typeof filter === 'function') {
      filterFn = filter;
    }
    else if (filter instanceof RegExp) {
      filterRegExp = filter;
    }
    else if (typeof filter === 'string' && filter.length > 0) {
      filterGlob = globToRegExp(filter, { extended: true, globstar: true });
    }
    else {
      throw new TypeError('options.filter must be a function, regular expression, or glob pattern');
    }
  }

  let sep = options.sep;
  if (sep === null || sep === undefined) {
    sep = path.sep;
  }
  else if (typeof sep !== 'string') {
    throw new TypeError('options.sep must be a string');
  }

  let basePath = options.basePath;
  if (basePath === null || basePath === undefined) {
    basePath = '';
  }
  else if (typeof basePath === 'string') {
    // Append a path separator to the basePath, if necessary
    if (basePath && basePath.substr(-1) !== sep) {
      basePath += sep;
    }
  }
  else {
    throw new TypeError('options.basePath must be a string');
  }

  // Convert the basePath to POSIX (forward slashes)
  // so that glob pattern matching works consistently, even on Windows
  let posixBasePath = basePath;
  if (posixBasePath && sep !== '/') {
    posixBasePath = posixBasePath.replace(new RegExp('\\' + sep, 'g'), '/');

    /* istanbul ignore if */
    if (isWindows) {
      // Convert Windows root paths (C:\) and UNCs (\\) to POSIX root paths
      posixBasePath = posixBasePath.replace(/^([a-zA-Z]\:\/|\/\/)/, '/');
    }
  }

  // Determine which facade methods to use
  let facade;
  if (options.fs === null || options.fs === undefined) {
    // The user didn't provide their own facades, so use our internal ones
    facade = internalOptions.facade;
  }
  else if (typeof options.fs === 'object') {
    // Merge the internal facade methods with the user-provided `fs` facades
    facade = Object.assign({}, internalOptions.facade);
    facade.fs = Object.assign({}, internalOptions.facade.fs, options.fs);
  }
  else {
    throw new TypeError('options.fs must be an object');
  }

  return {
    recurseDepth,
    recurseFn,
    recurseRegExp,
    recurseGlob,
    filterFn,
    filterRegExp,
    filterGlob,
    sep,
    basePath,
    posixBasePath,
    facade,
    emit: !!internalOptions.emit,
    stats: !!internalOptions.stats,
  };
}
