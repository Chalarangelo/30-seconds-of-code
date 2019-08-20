'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    excludeVariableMatch: {
      type: 'string'
    },
    excludeVariableTypes: {
      additionalProperties: false,
      properties: {
        const: {
          type: 'boolean'
        },
        let: {
          type: 'boolean'
        },
        var: {
          type: 'boolean'
        }
      },
      type: 'object'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var checkThisFile = !_lodash2.default.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

  if (!checkThisFile) {
    return function () {};
  }

  var excludeVariableMatch = new RegExp(_lodash2.default.get(context, 'options[0].excludeVariableMatch', 'a^'));
  var excludeVariableTypes = _lodash2.default.get(context, 'options[0].excludeVariableTypes', {});

  return {
    VariableDeclaration: function VariableDeclaration(variableDeclaration) {
      var variableType = _lodash2.default.get(variableDeclaration, 'kind');

      if (_lodash2.default.get(excludeVariableTypes, variableType)) {
        return;
      }

      _lodash2.default.forEach(variableDeclaration.declarations, function (variableDeclarator) {
        var identifierNode = _lodash2.default.get(variableDeclarator, 'id');
        var identifierName = _lodash2.default.get(identifierNode, 'name');

        if (excludeVariableMatch.test(identifierName)) {
          return;
        }

        var typeAnnotation = _lodash2.default.get(identifierNode, 'typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: (0, _utilities.quoteName)(identifierName)
            },
            message: 'Missing {{name}}variable type annotation.',
            node: identifierNode
          });
        }
      });
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];