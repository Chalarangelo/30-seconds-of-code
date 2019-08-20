// @flow strict

import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function schemaDefinitionNotAloneMessage(): string {
  return 'Must provide only one schema definition.';
}

export function canNotDefineSchemaWithinExtensionMessage(): string {
  return 'Cannot define a new schema within a schema extension.';
}

/**
 * Lone Schema definition
 *
 * A GraphQL document is only valid if it contains only one schema definition.
 */
export function LoneSchemaDefinition(
  context: SDLValidationContext,
): ASTVisitor {
  const oldSchema = context.getSchema();
  const alreadyDefined =
    oldSchema &&
    (oldSchema.astNode ||
      oldSchema.getQueryType() ||
      oldSchema.getMutationType() ||
      oldSchema.getSubscriptionType());

  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new GraphQLError(canNotDefineSchemaWithinExtensionMessage(), node),
        );
        return;
      }

      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new GraphQLError(schemaDefinitionNotAloneMessage(), node),
        );
      }
      ++schemaDefinitionsCount;
    },
  };
}
