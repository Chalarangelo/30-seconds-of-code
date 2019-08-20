"use strict";

exports.__esModule = true;
exports.default = void 0;

var _graphql = require("graphql");

var _language = require("graphql/language");

function identity(value) {
  return value;
}

function parseLiteral(ast, variables) {
  switch (ast.kind) {
    case _language.Kind.STRING:
    case _language.Kind.BOOLEAN:
      return ast.value;

    case _language.Kind.INT:
    case _language.Kind.FLOAT:
      return parseFloat(ast.value);

    case _language.Kind.OBJECT:
      {
        var value = Object.create(null);
        ast.fields.forEach(function (field) {
          value[field.name.value] = parseLiteral(field.value, variables);
        });
        return value;
      }

    case _language.Kind.LIST:
      return ast.values.map(function (n) {
        return parseLiteral(n, variables);
      });

    case _language.Kind.NULL:
      return null;

    case _language.Kind.VARIABLE:
      {
        var name = ast.name.value;
        return variables ? variables[name] : undefined;
      }

    default:
      return undefined;
  }
}

var _default = new _graphql.GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: identity,
  parseValue: identity,
  parseLiteral: parseLiteral
});

exports.default = _default;
module.exports = exports.default;