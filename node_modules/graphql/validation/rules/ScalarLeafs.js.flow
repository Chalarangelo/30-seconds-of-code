// @flow strict

import inspect from '../../jsutils/inspect';
import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type FieldNode } from '../../language/ast';
import { getNamedType, isLeafType } from '../../type/definition';
import { type ASTVisitor } from '../../language/visitor';

export function noSubselectionAllowedMessage(
  fieldName: string,
  type: string,
): string {
  return `Field "${fieldName}" must not have a selection since type "${type}" has no subfields.`;
}

export function requiredSubselectionMessage(
  fieldName: string,
  type: string,
): string {
  return `Field "${fieldName}" of type "${type}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`;
}

/**
 * Scalar leafs
 *
 * A GraphQL document is valid only if all leaf fields (fields without
 * sub selections) are of scalar or enum types.
 */
export function ScalarLeafs(context: ValidationContext): ASTVisitor {
  return {
    Field(node: FieldNode) {
      const type = context.getType();
      const selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            context.reportError(
              new GraphQLError(
                noSubselectionAllowedMessage(node.name.value, inspect(type)),
                selectionSet,
              ),
            );
          }
        } else if (!selectionSet) {
          context.reportError(
            new GraphQLError(
              requiredSubselectionMessage(node.name.value, inspect(type)),
              node,
            ),
          );
        }
      }
    },
  };
}
