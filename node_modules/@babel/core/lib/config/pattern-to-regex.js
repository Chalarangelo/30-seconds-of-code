"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathToPattern;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _escapeRegExp() {
  const data = _interopRequireDefault(require("lodash/escapeRegExp"));

  _escapeRegExp = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sep = `\\${_path().default.sep}`;
const endSep = `(?:${sep}|$)`;
const substitution = `[^${sep}]+`;
const starPat = `(?:${substitution}${sep})`;
const starPatLast = `(?:${substitution}${endSep})`;
const starStarPat = `${starPat}*?`;
const starStarPatLast = `${starPat}*?${starPatLast}?`;

function pathToPattern(pattern, dirname) {
  const parts = _path().default.resolve(dirname, pattern).split(_path().default.sep);

  return new RegExp(["^", ...parts.map((part, i) => {
    const last = i === parts.length - 1;
    if (part === "**") return last ? starStarPatLast : starStarPat;
    if (part === "*") return last ? starPatLast : starPat;

    if (part.indexOf("*.") === 0) {
      return substitution + (0, _escapeRegExp().default)(part.slice(1)) + (last ? endSep : sep);
    }

    return (0, _escapeRegExp().default)(part) + (last ? endSep : sep);
  })].join(""));
}