"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badValueMessage = badValueMessage;
exports.badEnumValueMessage = badEnumValueMessage;
exports.requiredFieldMessage = requiredFieldMessage;
exports.unknownFieldMessage = unknownFieldMessage;
exports.ValuesOfCorrectType = ValuesOfCorrectType;

var _objectValues = _interopRequireDefault(require("../../polyfills/objectValues"));

var _GraphQLError = require("../../error/GraphQLError");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _isInvalid = _interopRequireDefault(require("../../jsutils/isInvalid"));

var _keyMap = _interopRequireDefault(require("../../jsutils/keyMap"));

var _didYouMean = _interopRequireDefault(require("../../jsutils/didYouMean"));

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function badValueMessage(typeName, valueName, message) {
  return "Expected type ".concat(typeName, ", found ").concat(valueName) + (message ? "; ".concat(message) : '.');
}

function badEnumValueMessage(typeName, valueName, suggestedValues) {
  return "Expected type ".concat(typeName, ", found ").concat(valueName, ".") + (0, _didYouMean.default)('the enum value', suggestedValues);
}

function requiredFieldMessage(typeName, fieldName, fieldTypeName) {
  return "Field ".concat(typeName, ".").concat(fieldName, " of required type ").concat(fieldTypeName, " was not provided.");
}

function unknownFieldMessage(typeName, fieldName, suggestedFields) {
  return "Field \"".concat(fieldName, "\" is not defined by type ").concat(typeName, ".") + (0, _didYouMean.default)(suggestedFields);
}
/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 */


function ValuesOfCorrectType(context) {
  return {
    NullValue: function NullValue(node) {
      var type = context.getInputType();

      if ((0, _definition.isNonNullType)(type)) {
        context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(type), (0, _printer.print)(node)), node));
      }
    },
    ListValue: function ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      var type = (0, _definition.getNullableType)(context.getParentInputType());

      if (!(0, _definition.isListType)(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      }
    },
    ObjectValue: function ObjectValue(node) {
      var type = (0, _definition.getNamedType)(context.getInputType());

      if (!(0, _definition.isInputObjectType)(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      } // Ensure every required field exists.


      var fieldNodeMap = (0, _keyMap.default)(node.fields, function (field) {
        return field.name.value;
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _objectValues.default)(type.getFields())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldDef = _step.value;
          var fieldNode = fieldNodeMap[fieldDef.name];

          if (!fieldNode && (0, _definition.isRequiredInputField)(fieldDef)) {
            var typeStr = (0, _inspect.default)(fieldDef.type);
            context.reportError(new _GraphQLError.GraphQLError(requiredFieldMessage(type.name, fieldDef.name, typeStr), node));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    ObjectField: function ObjectField(node) {
      var parentType = (0, _definition.getNamedType)(context.getParentInputType());
      var fieldType = context.getInputType();

      if (!fieldType && (0, _definition.isInputObjectType)(parentType)) {
        var suggestions = (0, _suggestionList.default)(node.name.value, Object.keys(parentType.getFields()));
        context.reportError(new _GraphQLError.GraphQLError(unknownFieldMessage(parentType.name, node.name.value, suggestions), node));
      }
    },
    EnumValue: function EnumValue(node) {
      var type = (0, _definition.getNamedType)(context.getInputType());

      if (!(0, _definition.isEnumType)(type)) {
        isValidScalar(context, node);
      } else if (!type.getValue(node.value)) {
        context.reportError(new _GraphQLError.GraphQLError(badEnumValueMessage(type.name, (0, _printer.print)(node), enumTypeSuggestion(type, node)), node));
      }
    },
    IntValue: function IntValue(node) {
      return isValidScalar(context, node);
    },
    FloatValue: function FloatValue(node) {
      return isValidScalar(context, node);
    },
    StringValue: function StringValue(node) {
      return isValidScalar(context, node);
    },
    BooleanValue: function BooleanValue(node) {
      return isValidScalar(context, node);
    }
  };
}
/**
 * Any value literal may be a valid representation of a Scalar, depending on
 * that scalar type.
 */


function isValidScalar(context, node) {
  // Report any error at the full type expected by the location.
  var locationType = context.getInputType();

  if (!locationType) {
    return;
  }

  var type = (0, _definition.getNamedType)(locationType);

  if (!(0, _definition.isScalarType)(type)) {
    var message = (0, _definition.isEnumType)(type) ? badEnumValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node), enumTypeSuggestion(type, node)) : badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node));
    context.reportError(new _GraphQLError.GraphQLError(message, node));
    return;
  } // Scalars determine if a literal value is valid via parseLiteral() which
  // may throw or return an invalid value to indicate failure.


  try {
    var parseResult = type.parseLiteral(node, undefined
    /* variables */
    );

    if ((0, _isInvalid.default)(parseResult)) {
      context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node)), node));
    }
  } catch (error) {
    // Ensure a reference to the original error is maintained.
    context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node), error.message), node, undefined, undefined, undefined, error));
  }
}

function enumTypeSuggestion(type, node) {
  var allNames = type.getValues().map(function (value) {
    return value.name;
  });
  return (0, _suggestionList.default)((0, _printer.print)(node), allNames);
}
