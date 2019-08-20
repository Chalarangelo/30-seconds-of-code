// @flow strict

import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type VariableDefinitionNode } from '../../language/ast';
import { print } from '../../language/printer';
import { type ASTVisitor } from '../../language/visitor';
import { isInputType } from '../../type/definition';
import { typeFromAST } from '../../utilities/typeFromAST';

export function nonInputTypeOnVarMessage(
  variableName: string,
  typeName: string,
): string {
  return `Variable "$${variableName}" cannot be non-input type "${typeName}".`;
}

/**
 * Variables are input types
 *
 * A GraphQL operation is only valid if all the variables it defines are of
 * input types (scalar, enum, or input object).
 */
export function VariablesAreInputTypes(context: ValidationContext): ASTVisitor {
  return {
    VariableDefinition(node: VariableDefinitionNode): ?GraphQLError {
      const type = typeFromAST(context.getSchema(), node.type);

      // If the variable type is not an input type, return an error.
      if (type && !isInputType(type)) {
        const variableName = node.variable.name.value;
        context.reportError(
          new GraphQLError(
            nonInputTypeOnVarMessage(variableName, print(node.type)),
            node.type,
          ),
        );
      }
    },
  };
}
