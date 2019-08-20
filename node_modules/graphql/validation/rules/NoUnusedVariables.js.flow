// @flow strict

import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function unusedVariableMessage(
  varName: string,
  opName: ?string,
): string {
  return opName
    ? `Variable "$${varName}" is never used in operation "${opName}".`
    : `Variable "$${varName}" is never used.`;
}

/**
 * No unused variables
 *
 * A GraphQL operation is only valid if all variables defined by an operation
 * are used, either directly or within a spread fragment.
 */
export function NoUnusedVariables(context: ValidationContext): ASTVisitor {
  let variableDefs = [];

  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },
      leave(operation) {
        const variableNameUsed = Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);
        const opName = operation.name ? operation.name.value : null;

        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }

        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new GraphQLError(
                unusedVariableMessage(variableName, opName),
                variableDef,
              ),
            );
          }
        }
      },
    },
    VariableDefinition(def) {
      variableDefs.push(def);
    },
  };
}
