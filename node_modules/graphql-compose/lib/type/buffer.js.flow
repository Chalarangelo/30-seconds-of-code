/* @flow strict */

import { GraphQLScalarType, GraphQLError, Kind } from '../graphql';

function coerceBuffer(value) {
  if (!(value instanceof Buffer)) {
    throw new TypeError('Field error: value is not an instance of Buffer');
  }

  return value.toString();
}

export default new GraphQLScalarType({
  name: 'Buffer',
  serialize: coerceBuffer,
  parseValue: coerceBuffer,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Can only parse strings to buffers but got a: ${ast.kind}`,
        [ast]
      );
    }

    const result = Buffer.from(ast.value);

    if (ast.value !== result.toString()) {
      throw new GraphQLError('Query error: Invalid buffer encoding', [ast]);
    }

    return result;
  },
});
