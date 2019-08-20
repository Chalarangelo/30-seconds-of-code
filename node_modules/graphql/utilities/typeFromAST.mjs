import inspect from '../jsutils/inspect';
import { Kind } from '../language/kinds';
import { GraphQLList, GraphQLNonNull } from '../type/definition';
export function typeFromAST(schema, typeNode) {
  /* eslint-enable no-redeclare */
  var innerType;

  if (typeNode.kind === Kind.LIST_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && GraphQLList(innerType);
  }

  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && GraphQLNonNull(innerType);
  }

  if (typeNode.kind === Kind.NAMED_TYPE) {
    return schema.getType(typeNode.name.value);
  } // Not reachable. All possible type nodes have been considered.

  /* istanbul ignore next */


  throw new Error("Unexpected type node: \"".concat(inspect(typeNode), "\"."));
}
