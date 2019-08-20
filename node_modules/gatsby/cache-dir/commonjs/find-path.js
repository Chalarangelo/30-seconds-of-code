"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cleanPath = exports.findMatchPath = exports.setMatchPaths = void 0;

var _utils = require("@reach/router/lib/utils");

var _stripPrefix = _interopRequireDefault(require("./strip-prefix"));

var _normalizePagePath = _interopRequireDefault(require("./normalize-page-path"));

let matchPaths = [];

const trimPathname = rawPathname => {
  let pathname = decodeURIComponent(rawPathname); // Remove the pathPrefix from the pathname.

  let trimmedPathname = (0, _stripPrefix.default)(pathname, __BASE_PATH__) // Remove any hashfragment
  .split(`#`)[0] // Remove search query
  .split(`?`)[0];
  return trimmedPathname;
};
/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */


const setMatchPaths = value => {
  matchPaths = value;
};
/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */


exports.setMatchPaths = setMatchPaths;

const findMatchPath = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);

  for (const _ref of matchPaths) {
    const {
      matchPath,
      path
    } = _ref;

    if ((0, _utils.match)(matchPath, trimmedPathname)) {
      return (0, _normalizePagePath.default)(path);
    }
  }

  return null;
};
/**
 * Clean a url and converts /index.html => /
 * E.g `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */


exports.findMatchPath = findMatchPath;

const cleanPath = rawPathname => {
  const trimmedPathname = trimPathname(rawPathname);
  let foundPath = trimmedPathname;

  if (foundPath === `/index.html`) {
    foundPath = `/`;
  }

  foundPath = (0, _normalizePagePath.default)(foundPath);
  return foundPath;
};

exports.cleanPath = cleanPath;