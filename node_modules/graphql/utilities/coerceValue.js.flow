// @flow strict

import { forEach, isCollection } from 'iterall';
import objectValues from '../polyfills/objectValues';
import inspect from '../jsutils/inspect';
import isInvalid from '../jsutils/isInvalid';
import didYouMean from '../jsutils/didYouMean';
import isObjectLike from '../jsutils/isObjectLike';
import suggestionList from '../jsutils/suggestionList';
import { GraphQLError } from '../error/GraphQLError';
import { type ASTNode } from '../language/ast';
import {
  type GraphQLInputType,
  isScalarType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
} from '../type/definition';

type CoercedValue = {|
  +errors: $ReadOnlyArray<GraphQLError> | void,
  +value: mixed,
|};

type Path = {| +prev: Path | void, +key: string | number |};

/**
 * Coerces a JavaScript value given a GraphQL Type.
 *
 * Returns either a value which is valid for the provided type or a list of
 * encountered coercion errors.
 *
 */
export function coerceValue(
  value: mixed,
  type: GraphQLInputType,
  blameNode?: ASTNode,
  path?: Path,
): CoercedValue {
  // A value must be provided if the type is non-null.
  if (isNonNullType(type)) {
    if (value == null) {
      return ofErrors([
        coercionError(
          `Expected non-nullable type ${inspect(type)} not to be null`,
          blameNode,
          path,
        ),
      ]);
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
      const parseResult = type.parseValue(value);
      if (isInvalid(parseResult)) {
        return ofErrors([
          coercionError(`Expected type ${type.name}`, blameNode, path),
        ]);
      }
      return ofValue(parseResult);
    } catch (error) {
      return ofErrors([
        coercionError(
          `Expected type ${type.name}`,
          blameNode,
          path,
          ' ' + error.message,
          error,
        ),
      ]);
    }
  }

  if (isEnumType(type)) {
    if (typeof value === 'string') {
      const enumValue = type.getValue(value);
      if (enumValue) {
        return ofValue(enumValue.value);
      }
    }
    const suggestions = suggestionList(
      String(value),
      type.getValues().map(enumValue => enumValue.name),
    );
    return ofErrors([
      coercionError(
        `Expected type ${type.name}`,
        blameNode,
        path,
        didYouMean(suggestions),
      ),
    ]);
  }

  if (isListType(type)) {
    const itemType = type.ofType;
    if (isCollection(value)) {
      let errors;
      const coercedValue = [];
      forEach((value: any), (itemValue, index) => {
        const coercedItem = coerceValue(
          itemValue,
          itemType,
          blameNode,
          atPath(path, index),
        );
        if (coercedItem.errors) {
          errors = add(errors, coercedItem.errors);
        } else if (!errors) {
          coercedValue.push(coercedItem.value);
        }
      });
      return errors ? ofErrors(errors) : ofValue(coercedValue);
    }
    // Lists accept a non-list value as a list of one.
    const coercedItem = coerceValue(value, itemType, blameNode);
    return coercedItem.errors ? coercedItem : ofValue([coercedItem.value]);
  }

  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return ofErrors([
        coercionError(
          `Expected type ${type.name} to be an object`,
          blameNode,
          path,
        ),
      ]);
    }
    let errors;
    const coercedValue = {};
    const fields = type.getFields();

    // Ensure every defined field is valid.
    for (const field of objectValues(fields)) {
      const fieldValue = value[field.name];
      if (isInvalid(fieldValue)) {
        if (!isInvalid(field.defaultValue)) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          errors = add(
            errors,
            coercionError(
              `Field ${printPath(atPath(path, field.name))} of required ` +
                `type ${inspect(field.type)} was not provided`,
              blameNode,
            ),
          );
        }
      } else {
        const coercedField = coerceValue(
          fieldValue,
          field.type,
          blameNode,
          atPath(path, field.name),
        );
        if (coercedField.errors) {
          errors = add(errors, coercedField.errors);
        } else if (!errors) {
          coercedValue[field.name] = coercedField.value;
        }
      }
    }

    // Ensure every provided field is defined.
    for (const fieldName of Object.keys(value)) {
      if (!fields[fieldName]) {
        const suggestions = suggestionList(fieldName, Object.keys(fields));
        errors = add(
          errors,
          coercionError(
            `Field "${fieldName}" is not defined by type ${type.name}`,
            blameNode,
            path,
            didYouMean(suggestions),
          ),
        );
      }
    }

    return errors ? ofErrors(errors) : ofValue(coercedValue);
  }

  // Not reachable. All possible input types have been considered.
  /* istanbul ignore next */
  throw new Error(`Unexpected input type: "${inspect((type: empty))}".`);
}

function ofValue(value) {
  return { errors: undefined, value };
}

function ofErrors(errors) {
  return { errors, value: undefined };
}

function add(errors, moreErrors) {
  return (errors || []).concat(moreErrors);
}

function atPath(prev, key) {
  return { prev, key };
}

function coercionError(message, blameNode, path, subMessage, originalError) {
  const pathStr = printPath(path);
  let fullMessage = message;

  if (pathStr) {
    fullMessage += ' at ' + pathStr;
  }
  fullMessage += subMessage ? '.' + subMessage : '.';

  // Return a GraphQLError instance
  return new GraphQLError(
    fullMessage,
    blameNode,
    undefined,
    undefined,
    undefined,
    originalError,
  );
}

// Build a string describing the path into the value where the error was found
function printPath(path) {
  let pathStr = '';
  let currentPath = path;
  while (currentPath) {
    pathStr =
      (typeof currentPath.key === 'string'
        ? '.' + currentPath.key
        : '[' + String(currentPath.key) + ']') + pathStr;
    currentPath = currentPath.prev;
  }
  return pathStr ? 'value' + pathStr : '';
}
