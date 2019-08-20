// @flow strict

import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import suggestionList from '../../jsutils/suggestionList';
import didYouMean from '../../jsutils/didYouMean';
import { type FieldNode } from '../../language/ast';
import { type ASTVisitor } from '../../language/visitor';
import { type GraphQLSchema } from '../../type/schema';
import {
  type GraphQLOutputType,
  isObjectType,
  isInterfaceType,
  isAbstractType,
} from '../../type/definition';

export function undefinedFieldMessage(
  fieldName: string,
  type: string,
  suggestedTypeNames: $ReadOnlyArray<string>,
  suggestedFieldNames: $ReadOnlyArray<string>,
): string {
  const quotedTypeNames = suggestedTypeNames.map(x => `"${x}"`);
  const quotedFieldNames = suggestedFieldNames.map(x => `"${x}"`);
  return (
    `Cannot query field "${fieldName}" on type "${type}".` +
    (didYouMean('to use an inline fragment on', quotedTypeNames) ||
      didYouMean(quotedFieldNames))
  );
}

/**
 * Fields on correct type
 *
 * A GraphQL document is only valid if all fields selected are defined by the
 * parent type, or are an allowed meta field such as __typename.
 */
export function FieldsOnCorrectType(context: ValidationContext): ASTVisitor {
  return {
    Field(node: FieldNode) {
      const type = context.getParentType();
      if (type) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          // This field doesn't exist, lets look for suggestions.
          const schema = context.getSchema();
          const fieldName = node.name.value;
          // First determine if there are any suggested types to condition on.
          const suggestedTypeNames = getSuggestedTypeNames(
            schema,
            type,
            fieldName,
          );
          // If there are no suggested types, then perhaps this was a typo?
          const suggestedFieldNames =
            suggestedTypeNames.length !== 0
              ? []
              : getSuggestedFieldNames(schema, type, fieldName);

          // Report an error, including helpful suggestions.
          context.reportError(
            new GraphQLError(
              undefinedFieldMessage(
                fieldName,
                type.name,
                suggestedTypeNames,
                suggestedFieldNames,
              ),
              node,
            ),
          );
        }
      }
    },
  };
}

/**
 * Go through all of the implementations of type, as well as the interfaces that
 * they implement. If any of those types include the provided field, suggest
 * them, sorted by how often the type is referenced, starting with Interfaces.
 */
function getSuggestedTypeNames(
  schema: GraphQLSchema,
  type: GraphQLOutputType,
  fieldName: string,
): Array<string> {
  if (isAbstractType(type)) {
    const suggestedObjectTypes = [];
    const interfaceUsageCount = Object.create(null);
    for (const possibleType of schema.getPossibleTypes(type)) {
      if (!possibleType.getFields()[fieldName]) {
        continue;
      }
      // This object type defines this field.
      suggestedObjectTypes.push(possibleType.name);
      for (const possibleInterface of possibleType.getInterfaces()) {
        if (!possibleInterface.getFields()[fieldName]) {
          continue;
        }
        // This interface type defines this field.
        interfaceUsageCount[possibleInterface.name] =
          (interfaceUsageCount[possibleInterface.name] || 0) + 1;
      }
    }

    // Suggest interface types based on how common they are.
    const suggestedInterfaceTypes = Object.keys(interfaceUsageCount).sort(
      (a, b) => interfaceUsageCount[b] - interfaceUsageCount[a],
    );

    // Suggest both interface and object types.
    return suggestedInterfaceTypes.concat(suggestedObjectTypes);
  }

  // Otherwise, must be an Object type, which does not have possible fields.
  return [];
}

/**
 * For the field name provided, determine if there are any similar field names
 * that may be the result of a typo.
 */
function getSuggestedFieldNames(
  schema: GraphQLSchema,
  type: GraphQLOutputType,
  fieldName: string,
): Array<string> {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  // Otherwise, must be a Union type, which does not define fields.
  return [];
}
