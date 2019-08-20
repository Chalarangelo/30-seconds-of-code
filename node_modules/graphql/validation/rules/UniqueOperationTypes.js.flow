// @flow strict

import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function duplicateOperationTypeMessage(operation: string): string {
  return `There can be only one ${operation} type in schema.`;
}

export function existedOperationTypeMessage(operation: string): string {
  return `Type for ${operation} already defined in the schema. It cannot be redefined.`;
}

/**
 * Unique operation types
 *
 * A GraphQL document is only valid if it has only one type per operation.
 */
export function UniqueOperationTypes(
  context: SDLValidationContext,
): ASTVisitor {
  const schema = context.getSchema();
  const definedOperationTypes = Object.create(null);
  const existingOperationTypes = schema
    ? {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
      }
    : {};

  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes,
  };

  function checkOperationTypes(node) {
    if (node.operationTypes) {
      for (const operationType of node.operationTypes || []) {
        const operation = operationType.operation;
        const alreadyDefinedOperationType = definedOperationTypes[operation];

        if (existingOperationTypes[operation]) {
          context.reportError(
            new GraphQLError(
              existedOperationTypeMessage(operation),
              operationType,
            ),
          );
        } else if (alreadyDefinedOperationType) {
          context.reportError(
            new GraphQLError(duplicateOperationTypeMessage(operation), [
              alreadyDefinedOperationType,
              operationType,
            ]),
          );
        } else {
          definedOperationTypes[operation] = operationType;
        }
      }
    }

    return false;
  }
}
