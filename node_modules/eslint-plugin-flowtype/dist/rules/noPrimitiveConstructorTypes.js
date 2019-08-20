'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = function create(context) {
  var regex = /^(Boolean|Number|String)$/;

  return {
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      var name = _lodash2.default.get(node, 'id.name');

      if (regex.test(name)) {
        context.report({
          data: {
            name
          },
          loc: node.loc,
          message: 'Unexpected use of {{name}} constructor type.',
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