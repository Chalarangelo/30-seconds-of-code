'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    annotateUndefined: {
      enum: ['always', 'never'],
      type: 'string'
    },
    excludeArrowFunctions: {
      enum: [false, true, 'expressionsOnly']
    },
    excludeMatching: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    includeOnlyMatching: {
      items: {
        type: 'string'
      },
      type: 'array'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var annotateReturn = (_lodash2.default.get(context, 'options[0]') || 'always') === 'always';
  var annotateUndefined = (_lodash2.default.get(context, 'options[1].annotateUndefined') || 'never') === 'always';
  var skipArrows = _lodash2.default.get(context, 'options[1].excludeArrowFunctions') || false;

  var makeRegExp = function makeRegExp(str) {
    return new RegExp(str);
  };

  var excludeMatching = _lodash2.default.get(context, 'options[1].excludeMatching', []).map(makeRegExp);
  var includeOnlyMatching = _lodash2.default.get(context, 'options[1].includeOnlyMatching', []).map(makeRegExp);

  var targetNodes = [];

  var registerFunction = function registerFunction(functionNode) {
    targetNodes.push({
      functionNode
    });
  };

  var isUndefinedReturnType = function isUndefinedReturnType(returnNode) {
    return returnNode.argument === null || returnNode.argument.name === 'undefined' || returnNode.argument.operator === 'void';
  };

  var getIsReturnTypeAnnotationUndefined = function getIsReturnTypeAnnotationUndefined(targetNode) {
    var isReturnTypeAnnotationLiteralUndefined = _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.id.name') === 'undefined' && _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'GenericTypeAnnotation';
    var isReturnTypeAnnotationVoid = _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'VoidTypeAnnotation';

    return isReturnTypeAnnotationLiteralUndefined || isReturnTypeAnnotationVoid;
  };

  var shouldFilterNode = function shouldFilterNode(functionNode) {
    var isArrow = functionNode.type === 'ArrowFunctionExpression';
    var isMethod = functionNode.parent && functionNode.parent.type === 'MethodDefinition';
    var isProperty = functionNode.parent && functionNode.parent.type === 'ClassProperty';
    var selector = void 0;

    if (isMethod || isProperty) {
      selector = 'parent.key.name';
    } else if (isArrow) {
      selector = 'parent.id.name';
    } else {
      selector = 'id.name';
    }
    var identifierName = _lodash2.default.get(functionNode, selector);

    var checkRegExp = function checkRegExp(regex) {
      return regex.test(identifierName);
    };

    if (excludeMatching.length && _lodash2.default.some(excludeMatching, checkRegExp)) {
      return true;
    }

    if (includeOnlyMatching.length && !_lodash2.default.some(includeOnlyMatching, checkRegExp)) {
      return true;
    }

    return false;
  };

  var evaluateFunction = function evaluateFunction(functionNode) {
    var targetNode = targetNodes.pop();

    if (functionNode !== targetNode.functionNode) {
      throw new Error('Mismatch.');
    }

    var isArrow = functionNode.type === 'ArrowFunctionExpression';
    var isArrowFunctionExpression = functionNode.expression;
    var hasImplicitReturnType = functionNode.async || functionNode.generator;
    var isFunctionReturnUndefined = !isArrowFunctionExpression && !hasImplicitReturnType && (!targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode));
    var isReturnTypeAnnotationUndefined = getIsReturnTypeAnnotationUndefined(targetNode);

    if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
      return;
    }
    if (shouldFilterNode(functionNode)) {
      return;
    }
    if (isFunctionReturnUndefined && isReturnTypeAnnotationUndefined && !annotateUndefined) {
      context.report(functionNode, 'Must not annotate undefined return type.');
    } else if (isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateUndefined) {
      context.report(functionNode, 'Must annotate undefined return type.');
    } else if (!isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateReturn && !functionNode.returnType) {
      context.report(functionNode, 'Missing return type annotation.');
    }
  };

  var evaluateNoise = function evaluateNoise() {
    targetNodes.pop();
  };

  return {
    ArrowFunctionExpression: registerFunction,
    'ArrowFunctionExpression:exit': evaluateFunction,
    ClassDeclaration: registerFunction,
    'ClassDeclaration:exit': evaluateNoise,
    ClassExpression: registerFunction,
    'ClassExpression:exit': evaluateNoise,
    FunctionDeclaration: registerFunction,
    'FunctionDeclaration:exit': evaluateFunction,
    FunctionExpression: registerFunction,
    'FunctionExpression:exit': evaluateFunction,
    ReturnStatement: function ReturnStatement(node) {
      if (targetNodes.length) {
        targetNodes[targetNodes.length - 1].returnStatementNode = node;
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];