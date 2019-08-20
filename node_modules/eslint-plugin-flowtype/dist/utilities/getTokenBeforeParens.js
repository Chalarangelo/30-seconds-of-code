'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTokenBeforeParens = function getTokenBeforeParens(sourceCode, node) {
  var token = void 0;

  token = sourceCode.getTokenBefore(node);

  while (token.type === 'Punctuator' && token.value === '(') {
    token = sourceCode.getTokenBefore(token);
  }

  return token;
};

exports.default = getTokenBeforeParens;
module.exports = exports['default'];