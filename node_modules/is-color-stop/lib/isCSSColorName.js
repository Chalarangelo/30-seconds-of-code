'use strict';

const colorNames = require('css-color-names');

function isCSSColorName(str) {
  return !!colorNames[str];
}

module.exports = isCSSColorName;
