'use strict';

const path = require('path');
const { parse } = require('url');
const querystring = require('querystring');

const parseRange = require('range-parser');

const HASH_REGEXP = /[0-9a-f]{10,}/;

// support for multi-compiler configuration
// see: https://github.com/webpack/webpack-dev-server/issues/641
function getPaths(publicPath, compiler, url) {
  const compilers = compiler && compiler.compilers;
  if (Array.isArray(compilers)) {
    let compilerPublicPath;

    // the path portion of compilerPublicPath
    let compilerPublicPathBase;

    for (let i = 0; i < compilers.length; i++) {
      compilerPublicPath =
        compilers[i].options &&
        compilers[i].options.output &&
        compilers[i].options.output.publicPath;

      if (compilerPublicPath) {
        if (compilerPublicPath.indexOf('/') === 0) {
          compilerPublicPathBase = compilerPublicPath;
        } else {
          // handle the case where compilerPublicPath is a URL with hostname
          compilerPublicPathBase = parse(compilerPublicPath).pathname;
        }

        // check the url vs the path part of the compilerPublicPath
        if (url.indexOf(compilerPublicPathBase) === 0) {
          return {
            publicPath: compilerPublicPath,
            outputPath: compilers[i].outputPath,
          };
        }
      }
    }
  }
  return {
    publicPath,
    outputPath: compiler.outputPath,
  };
}

// eslint-disable-next-line consistent-return
function ready(context, fn, req) {
  if (context.state) {
    return fn(context.webpackStats);
  }

  context.log.info(`wait until bundle finished: ${req.url || fn.name}`);
  context.callbacks.push(fn);
}

module.exports = {
  getFilenameFromUrl(pubPath, compiler, url) {
    const { outputPath, publicPath } = getPaths(pubPath, compiler, url);
    // localPrefix is the folder our bundle should be in
    const localPrefix = parse(publicPath || '/', false, true);
    const urlObject = parse(url);
    let filename;

    // publicPath has the hostname that is not the same as request url's, should fail
    if (
      localPrefix.hostname !== null &&
      urlObject.hostname !== null &&
      localPrefix.hostname !== urlObject.hostname
    ) {
      return false;
    }

    // publicPath is not in url, so it should fail
    if (
      publicPath &&
      localPrefix.hostname === urlObject.hostname &&
      url.indexOf(publicPath) !== 0
    ) {
      return false;
    }

    // strip localPrefix from the start of url
    if (urlObject.pathname.indexOf(localPrefix.pathname) === 0) {
      filename = urlObject.pathname.substr(localPrefix.pathname.length);
    }

    if (
      !urlObject.hostname &&
      localPrefix.hostname &&
      url.indexOf(localPrefix.path) !== 0
    ) {
      return false;
    }

    let uri = outputPath;

    /* istanbul ignore if */
    if (process.platform === 'win32') {
      // Path Handling for Microsoft Windows
      if (filename) {
        uri = path.posix.join(outputPath || '', querystring.unescape(filename));

        if (!path.win32.isAbsolute(uri)) {
          uri = `/${uri}`;
        }
      }

      return uri;
    }

    // Path Handling for all other operating systems
    if (filename) {
      uri = path.posix.join(outputPath || '', filename);

      if (!path.posix.isAbsolute(uri)) {
        uri = `/${uri}`;
      }
    }

    // if no matches, use outputPath as filename
    return querystring.unescape(uri);
  },

  handleRangeHeaders(content, req, res) {
    // assumes express API. For other servers, need to add logic to access
    // alternative header APIs
    res.setHeader('Accept-Ranges', 'bytes');

    if (req.headers.range) {
      const ranges = parseRange(content.length, req.headers.range);

      // unsatisfiable
      if (ranges === -1) {
        res.setHeader('Content-Range', `bytes */${content.length}`);
        // eslint-disable-next-line no-param-reassign
        res.statusCode = 416;
      }

      // valid (syntactically invalid/multiple ranges are treated as a
      // regular response)
      if (ranges !== -2 && ranges.length === 1) {
        const { length } = content;

        // Content-Range
        // eslint-disable-next-line no-param-reassign
        res.statusCode = 206;
        res.setHeader(
          'Content-Range',
          `bytes ${ranges[0].start}-${ranges[0].end}/${length}`
        );

        // eslint-disable-next-line no-param-reassign
        content = content.slice(ranges[0].start, ranges[0].end + 1);
      }
    }

    return content;
  },

  handleRequest(context, filename, processRequest, req) {
    // in lazy mode, rebuild on bundle request
    if (
      context.options.lazy &&
      (!context.options.filename || context.options.filename.test(filename))
    ) {
      context.rebuild();
    }

    if (HASH_REGEXP.test(filename)) {
      try {
        if (context.fs.statSync(filename).isFile()) {
          processRequest();
          return;
        }
      } catch (e) {
        // eslint-disable-line
      }
    }

    ready(context, processRequest, req);
  },

  noop: () => {},

  ready,
};
