import { GraphQLError } from '../../error/GraphQLError';
import { print } from '../../language/printer';
import { isInputType } from '../../type/definition';
import { typeFromAST } from '../../utilities/typeFromAST';
export function nonInputTypeOnVarMessage(variableName, typeName) {
  return "Variable \"$".concat(variableName, "\" cannot be non-input type \"").concat(typeName, "\".");
}
/**
 * Variables are input types
 *
 * A GraphQL operation is only valid if all the variables it defines are of
 * input types (scalar, enum, or input object).
 */

export function VariablesAreInputTypes(context) {
  return {
    VariableDefinition: function VariableDefinition(node) {
      var type = typeFromAST(context.getSchema(), node.type); // If the variable type is not an input type, return an error.

      if (type && !isInputType(type)) {
        var variableName = node.variable.name.value;
        context.reportError(new GraphQLError(nonInputTypeOnVarMessage(variableName, print(node.type)), node.type));
      }
    }
  };
}
