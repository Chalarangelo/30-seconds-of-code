import objectValues from '../../polyfills/objectValues';
import { GraphQLError } from '../../error/GraphQLError';
import { print } from '../../language/printer';
import { isScalarType, isEnumType, isInputObjectType, isListType, isNonNullType, isRequiredInputField, getNullableType, getNamedType } from '../../type/definition';
import inspect from '../../jsutils/inspect';
import isInvalid from '../../jsutils/isInvalid';
import keyMap from '../../jsutils/keyMap';
import didYouMean from '../../jsutils/didYouMean';
import suggestionList from '../../jsutils/suggestionList';
export function badValueMessage(typeName, valueName, message) {
  return "Expected type ".concat(typeName, ", found ").concat(valueName) + (message ? "; ".concat(message) : '.');
}
export function badEnumValueMessage(typeName, valueName, suggestedValues) {
  return "Expected type ".concat(typeName, ", found ").concat(valueName, ".") + didYouMean('the enum value', suggestedValues);
}
export function requiredFieldMessage(typeName, fieldName, fieldTypeName) {
  return "Field ".concat(typeName, ".").concat(fieldName, " of required type ").concat(fieldTypeName, " was not provided.");
}
export function unknownFieldMessage(typeName, fieldName, suggestedFields) {
  return "Field \"".concat(fieldName, "\" is not defined by type ").concat(typeName, ".") + didYouMean(suggestedFields);
}
/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 */

export function ValuesOfCorrectType(context) {
  return {
    NullValue: function NullValue(node) {
      var type = context.getInputType();

      if (isNonNullType(type)) {
        context.reportError(new GraphQLError(badValueMessage(inspect(type), print(node)), node));
      }
    },
    ListValue: function ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      var type = getNullableType(context.getParentInputType());

      if (!isListType(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      }
    },
    ObjectValue: function ObjectValue(node) {
      var type = getNamedType(context.getInputType());

      if (!isInputObjectType(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      } // Ensure every required field exists.


      var fieldNodeMap = keyMap(node.fields, function (field) {
        return field.name.value;
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = objectValues(type.getFields())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldDef = _step.value;
          var fieldNode = fieldNodeMap[fieldDef.name];

          if (!fieldNode && isRequiredInputField(fieldDef)) {
            var typeStr = inspect(fieldDef.type);
            context.reportError(new GraphQLError(requiredFieldMessage(type.name, fieldDef.name, typeStr), node));
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
      var parentType = getNamedType(context.getParentInputType());
      var fieldType = context.getInputType();

      if (!fieldType && isInputObjectType(parentType)) {
        var suggestions = suggestionList(node.name.value, Object.keys(parentType.getFields()));
        context.reportError(new GraphQLError(unknownFieldMessage(parentType.name, node.name.value, suggestions), node));
      }
    },
    EnumValue: function EnumValue(node) {
      var type = getNamedType(context.getInputType());

      if (!isEnumType(type)) {
        isValidScalar(context, node);
      } else if (!type.getValue(node.value)) {
        context.reportError(new GraphQLError(badEnumValueMessage(type.name, print(node), enumTypeSuggestion(type, node)), node));
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

  var type = getNamedType(locationType);

  if (!isScalarType(type)) {
    var message = isEnumType(type) ? badEnumValueMessage(inspect(locationType), print(node), enumTypeSuggestion(type, node)) : badValueMessage(inspect(locationType), print(node));
    context.reportError(new GraphQLError(message, node));
    return;
  } // Scalars determine if a literal value is valid via parseLiteral() which
  // may throw or return an invalid value to indicate failure.


  try {
    var parseResult = type.parseLiteral(node, undefined
    /* variables */
    );

    if (isInvalid(parseResult)) {
      context.reportError(new GraphQLError(badValueMessage(inspect(locationType), print(node)), node));
    }
  } catch (error) {
    // Ensure a reference to the original error is maintained.
    context.reportError(new GraphQLError(badValueMessage(inspect(locationType), print(node), error.message), node, undefined, undefined, undefined, error));
  }
}

function enumTypeSuggestion(type, node) {
  var allNames = type.getValues().map(function (value) {
    return value.name;
  });
  return suggestionList(print(node), allNames);
}
