'use strict';
const { coerce, lte } = require('semver');
const modulesByVersions = require('./modules-by-versions');

module.exports = function (raw) {
  const corejs = coerce(String(raw));
  if (corejs.major !== 3) {
    throw RangeError('This version of `core-js-compat` works only with `core-js@3`.');
  }
  const result = [];
  for (const version of Object.keys(modulesByVersions)) {
    if (lte(coerce(version), corejs)) {
      result.push(...modulesByVersions[version]);
    }
  }
  return result;
};
