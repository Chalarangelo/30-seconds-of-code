"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = path => {
  if (path === undefined) {
    return path;
  }

  if (path === `/`) {
    return `/`;
  }

  if (path.charAt(path.length - 1) === `/`) {
    return path.slice(0, -1);
  }

  return path;
};

exports.default = _default;