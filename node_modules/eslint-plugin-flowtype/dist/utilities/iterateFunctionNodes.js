"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (iterator) {
  return function (context) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var nodeIterator = iterator.apply(undefined, [context].concat(rest));

    return {
      ArrowFunctionExpression: nodeIterator,
      FunctionDeclaration: nodeIterator,
      FunctionExpression: nodeIterator,
      FunctionTypeAnnotation: nodeIterator
    };
  };
};

module.exports = exports["default"];