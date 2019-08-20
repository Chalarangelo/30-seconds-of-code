'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    any: {
      type: 'boolean'
    },
    Function: {
      type: 'boolean'
    },
    Object: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

var reportWeakType = function reportWeakType(context, weakType) {
  return function (node) {
    context.report({
      data: { weakType },
      message: 'Unexpected use of weak type "{{weakType}}"',
      node
    });
  };
};

var genericTypeEvaluator = function genericTypeEvaluator(context, _ref) {
  var checkFunction = _ref.checkFunction,
      checkObject = _ref.checkObject;

  return function (node) {
    var name = _lodash2.default.get(node, 'id.name');

    if (checkFunction && name === 'Function' || checkObject && name === 'Object') {
      reportWeakType(context, name)(node);
    }
  };
};

var create = function create(context) {
  var checkAny = _lodash2.default.get(context, 'options[0].any', true) === true;
  var checkFunction = _lodash2.default.get(context, 'options[0].Function', true) === true;
  var checkObject = _lodash2.default.get(context, 'options[0].Object', true) === true;

  var checks = {};

  if (checkAny) {
    checks.AnyTypeAnnotation = reportWeakType(context, 'any');
  }

  if (checkFunction || checkObject) {
    checks.GenericTypeAnnotation = genericTypeEvaluator(context, {
      checkFunction,
      checkObject
    });
  }

  return checks;
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];