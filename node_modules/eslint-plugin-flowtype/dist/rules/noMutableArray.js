'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

// const x = [];
var isEmptyArrayLiteral = function isEmptyArrayLiteral(node) {
  return _lodash2.default.get(node, 'init.type') === 'ArrayExpression' && _lodash2.default.get(node, 'init.elements.length') === 0;
};

// const x = new Array(); const y = Array();
var isEmptyArrayInstance = function isEmptyArrayInstance(node) {
  if (_lodash2.default.get(node, 'init.type') === 'NewExpression' || _lodash2.default.get(node, 'init.type') === 'CallExpression') {
    return _lodash2.default.get(node, 'init.callee.name') === 'Array' && _lodash2.default.get(node, 'init.arguments.length') === 0;
  } else {
    return false;
  }
};

var isAnnotationOfEmptyArrayInit = function isAnnotationOfEmptyArrayInit(node) {
  if (_lodash2.default.has(node, 'parent.parent.parent')) {
    var parent = _lodash2.default.get(node, 'parent.parent.parent');
    var isVariableDeclaration = _lodash2.default.get(parent, 'type') === 'VariableDeclarator';

    return isVariableDeclaration && (isEmptyArrayLiteral(parent) || isEmptyArrayInstance(parent));
  } else {
    return false;
  }
};

var create = function create(context) {
  return {
    ArrayTypeAnnotation(node) {
      if (!isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix(fixer) {
            var rawElementType = context.getSourceCode().getText(node.elementType);

            return fixer.replaceText(node, '$ReadOnlyArray<' + rawElementType + '>');
          },
          message: 'Use "$ReadOnlyArray" instead of array shorthand notation',
          node
        });
      }
    },
    GenericTypeAnnotation(node) {
      if (node.id.name === 'Array' && !isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node.id, '$ReadOnlyArray');
          },
          message: 'Use "$ReadOnlyArray" instead of "Array"',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];