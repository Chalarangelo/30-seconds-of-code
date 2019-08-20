'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return (/@(?:no)?flo/i.test(comment)
  );
};

var schema = [{
  enum: ['always', 'always-windows', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var mode = context.options[0];
  var never = mode === 'never';

  var newline = mode === 'always-windows' ? '\r\n' : '\n';

  return {
    Program(node) {
      var sourceCode = context.getSourceCode();

      var potentialFlowFileAnnotation = _lodash2.default.find(context.getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        var line = potentialFlowFileAnnotation.loc.end.line;
        var nextLineIsEmpty = sourceCode.lines[line] === '';

        if (!never && !nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              return fixer.insertTextAfter(potentialFlowFileAnnotation, newline);
            },
            message: 'Expected newline after flow annotation',
            node
          });
        }

        if (never && nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              var lineBreak = sourceCode.text[potentialFlowFileAnnotation.end];

              return fixer.replaceTextRange([potentialFlowFileAnnotation.end, potentialFlowFileAnnotation.end + (lineBreak === '\r' ? 2 : 1)], '');
            },
            message: 'Expected no newline after flow annotation',
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