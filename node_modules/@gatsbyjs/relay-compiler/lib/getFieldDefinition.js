/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var _require = require("./GraphQLSchemaUtils"),
    getRawType = _require.getRawType;

var _require2 = require("./RelayCompilerError"),
    createCompilerError = _require2.createCompilerError;

var _require3 = require("graphql"),
    assertAbstractType = _require3.assertAbstractType,
    GraphQLInterfaceType = _require3.GraphQLInterfaceType,
    GraphQLObjectType = _require3.GraphQLObjectType,
    GraphQLUnionType = _require3.GraphQLUnionType,
    isAbstractType = _require3.isAbstractType,
    SchemaMetaFieldDef = _require3.SchemaMetaFieldDef,
    TypeMetaFieldDef = _require3.TypeMetaFieldDef,
    TypeNameMetaFieldDef = _require3.TypeNameMetaFieldDef;

/**
 * Find the definition of a field of the specified type using strict
 * resolution rules per the GraphQL spec.
 */
function getFieldDefinitionStrict(schema, parentType, fieldName, fieldAST) {
  var type = getRawType(parentType);
  var isQueryType = type === schema.getQueryType();
  var hasTypeName = type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType || type instanceof GraphQLUnionType;
  var schemaFieldDef;

  if (isQueryType && fieldName === SchemaMetaFieldDef.name) {
    schemaFieldDef = SchemaMetaFieldDef;
  } else if (isQueryType && fieldName === TypeMetaFieldDef.name) {
    schemaFieldDef = TypeMetaFieldDef;
  } else if (hasTypeName && fieldName === TypeNameMetaFieldDef.name) {
    schemaFieldDef = TypeNameMetaFieldDef;
  } else if (type instanceof GraphQLInterfaceType || type instanceof GraphQLObjectType) {
    schemaFieldDef = type.getFields()[fieldName];
  }

  return schemaFieldDef;
}
/**
 * Find the definition of a field of the specified type, first trying
 * the standard spec-compliant resolution process and falling back
 * to legacy mode that supports fat interfaces.
 */


function getFieldDefinitionLegacy(schema, parentType, fieldName, fieldAST) {
  var schemaFieldDef = getFieldDefinitionStrict(schema, parentType, fieldName, fieldAST);

  if (!schemaFieldDef) {
    var type = getRawType(parentType);
    schemaFieldDef = getFieldDefinitionLegacyImpl(schema, type, fieldName, fieldAST);
  }

  return schemaFieldDef || null;
}
/**
 * @private
 */


function getFieldDefinitionLegacyImpl(schema, type, fieldName, fieldAST) {
  if (isAbstractType(type) && fieldAST && fieldAST.directives && fieldAST.directives.some(function (directive) {
    return getName(directive) === 'fixme_fat_interface';
  })) {
    var possibleTypes = schema.getPossibleTypes(assertAbstractType(type));
    var schemaFieldDef;

    var _loop = function _loop(ii) {
      var possibleField = possibleTypes[ii].getFields()[fieldName];

      if (possibleField) {
        // Fat interface fields can have differing arguments. Try to return
        // a field with matching arguments, but still return a field if the
        // arguments do not match.
        schemaFieldDef = possibleField;

        if (fieldAST && fieldAST.arguments) {
          var argumentsAllExist = fieldAST.arguments.every(function (argument) {
            return possibleField.args.find(function (argDef) {
              return argDef.name === getName(argument);
            });
          });

          if (argumentsAllExist) {
            return "break";
          }
        }
      }
    };

    for (var ii = 0; ii < possibleTypes.length; ii++) {
      var _ret = _loop(ii);

      if (_ret === "break") break;
    }

    return schemaFieldDef;
  }
}
/**
 * @private
 */


function getName(ast) {
  var name = ast.name ? ast.name.value : null;

  if (typeof name !== 'string') {
    throw createCompilerError("Expected ast node to have a 'name'.", null, [ast]);
  }

  return name;
}

module.exports = {
  getFieldDefinitionLegacy: getFieldDefinitionLegacy,
  getFieldDefinitionStrict: getFieldDefinitionStrict
};