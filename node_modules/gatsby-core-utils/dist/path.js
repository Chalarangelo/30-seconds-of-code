"use strict";

exports.__esModule = true;
exports.joinPath = joinPath;

const path = require(`path`);

const os = require(`os`);
/**
 * @type {import('../index').joinPath}
 */


function joinPath(...paths) {
  const joinedPath = path.join(...paths);

  if (os.platform() === `win32`) {
    return joinedPath.replace(/\\/g, `\\\\`);
  }

  return joinedPath;
}