// @flow strict

import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';
import {
  isObjectType,
  isInterfaceType,
  isInputObjectType,
} from '../../type/definition';

export function duplicateFieldDefinitionNameMessage(
  typeName: string,
  fieldName: string,
): string {
  return `Field "${typeName}.${fieldName}" can only be defined once.`;
}

export function existedFieldDefinitionNameMessage(
  typeName: string,
  fieldName: string,
): string {
  return `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`;
}

/**
 * Unique field definition names
 *
 * A GraphQL complex type is only valid if all its fields are uniquely named.
 */
export function UniqueFieldDefinitionNames(
  context: SDLValidationContext,
): ASTVisitor {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownFieldNames = Object.create(null);

  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness,
  };

  function checkFieldUniqueness(node) {
    const typeName = node.name.value;

    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = Object.create(null);
    }

    if (node.fields) {
      const fieldNames = knownFieldNames[typeName];

      for (const fieldDef of node.fields) {
        const fieldName = fieldDef.name.value;

        if (hasField(existingTypeMap[typeName], fieldName)) {
          context.reportError(
            new GraphQLError(
              existedFieldDefinitionNameMessage(typeName, fieldName),
              fieldDef.name,
            ),
          );
        } else if (fieldNames[fieldName]) {
          context.reportError(
            new GraphQLError(
              duplicateFieldDefinitionNameMessage(typeName, fieldName),
              [fieldNames[fieldName], fieldDef.name],
            ),
          );
        } else {
          fieldNames[fieldName] = fieldDef.name;
        }
      }
    }

    return false;
  }
}

function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName];
  }
  return false;
}
