// @flow strict

import {
  type ValidationContext,
  type SDLValidationContext,
} from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { Kind } from '../../language/kinds';
import inspect from '../../jsutils/inspect';
import keyMap from '../../jsutils/keyMap';
import { isType, isRequiredArgument } from '../../type/definition';
import { type ASTVisitor } from '../../language/visitor';
import { print } from '../../language/printer';
import { specifiedDirectives } from '../../type/directives';

export function missingFieldArgMessage(
  fieldName: string,
  argName: string,
  type: string,
): string {
  return `Field "${fieldName}" argument "${argName}" of type "${type}" is required, but it was not provided.`;
}

export function missingDirectiveArgMessage(
  directiveName: string,
  argName: string,
  type: string,
): string {
  return `Directive "@${directiveName}" argument "${argName}" of type "${type}" is required, but it was not provided.`;
}

/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null without a
 * default value) field arguments have been provided.
 */
export function ProvidedRequiredArguments(
  context: ValidationContext,
): ASTVisitor {
  return {
    ...ProvidedRequiredArgumentsOnDirectives(context),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        const argNodes = fieldNode.arguments || [];

        const argNodeMap = keyMap(argNodes, arg => arg.name.value);
        for (const argDef of fieldDef.args) {
          const argNode = argNodeMap[argDef.name];
          if (!argNode && isRequiredArgument(argDef)) {
            context.reportError(
              new GraphQLError(
                missingFieldArgMessage(
                  fieldDef.name,
                  argDef.name,
                  inspect(argDef.type),
                ),
                fieldNode,
              ),
            );
          }
        }
      },
    },
  };
}

// @internal
export function ProvidedRequiredArgumentsOnDirectives(
  context: ValidationContext | SDLValidationContext,
): ASTVisitor {
  const requiredArgsMap = Object.create(null);

  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;
  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      arg => arg.name,
    );
  }

  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      requiredArgsMap[def.name.value] = keyMap(
        def.arguments ? def.arguments.filter(isRequiredArgumentNode) : [],
        arg => arg.name.value,
      );
    }
  }

  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          const argNodes = directiveNode.arguments || [];
          const argNodeMap = keyMap(argNodes, arg => arg.name.value);
          for (const argName of Object.keys(requiredArgs)) {
            if (!argNodeMap[argName]) {
              const argType = requiredArgs[argName].type;
              context.reportError(
                new GraphQLError(
                  missingDirectiveArgMessage(
                    directiveName,
                    argName,
                    isType(argType) ? inspect(argType) : print(argType),
                  ),
                  directiveNode,
                ),
              );
            }
          }
        }
      },
    },
  };
}

function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
