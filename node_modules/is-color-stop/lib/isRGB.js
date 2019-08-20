'use strict';

const rgbRegex = require('rgb-regex');

function isRGB(str) {
  return rgbRegex({ exact: true }).test(str);
}

module.exports = isRGB;
