'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (node) {
    var declarations = _lodash2.default.get(node, 'declarations', []);

    _lodash2.default.forEach(declarations, function (leaf) {
      var typeAnnotation = _lodash2.default.get(leaf, 'id.typeAnnotation');

      if (typeAnnotation) {
        report({
          colon: sourceCode.getFirstToken(typeAnnotation),
          name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(leaf, context)),
          node: leaf,
          type: node.kind + ' type annotation'
        });
      }
    });
  };
};

module.exports = exports['default'];