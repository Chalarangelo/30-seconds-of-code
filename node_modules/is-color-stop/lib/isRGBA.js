'use strict';

const rgbaRegex = require('rgba-regex');

function isRgba(str) {
  return rgbaRegex({ exact: true }).test(str);
}

module.exports = isRgba;
