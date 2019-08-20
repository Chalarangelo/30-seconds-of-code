// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type OperationDefinitionNode } from '../../language/ast';
import { type ASTVisitor } from '../../language/visitor';

export function singleFieldOnlyMessage(name: ?string): string {
  return name
    ? `Subscription "${name}" must select only one top level field.`
    : 'Anonymous Subscription must select only one top level field.';
}

/**
 * Subscriptions must only include one field.
 *
 * A GraphQL subscription is valid only if it contains a single root field.
 */
export function SingleFieldSubscriptions(
  context: ASTValidationContext,
): ASTVisitor {
  return {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.operation === 'subscription') {
        if (node.selectionSet.selections.length !== 1) {
          context.reportError(
            new GraphQLError(
              singleFieldOnlyMessage(node.name && node.name.value),
              node.selectionSet.selections.slice(1),
            ),
          );
        }
      }
    },
  };
}
