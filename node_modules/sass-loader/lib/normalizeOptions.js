'use strict';

const os = require('os');
const path = require('path');

const utils = require('loader-utils');
const cloneDeep = require('clone-deep');

const proxyCustomImporters = require('./proxyCustomImporters');

/**
 * Derives the sass options from the loader context and normalizes its values with sane defaults.
 *
 * Please note: If loaderContext.query is an options object, it will be re-used across multiple invocations.
 * That's why we must not modify the object directly.
 *
 * @param {LoaderContext} loaderContext
 * @param {string} content
 * @param {Function} webpackImporter
 * @returns {Object}
 */
function normalizeOptions(loaderContext, content, webpackImporter) {
  const options = cloneDeep(utils.getOptions(loaderContext)) || {};
  const { resourcePath } = loaderContext;

  // allow opt.functions to be configured WRT loaderContext
  if (typeof options.functions === 'function') {
    options.functions = options.functions(loaderContext);
  }

  let { data } = options;

  if (typeof options.data === 'function') {
    data = options.data(loaderContext);
  }

  options.data = data ? data + os.EOL + content : content;

  // opt.outputStyle
  if (!options.outputStyle && loaderContext.minimize) {
    options.outputStyle = 'compressed';
  }

  // opt.sourceMap
  // Not using the `this.sourceMap` flag because css source maps are different
  // @see https://github.com/webpack/css-loader/pull/40
  if (options.sourceMap) {
    // Deliberately overriding the sourceMap option here.
    // node-sass won't produce source maps if the data option is used and options.sourceMap is not a string.
    // In case it is a string, options.sourceMap should be a path where the source map is written.
    // But since we're using the data option, the source map will not actually be written, but
    // all paths in sourceMap.sources will be relative to that path.
    // Pretty complicated... :(
    options.sourceMap = path.join(process.cwd(), '/sass.map');
    if ('sourceMapRoot' in options === false) {
      options.sourceMapRoot = process.cwd();
    }
    if ('omitSourceMapUrl' in options === false) {
      // The source map url doesn't make sense because we don't know the output path
      // The css-loader will handle that for us
      options.omitSourceMapUrl = true;
    }
    if ('sourceMapContents' in options === false) {
      // If sourceMapContents option is not set, set it to true otherwise maps will be empty/null
      // when exported by webpack-extract-text-plugin.
      options.sourceMapContents = true;
    }
  }

  // indentedSyntax is a boolean flag.
  const ext = path.extname(resourcePath);

  // If we are compiling sass and indentedSyntax isn't set, automatically set it.
  if (
    ext &&
    ext.toLowerCase() === '.sass' &&
    'indentedSyntax' in options === false
  ) {
    options.indentedSyntax = true;
  } else {
    options.indentedSyntax = Boolean(options.indentedSyntax);
  }

  // Allow passing custom importers to `node-sass`. Accepts `Function` or an array of `Function`s.
  options.importer = options.importer
    ? proxyCustomImporters(options.importer, resourcePath)
    : [];
  options.importer.push(webpackImporter);

  // `node-sass` uses `includePaths` to resolve `@import` paths. Append the currently processed file.
  options.includePaths = options.includePaths || [];
  options.includePaths.push(path.dirname(resourcePath));

  return options;
}

module.exports = normalizeOptions;
