'use strict';

const hslRegex = require('hsl-regex');

function isHSL(str) {
  return hslRegex({ exact: true }).test(str);
}

module.exports = isHSL;
