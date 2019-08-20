/* @flow strict */

import { GraphQLScalarType, GraphQLError, Kind } from '../graphql';

function coerceDate(value) {
  const json = JSON.stringify(value);
  return json ? json.replace(/"/g, "'") : null;
}

const GenericType = new GraphQLScalarType({
  name: 'Generic',
  serialize: coerceDate,
  parseValue: coerceDate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Can only parse strings to buffers but got a: ${ast.kind}`,
        [ast]
      );
    }

    const json = ast.value.replace(/'/g, '"');
    return JSON.parse(json);
  },
});

export default GenericType;
