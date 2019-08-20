import { forEach, isCollection } from 'iterall';
import objectValues from '../polyfills/objectValues';
import inspect from '../jsutils/inspect';
import isInvalid from '../jsutils/isInvalid';
import didYouMean from '../jsutils/didYouMean';
import isObjectLike from '../jsutils/isObjectLike';
import suggestionList from '../jsutils/suggestionList';
import { GraphQLError } from '../error/GraphQLError';
import { isScalarType, isEnumType, isInputObjectType, isListType, isNonNullType } from '../type/definition';

/**
 * Coerces a JavaScript value given a GraphQL Type.
 *
 * Returns either a value which is valid for the provided type or a list of
 * encountered coercion errors.
 *
 */
export function coerceValue(value, type, blameNode, path) {
  // A value must be provided if the type is non-null.
  if (isNonNullType(type)) {
    if (value == null) {
      return ofErrors([coercionError("Expected non-nullable type ".concat(inspect(type), " not to be null"), blameNode, path)]);
    }

    return coerceValue(value, type.ofType, blameNode, path);
  }

  if (value == null) {
    // Explicitly return the value null.
    return ofValue(null);
  }

  if (isScalarType(type)) {
    // Scalars determine if a value is valid via parseValue(), which can
    // throw to indicate failure. If it throws, maintain a reference to
    // the original error.
    try {
      var parseResult = type.parseValue(value);

      if (isInvalid(parseResult)) {
        return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path)]);
      }

      return ofValue(parseResult);
    } catch (error) {
      return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path, ' ' + error.message, error)]);
    }
  }

  if (isEnumType(type)) {
    if (typeof value === 'string') {
      var enumValue = type.getValue(value);

      if (enumValue) {
        return ofValue(enumValue.value);
      }
    }

    var suggestions = suggestionList(String(value), type.getValues().map(function (enumValue) {
      return enumValue.name;
    }));
    return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path, didYouMean(suggestions))]);
  }

  if (isListType(type)) {
    var itemType = type.ofType;

    if (isCollection(value)) {
      var errors;
      var coercedValue = [];
      forEach(value, function (itemValue, index) {
        var coercedItem = coerceValue(itemValue, itemType, blameNode, atPath(path, index));

        if (coercedItem.errors) {
          errors = add(errors, coercedItem.errors);
        } else if (!errors) {
          coercedValue.push(coercedItem.value);
        }
      });
      return errors ? ofErrors(errors) : ofValue(coercedValue);
    } // Lists accept a non-list value as a list of one.


    var coercedItem = coerceValue(value, itemType, blameNode);
    return coercedItem.errors ? coercedItem : ofValue([coercedItem.value]);
  }

  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return ofErrors([coercionError("Expected type ".concat(type.name, " to be an object"), blameNode, path)]);
    }

    var _errors;

    var _coercedValue = {};
    var fields = type.getFields(); // Ensure every defined field is valid.

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = objectValues(fields)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var field = _step.value;
        var fieldValue = value[field.name];

        if (isInvalid(fieldValue)) {
          if (!isInvalid(field.defaultValue)) {
            _coercedValue[field.name] = field.defaultValue;
          } else if (isNonNullType(field.type)) {
            _errors = add(_errors, coercionError("Field ".concat(printPath(atPath(path, field.name)), " of required ") + "type ".concat(inspect(field.type), " was not provided"), blameNode));
          }
        } else {
          var coercedField = coerceValue(fieldValue, field.type, blameNode, atPath(path, field.name));

          if (coercedField.errors) {
            _errors = add(_errors, coercedField.errors);
          } else if (!_errors) {
            _coercedValue[field.name] = coercedField.value;
          }
        }
      } // Ensure every provided field is defined.

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

    for (var _i = 0, _Object$keys = Object.keys(value); _i < _Object$keys.length; _i++) {
      var fieldName = _Object$keys[_i];

      if (!fields[fieldName]) {
        var _suggestions = suggestionList(fieldName, Object.keys(fields));

        _errors = add(_errors, coercionError("Field \"".concat(fieldName, "\" is not defined by type ").concat(type.name), blameNode, path, didYouMean(_suggestions)));
      }
    }

    return _errors ? ofErrors(_errors) : ofValue(_coercedValue);
  } // Not reachable. All possible input types have been considered.

  /* istanbul ignore next */


  throw new Error("Unexpected input type: \"".concat(inspect(type), "\"."));
}

function ofValue(value) {
  return {
    errors: undefined,
    value: value
  };
}

function ofErrors(errors) {
  return {
    errors: errors,
    value: undefined
  };
}

function add(errors, moreErrors) {
  return (errors || []).concat(moreErrors);
}

function atPath(prev, key) {
  return {
    prev: prev,
    key: key
  };
}

function coercionError(message, blameNode, path, subMessage, originalError) {
  var pathStr = printPath(path);
  var fullMessage = message;

  if (pathStr) {
    fullMessage += ' at ' + pathStr;
  }

  fullMessage += subMessage ? '.' + subMessage : '.'; // Return a GraphQLError instance

  return new GraphQLError(fullMessage, blameNode, undefined, undefined, undefined, originalError);
} // Build a string describing the path into the value where the error was found


function printPath(path) {
  var pathStr = '';
  var currentPath = path;

  while (currentPath) {
    pathStr = (typeof currentPath.key === 'string' ? '.' + currentPath.key : '[' + String(currentPath.key) + ']') + pathStr;
    currentPath = currentPath.prev;
  }

  return pathStr ? 'value' + pathStr : '';
}
