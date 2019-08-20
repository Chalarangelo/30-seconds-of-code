'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTokenAfterParens = function getTokenAfterParens(sourceCode, node) {
  var token = void 0;

  token = sourceCode.getTokenAfter(node);

  while (token.type === 'Punctuator' && token.value === ')') {
    token = sourceCode.getTokenAfter(token);
  }

  return token;
};

exports.default = getTokenAfterParens;
module.exports = exports['default'];