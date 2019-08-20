// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { Kind } from '../../language/kinds';
import { isExecutableDefinitionNode } from '../../language/predicates';
import { type ASTVisitor } from '../../language/visitor';

export function nonExecutableDefinitionMessage(defName: string): string {
  return `The ${defName} definition is not executable.`;
}

/**
 * Executable definitions
 *
 * A GraphQL document is only valid for execution if all definitions are either
 * operation or fragment definitions.
 */
export function ExecutableDefinitions(
  context: ASTValidationContext,
): ASTVisitor {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          context.reportError(
            new GraphQLError(
              nonExecutableDefinitionMessage(
                definition.kind === Kind.SCHEMA_DEFINITION ||
                  definition.kind === Kind.SCHEMA_EXTENSION
                  ? 'schema'
                  : definition.name.value,
              ),
              definition,
            ),
          );
        }
      }
      return false;
    },
  };
}
