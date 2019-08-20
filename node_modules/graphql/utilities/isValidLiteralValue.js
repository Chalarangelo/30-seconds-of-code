"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidLiteralValue = isValidLiteralValue;

var _TypeInfo = require("./TypeInfo");

var _kinds = require("../language/kinds");

var _visitor = require("../language/visitor");

var _schema = require("../type/schema");

var _ValuesOfCorrectType = require("../validation/rules/ValuesOfCorrectType");

var _ValidationContext = require("../validation/ValidationContext");

/**
 * Utility which determines if a value literal node is valid for an input type.
 *
 * Deprecated. Rely on validation for documents containing literal values.
 *
 * This function will be removed in v15
 */
function isValidLiteralValue(type, valueNode) {
  var emptySchema = new _schema.GraphQLSchema({});
  var emptyDoc = {
    kind: _kinds.Kind.DOCUMENT,
    definitions: []
  };
  var typeInfo = new _TypeInfo.TypeInfo(emptySchema, undefined, type);
  var context = new _ValidationContext.ValidationContext(emptySchema, emptyDoc, typeInfo);
  var visitor = (0, _ValuesOfCorrectType.ValuesOfCorrectType)(context);
  (0, _visitor.visit)(valueNode, (0, _visitor.visitWithTypeInfo)(typeInfo, visitor));
  return context.getErrors();
}
