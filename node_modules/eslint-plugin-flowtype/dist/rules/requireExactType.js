'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  return {
    TypeAlias(node) {
      var name = node.id.name,
          _node$right = node.right,
          type = _node$right.type,
          exact = _node$right.exact,
          indexers = _node$right.indexers;


      if (type === 'ObjectTypeAnnotation') {
        if (always && !exact && indexers.length === 0) {
          context.report({
            data: { name },
            message: 'Type identifier \'{{name}}\' must be exact.',
            node
          });
        }

        if (!always && exact) {
          context.report({
            data: { name },
            message: 'Type identifier \'{{name}}\' must not be exact.',
            node
          });
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];