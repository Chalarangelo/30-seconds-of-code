// @flow strict

import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';
import { isEnumType } from '../../type/definition';

export function duplicateEnumValueNameMessage(
  typeName: string,
  valueName: string,
): string {
  return `Enum value "${typeName}.${valueName}" can only be defined once.`;
}

export function existedEnumValueNameMessage(
  typeName: string,
  valueName: string,
): string {
  return `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`;
}

/**
 * Unique enum value names
 *
 * A GraphQL enum type is only valid if all its values are uniquely named.
 */
export function UniqueEnumValueNames(
  context: SDLValidationContext,
): ASTVisitor {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownValueNames = Object.create(null);

  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness,
  };

  function checkValueUniqueness(node) {
    const typeName = node.name.value;

    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = Object.create(null);
    }

    if (node.values) {
      const valueNames = knownValueNames[typeName];

      for (const valueDef of node.values) {
        const valueName = valueDef.name.value;

        const existingType = existingTypeMap[typeName];
        if (isEnumType(existingType) && existingType.getValue(valueName)) {
          context.reportError(
            new GraphQLError(
              existedEnumValueNameMessage(typeName, valueName),
              valueDef.name,
            ),
          );
        } else if (valueNames[valueName]) {
          context.reportError(
            new GraphQLError(
              duplicateEnumValueNameMessage(typeName, valueName),
              [valueNames[valueName], valueDef.name],
            ),
          );
        } else {
          valueNames[valueName] = valueDef.name;
        }
      }
    }

    return false;
  }
}
