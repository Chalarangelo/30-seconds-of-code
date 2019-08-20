// @flow strict

import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function duplicateDirectiveNameMessage(directiveName: string): string {
  return `There can be only one directive named "${directiveName}".`;
}

export function existedDirectiveNameMessage(directiveName: string): string {
  return `Directive "${directiveName}" already exists in the schema. It cannot be redefined.`;
}

/**
 * Unique directive names
 *
 * A GraphQL document is only valid if all defined directives have unique names.
 */
export function UniqueDirectiveNames(
  context: SDLValidationContext,
): ASTVisitor {
  const knownDirectiveNames = Object.create(null);
  const schema = context.getSchema();

  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;

      if (schema && schema.getDirective(directiveName)) {
        context.reportError(
          new GraphQLError(
            existedDirectiveNameMessage(directiveName),
            node.name,
          ),
        );
        return;
      }

      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new GraphQLError(duplicateDirectiveNameMessage(directiveName), [
            knownDirectiveNames[directiveName],
            node.name,
          ]),
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }

      return false;
    },
  };
}
