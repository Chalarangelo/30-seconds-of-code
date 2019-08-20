"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.introspectionFromSchema = introspectionFromSchema;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _isPromise = _interopRequireDefault(require("../jsutils/isPromise"));

var _execute = require("../execution/execute");

var _parser = require("../language/parser");

var _introspectionQuery = require("./introspectionQuery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build an IntrospectionQuery from a GraphQLSchema
 *
 * IntrospectionQuery is useful for utilities that care about type and field
 * relationships, but do not need to traverse through those relationships.
 *
 * This is the inverse of buildClientSchema. The primary use case is outside
 * of the server context, for instance when doing schema comparisons.
 */
function introspectionFromSchema(schema, options) {
  var queryAST = (0, _parser.parse)((0, _introspectionQuery.getIntrospectionQuery)(options));
  var result = (0, _execute.execute)(schema, queryAST);
  !(!(0, _isPromise.default)(result) && !result.errors && result.data) ? (0, _invariant.default)(0) : void 0;
  return result.data;
}
