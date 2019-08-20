// @flow strict

import inspect from '../jsutils/inspect';
import keyValMap from '../jsutils/keyValMap';
import isInvalid from '../jsutils/isInvalid';
import { type ObjMap } from '../jsutils/ObjMap';
import { Kind } from '../language/kinds';
import { type ValueNode } from '../language/ast';

/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
 * will reflect the provided GraphQL value AST.
 *
 * | GraphQL Value        | JavaScript Value |
 * | -------------------- | ---------------- |
 * | Input Object         | Object           |
 * | List                 | Array            |
 * | Boolean              | Boolean          |
 * | String / Enum        | String           |
 * | Int / Float          | Number           |
 * | Null                 | null             |
 *
 */
export function valueFromASTUntyped(
  valueNode: ValueNode,
  variables?: ?ObjMap<mixed>,
): mixed {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(node => valueFromASTUntyped(node, variables));
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        field => field.name.value,
        field => valueFromASTUntyped(field.value, variables),
      );
    case Kind.VARIABLE: {
      const variableName = valueNode.name.value;
      return variables && !isInvalid(variables[variableName])
        ? variables[variableName]
        : undefined;
    }
  }

  // Not reachable. All possible value nodes have been considered.
  /* istanbul ignore next */
  throw new Error(`Unexpected value node: "${inspect((valueNode: empty))}".`);
}
