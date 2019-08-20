'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSimpleType = require('./isSimpleType');

var _isSimpleType2 = _interopRequireDefault(_isSimpleType);

var _needWrap = require('./needWrap');

var _needWrap2 = _interopRequireDefault(_needWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['verbose', 'shorthand'],
  type: 'string'
}];

var inlineType = function inlineType(type) {
  var inlined = type.replace(/\s+/g, ' ');

  if (inlined.length <= 50) {
    return inlined;
  } else {
    return 'Type';
  }
};

exports.default = function (defaultConfig, simpleType) {
  var create = function create(context) {
    var verbose = (context.options[0] || defaultConfig) === 'verbose';

    return {
      // shorthand
      ArrayTypeAnnotation(node) {
        var rawElementType = context.getSourceCode().getText(node.elementType);
        var inlinedType = inlineType(rawElementType);
        var wrappedInlinedType = (0, _needWrap2.default)(node.elementType) ? '(' + inlinedType + ')' : inlinedType;

        if ((0, _isSimpleType2.default)(node.elementType) === simpleType && verbose) {
          context.report({
            data: {
              type: inlinedType,
              wrappedType: wrappedInlinedType
            },
            fix(fixer) {
              return fixer.replaceText(node, 'Array<' + rawElementType + '>');
            },
            message: 'Use "Array<{{ type }}>", not "{{ wrappedType }}[]"',
            node
          });
        }
      },

      // verbose
      GenericTypeAnnotation(node) {
        if (node.id.name === 'Array') {
          if (node.typeParameters.params.length === 1) {
            var elementTypeNode = node.typeParameters.params[0];
            var rawElementType = context.getSourceCode().getText(elementTypeNode);
            var inlinedType = inlineType(rawElementType);
            var wrappedInlinedType = (0, _needWrap2.default)(elementTypeNode) ? '(' + inlinedType + ')' : inlinedType;

            if ((0, _isSimpleType2.default)(elementTypeNode) === simpleType && !verbose) {
              context.report({
                data: {
                  type: inlinedType,
                  wrappedType: wrappedInlinedType
                },
                fix(fixer) {
                  if ((0, _needWrap2.default)(elementTypeNode)) {
                    return fixer.replaceText(node, '(' + rawElementType + ')[]');
                  } else {
                    return fixer.replaceText(node, rawElementType + '[]');
                  }
                },
                message: 'Use "{{ wrappedType }}[]", not "Array<{{ type }}>"',
                node
              });
            }
          }
        }
      }
    };
  };

  return {
    create,
    schema
  };
};

module.exports = exports['default'];