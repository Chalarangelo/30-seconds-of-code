"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("../graphql");

function coerceBuffer(value) {
  if (!(value instanceof Buffer)) {
    throw new TypeError('Field error: value is not an instance of Buffer');
  }

  return value.toString();
}

var _default = new _graphql.GraphQLScalarType({
  name: 'Buffer',
  serialize: coerceBuffer,
  parseValue: coerceBuffer,

  parseLiteral(ast) {
    if (ast.kind !== _graphql.Kind.STRING) {
      throw new _graphql.GraphQLError(`Query error: Can only parse strings to buffers but got a: ${ast.kind}`, [ast]);
    }

    const result = Buffer.from(ast.value);

    if (ast.value !== result.toString()) {
      throw new _graphql.GraphQLError('Query error: Invalid buffer encoding', [ast]);
    }

    return result;
  }

});

exports.default = _default;