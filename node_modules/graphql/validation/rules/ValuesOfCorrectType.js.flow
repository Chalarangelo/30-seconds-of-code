// @flow strict

import objectValues from '../../polyfills/objectValues';
import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ValueNode } from '../../language/ast';
import { print } from '../../language/printer';
import { type ASTVisitor } from '../../language/visitor';
import {
  isScalarType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isRequiredInputField,
  getNullableType,
  getNamedType,
} from '../../type/definition';
import inspect from '../../jsutils/inspect';
import isInvalid from '../../jsutils/isInvalid';
import keyMap from '../../jsutils/keyMap';
import didYouMean from '../../jsutils/didYouMean';
import suggestionList from '../../jsutils/suggestionList';

export function badValueMessage(
  typeName: string,
  valueName: string,
  message?: string,
): string {
  return (
    `Expected type ${typeName}, found ${valueName}` +
    (message ? `; ${message}` : '.')
  );
}

export function badEnumValueMessage(
  typeName: string,
  valueName: string,
  suggestedValues: $ReadOnlyArray<string>,
) {
  return (
    `Expected type ${typeName}, found ${valueName}.` +
    didYouMean('the enum value', suggestedValues)
  );
}

export function requiredFieldMessage(
  typeName: string,
  fieldName: string,
  fieldTypeName: string,
): string {
  return `Field ${typeName}.${fieldName} of required type ${fieldTypeName} was not provided.`;
}

export function unknownFieldMessage(
  typeName: string,
  fieldName: string,
  suggestedFields: $ReadOnlyArray<string>,
): string {
  return (
    `Field "${fieldName}" is not defined by type ${typeName}.` +
    didYouMean(suggestedFields)
  );
}

/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 */
export function ValuesOfCorrectType(context: ValidationContext): ASTVisitor {
  return {
    NullValue(node) {
      const type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(
          new GraphQLError(badValueMessage(inspect(type), print(node)), node),
        );
      }
    },
    ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      const type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      }
    },
    ObjectValue(node) {
      const type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      }
      // Ensure every required field exists.
      const fieldNodeMap = keyMap(node.fields, field => field.name.value);
      for (const fieldDef of objectValues(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect(fieldDef.type);
          context.reportError(
            new GraphQLError(
              requiredFieldMessage(type.name, fieldDef.name, typeStr),
              node,
            ),
          );
        }
      }
    },
    ObjectField(node) {
      const parentType = getNamedType(context.getParentInputType());
      const fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields()),
        );
        context.reportError(
          new GraphQLError(
            unknownFieldMessage(parentType.name, node.name.value, suggestions),
            node,
          ),
        );
      }
    },
    EnumValue(node) {
      const type = getNamedType(context.getInputType());
      if (!isEnumType(type)) {
        isValidScalar(context, node);
      } else if (!type.getValue(node.value)) {
        context.reportError(
          new GraphQLError(
            badEnumValueMessage(
              type.name,
              print(node),
              enumTypeSuggestion(type, node),
            ),
            node,
          ),
        );
      }
    },
    IntValue: node => isValidScalar(context, node),
    FloatValue: node => isValidScalar(context, node),
    StringValue: node => isValidScalar(context, node),
    BooleanValue: node => isValidScalar(context, node),
  };
}

/**
 * Any value literal may be a valid representation of a Scalar, depending on
 * that scalar type.
 */
function isValidScalar(context: ValidationContext, node: ValueNode): void {
  // Report any error at the full type expected by the location.
  const locationType = context.getInputType();
  if (!locationType) {
    return;
  }

  const type = getNamedType(locationType);

  if (!isScalarType(type)) {
    const message = isEnumType(type)
      ? badEnumValueMessage(
          inspect(locationType),
          print(node),
          enumTypeSuggestion(type, node),
        )
      : badValueMessage(inspect(locationType), print(node));
    context.reportError(new GraphQLError(message, node));
    return;
  }

  // Scalars determine if a literal value is valid via parseLiteral() which
  // may throw or return an invalid value to indicate failure.
  try {
    const parseResult = type.parseLiteral(node, undefined /* variables */);
    if (isInvalid(parseResult)) {
      context.reportError(
        new GraphQLError(
          badValueMessage(inspect(locationType), print(node)),
          node,
        ),
      );
    }
  } catch (error) {
    // Ensure a reference to the original error is maintained.
    context.reportError(
      new GraphQLError(
        badValueMessage(inspect(locationType), print(node), error.message),
        node,
        undefined,
        undefined,
        undefined,
        error,
      ),
    );
  }
}

function enumTypeSuggestion(type, node) {
  const allNames = type.getValues().map(value => value.name);
  return suggestionList(print(node), allNames);
}
