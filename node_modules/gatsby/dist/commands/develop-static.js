"use strict";

const sysPath = require(`path`);

const express = require(`express`);

const parseUrl = require(`parseurl`);
/**
 * Module exports.
 * @public
 */


module.exports = serveStatic;
/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */

function serveStatic(root, options) {
  const expressStatic = express.static(root, options);
  return function (req, res, next) {
    if ([`GET`, `HEAD`].includes(req.method)) {
      const path = parseUrl(req).pathname;
      const parsedPath = sysPath.parse(path);

      if ([`.htm`, `.html`].includes(parsedPath.ext)) {
        return next();
      }
    }

    return expressStatic(req, res, next);
  };
}
//# sourceMappingURL=develop-static.js.map