"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require("crypto");

var _lodash = require("lodash.kebabcase");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Given a string `input` get the first `length` characters of the md5 hash of
// the `input` string. This effectively creates a "short" hash for a given
// input.
var shortHash = function shortHash(input) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return (0, _crypto.createHash)("md5").update(input).digest("hex").substr(0, length);
};

// Given `input` return the kebab case version with a short has appended.
var kebabHash = function kebabHash(path) {
  var hashLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return (0, _lodash2.default)(path) + "-" + shortHash(path, hashLength);
};

exports.default = kebabHash;
module.exports = exports["default"];