// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function duplicateArgMessage(argName: string): string {
  return `There can be only one argument named "${argName}".`;
}

/**
 * Unique argument names
 *
 * A GraphQL field or directive is only valid if all supplied arguments are
 * uniquely named.
 */
export function UniqueArgumentNames(context: ASTValidationContext): ASTVisitor {
  let knownArgNames = Object.create(null);
  return {
    Field() {
      knownArgNames = Object.create(null);
    },
    Directive() {
      knownArgNames = Object.create(null);
    },
    Argument(node) {
      const argName = node.name.value;
      if (knownArgNames[argName]) {
        context.reportError(
          new GraphQLError(duplicateArgMessage(argName), [
            knownArgNames[argName],
            node.name,
          ]),
        );
      } else {
        knownArgNames[argName] = node.name;
      }
      return false;
    },
  };
}
