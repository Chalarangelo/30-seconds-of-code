'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  annotationStyle: 'none'
};

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return (/@(?:no)?flo/i.test(comment)
  );
};

var isValidAnnotationStyle = function isValidAnnotationStyle(node, style) {
  if (style === 'none') {
    return true;
  }

  return style === node.type.toLowerCase();
};

var checkAnnotationSpelling = function checkAnnotationSpelling(comment) {
  return (/@[a-z]+\b/.test(comment) && (0, _utilities.fuzzyStringMatch)(comment.replace(/no/i, ''), '@flow', 0.20)
  );
};

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    annotationStyle: {
      enum: ['none', 'line', 'block'],
      type: 'string'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var always = context.options[0] === 'always';
  var style = _lodash2.default.get(context, 'options[1].annotationStyle', defaults.annotationStyle);

  return {
    Program(node) {
      var firstToken = node.tokens[0];

      var addAnnotation = function addAnnotation() {
        return function (fixer) {
          var annotation = ['line', 'none'].includes(style) ? '// @flow\n' : '/* @flow */\n';

          return fixer.replaceTextRange([node.start, node.start], annotation);
        };
      };

      var potentialFlowFileAnnotation = _lodash2.default.find(context.getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.start < potentialFlowFileAnnotation.start) {
          context.report(potentialFlowFileAnnotation, 'Flow file annotation not at the top of the file.');
        }

        if ((0, _utilities.isFlowFileAnnotation)(potentialFlowFileAnnotation.value.trim())) {
          if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
            var str = style === 'line' ? '`// ' + potentialFlowFileAnnotation.value.trim() + '`' : '`/* ' + potentialFlowFileAnnotation.value.trim() + ' */`';

            context.report(potentialFlowFileAnnotation, 'Flow file annotation style must be ' + str);
          }
        } else if (checkAnnotationSpelling(potentialFlowFileAnnotation.value.trim())) {
          context.report(potentialFlowFileAnnotation, 'Misspelled or malformed Flow file annotation.');
        } else {
          context.report(potentialFlowFileAnnotation, 'Malformed Flow file annotation.');
        }
      } else if (always) {
        context.report({
          fix: addAnnotation(),
          message: 'Flow file annotation is missing.',
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