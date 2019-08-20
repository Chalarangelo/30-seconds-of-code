"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueFromASTUntyped = valueFromASTUntyped;

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _kinds = require("../language/kinds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case _kinds.Kind.NULL:
      return null;

    case _kinds.Kind.INT:
      return parseInt(valueNode.value, 10);

    case _kinds.Kind.FLOAT:
      return parseFloat(valueNode.value);

    case _kinds.Kind.STRING:
    case _kinds.Kind.ENUM:
    case _kinds.Kind.BOOLEAN:
      return valueNode.value;

    case _kinds.Kind.LIST:
      return valueNode.values.map(function (node) {
        return valueFromASTUntyped(node, variables);
      });

    case _kinds.Kind.OBJECT:
      return (0, _keyValMap.default)(valueNode.fields, function (field) {
        return field.name.value;
      }, function (field) {
        return valueFromASTUntyped(field.value, variables);
      });

    case _kinds.Kind.VARIABLE:
      {
        var variableName = valueNode.name.value;
        return variables && !(0, _isInvalid.default)(variables[variableName]) ? variables[variableName] : undefined;
      }
  } // Not reachable. All possible value nodes have been considered.

  /* istanbul ignore next */


  throw new Error("Unexpected value node: \"".concat((0, _inspect.default)(valueNode), "\"."));
}
