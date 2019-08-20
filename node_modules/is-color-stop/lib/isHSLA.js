'use strict';

const hslaRegex = require('hsla-regex');

function isHSLA(str) {
  return hslaRegex({ exact: true }).test(str);
}

module.exports = isHSLA;
