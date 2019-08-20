// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function duplicateInputFieldMessage(fieldName: string): string {
  return `There can be only one input field named "${fieldName}".`;
}

/**
 * Unique input field names
 *
 * A GraphQL input object value is only valid if all supplied fields are
 * uniquely named.
 */
export function UniqueInputFieldNames(
  context: ASTValidationContext,
): ASTVisitor {
  const knownNameStack = [];
  let knownNames = Object.create(null);

  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = Object.create(null);
      },
      leave() {
        knownNames = knownNameStack.pop();
      },
    },
    ObjectField(node) {
      const fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(
          new GraphQLError(duplicateInputFieldMessage(fieldName), [
            knownNames[fieldName],
            node.name,
          ]),
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    },
  };
}
