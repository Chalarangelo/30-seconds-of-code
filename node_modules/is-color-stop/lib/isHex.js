'use strict';

const hexRegex = require('hex-color-regex');

function isHex(str) {
  return hexRegex({ exact: true }).test(str);
}

module.exports = isHex;
