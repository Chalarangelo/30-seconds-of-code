"use strict";

exports.__esModule = true;
exports.resolve = resolve;

const path = require(`path`);

const os = require(`os`);
/**
 * @type {import('../index').urlResolve}
 */


function resolve(...segments) {
  const joinedPath = path.join(...segments);

  if (os.platform() === `win32`) {
    return joinedPath.replace(/\\/g, `/`);
  }

  return joinedPath;
}