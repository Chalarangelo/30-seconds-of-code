'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (identifierNode, context) {
  if (_lodash2.default.has(identifierNode, 'name')) {
    return identifierNode.name;
  }

  if (_lodash2.default.has(identifierNode, 'left.name')) {
    return identifierNode.left.name;
  }

  if (_lodash2.default.has(identifierNode, 'key.name')) {
    return identifierNode.key.name;
  }

  if (identifierNode.type === 'RestElement') {
    return identifierNode.argument.name;
  }

  if (identifierNode.type === 'ObjectTypeProperty') {
    var tokenIndex = void 0;

    tokenIndex = 0;

    if (identifierNode.static) {
      tokenIndex++;
    }

    if (identifierNode.variance) {
      tokenIndex++;
    }

    return context.getSourceCode().getFirstToken(identifierNode, tokenIndex).value;
  }

  if (identifierNode.type === 'FunctionTypeParam') {
    return context.getSourceCode().getFirstToken(identifierNode).value;
  }

  if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
    var text = context.getSourceCode().getText(identifierNode);

    if (identifierNode.typeAnnotation) {
      return text.replace(context.getSourceCode().getText(identifierNode.typeAnnotation), '').trim();
    } else {
      return text;
    }
  }
  if (_lodash2.default.get(identifierNode, 'left.type') === 'ObjectPattern') {
    return context.getSourceCode().getText(identifierNode.left);
  }

  return null;
};

module.exports = exports['default'];