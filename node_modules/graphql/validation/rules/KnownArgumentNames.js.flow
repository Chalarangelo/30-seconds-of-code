// @flow strict

import {
  type ValidationContext,
  type SDLValidationContext,
} from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';
import suggestionList from '../../jsutils/suggestionList';
import didYouMean from '../../jsutils/didYouMean';
import { Kind } from '../../language/kinds';
import { specifiedDirectives } from '../../type/directives';

export function unknownArgMessage(
  argName: string,
  fieldName: string,
  typeName: string,
  suggestedArgs: $ReadOnlyArray<string>,
): string {
  return (
    `Unknown argument "${argName}" on field "${fieldName}" of type "${typeName}".` +
    didYouMean(suggestedArgs.map(x => `"${x}"`))
  );
}

export function unknownDirectiveArgMessage(
  argName: string,
  directiveName: string,
  suggestedArgs: $ReadOnlyArray<string>,
): string {
  return (
    `Unknown argument "${argName}" on directive "@${directiveName}".` +
    didYouMean(suggestedArgs.map(x => `"${x}"`))
  );
}

/**
 * Known argument names
 *
 * A GraphQL field is only valid if all supplied arguments are defined by
 * that field.
 */
export function KnownArgumentNames(context: ValidationContext): ASTVisitor {
  return {
    ...KnownArgumentNamesOnDirectives(context),
    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();

      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map(arg => arg.name);
        context.reportError(
          new GraphQLError(
            unknownArgMessage(
              argName,
              fieldDef.name,
              parentType.name,
              suggestionList(argName, knownArgsNames),
            ),
            argNode,
          ),
        );
      }
    },
  };
}

// @internal
export function KnownArgumentNamesOnDirectives(
  context: ValidationContext | SDLValidationContext,
): ASTVisitor {
  const directiveArgs = Object.create(null);

  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;
  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map(arg => arg.name);
  }

  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveArgs[def.name.value] = def.arguments
        ? def.arguments.map(arg => arg.name.value)
        : [];
    }
  }

  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];

      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;
          if (knownArgs.indexOf(argName) === -1) {
            const suggestions = suggestionList(argName, knownArgs);
            context.reportError(
              new GraphQLError(
                unknownDirectiveArgMessage(argName, directiveName, suggestions),
                argNode,
              ),
            );
          }
        }
      }

      return false;
    },
  };
}
