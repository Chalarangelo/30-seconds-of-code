"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateFieldDefinitionNameMessage = duplicateFieldDefinitionNameMessage;
exports.existedFieldDefinitionNameMessage = existedFieldDefinitionNameMessage;
exports.UniqueFieldDefinitionNames = UniqueFieldDefinitionNames;

var _GraphQLError = require("../../error/GraphQLError");

var _definition = require("../../type/definition");

function duplicateFieldDefinitionNameMessage(typeName, fieldName) {
  return "Field \"".concat(typeName, ".").concat(fieldName, "\" can only be defined once.");
}

function existedFieldDefinitionNameMessage(typeName, fieldName) {
  return "Field \"".concat(typeName, ".").concat(fieldName, "\" already exists in the schema. It cannot also be defined in this type extension.");
}
/**
 * Unique field definition names
 *
 * A GraphQL complex type is only valid if all its fields are uniquely named.
 */


function UniqueFieldDefinitionNames(context) {
  var schema = context.getSchema();
  var existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  var knownFieldNames = Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };

  function checkFieldUniqueness(node) {
    var typeName = node.name.value;

    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = Object.create(null);
    }

    if (node.fields) {
      var fieldNames = knownFieldNames[typeName];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldDef = _step.value;
          var fieldName = fieldDef.name.value;

          if (hasField(existingTypeMap[typeName], fieldName)) {
            context.reportError(new _GraphQLError.GraphQLError(existedFieldDefinitionNameMessage(typeName, fieldName), fieldDef.name));
          } else if (fieldNames[fieldName]) {
            context.reportError(new _GraphQLError.GraphQLError(duplicateFieldDefinitionNameMessage(typeName, fieldName), [fieldNames[fieldName], fieldDef.name]));
          } else {
            fieldNames[fieldName] = fieldDef.name;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return false;
  }
}

function hasField(type, fieldName) {
  if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type) || (0, _definition.isInputObjectType)(type)) {
    return type.getFields()[fieldName];
  }

  return false;
}
