"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateTypeNameMessage = duplicateTypeNameMessage;
exports.existedTypeNameMessage = existedTypeNameMessage;
exports.UniqueTypeNames = UniqueTypeNames;

var _GraphQLError = require("../../error/GraphQLError");

function duplicateTypeNameMessage(typeName) {
  return "There can be only one type named \"".concat(typeName, "\".");
}

function existedTypeNameMessage(typeName) {
  return "Type \"".concat(typeName, "\" already exists in the schema. It cannot also be defined in this type definition.");
}
/**
 * Unique type names
 *
 * A GraphQL document is only valid if all defined types have unique names.
 */


function UniqueTypeNames(context) {
  var knownTypeNames = Object.create(null);
  var schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };

  function checkTypeName(node) {
    var typeName = node.name.value;

    if (schema && schema.getType(typeName)) {
      context.reportError(new _GraphQLError.GraphQLError(existedTypeNameMessage(typeName), node.name));
      return;
    }

    if (knownTypeNames[typeName]) {
      context.reportError(new _GraphQLError.GraphQLError(duplicateTypeNameMessage(typeName), [knownTypeNames[typeName], node.name]));
    } else {
      knownTypeNames[typeName] = node.name;
    }

    return false;
  }
}
