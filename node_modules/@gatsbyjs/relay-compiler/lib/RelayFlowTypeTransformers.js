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

var t = require("@babel/types");

var _require = require("./RelayFlowBabelFactories"),
    exactObjectTypeAnnotation = _require.exactObjectTypeAnnotation,
    readOnlyArrayOfType = _require.readOnlyArrayOfType;

var _require2 = require("graphql"),
    GraphQLEnumType = _require2.GraphQLEnumType,
    GraphQLInputObjectType = _require2.GraphQLInputObjectType,
    GraphQLInterfaceType = _require2.GraphQLInterfaceType,
    GraphQLList = _require2.GraphQLList,
    GraphQLNonNull = _require2.GraphQLNonNull,
    GraphQLObjectType = _require2.GraphQLObjectType,
    GraphQLScalarType = _require2.GraphQLScalarType,
    GraphQLUnionType = _require2.GraphQLUnionType;

function getInputObjectTypeIdentifier(type) {
  return type.name;
}

function transformScalarType(type, state, objectProps) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableScalarType(type.ofType, state, objectProps);
  } else {
    return t.nullableTypeAnnotation(transformNonNullableScalarType(type, state, objectProps));
  }
}

function transformNonNullableScalarType(type, state, objectProps) {
  if (type instanceof GraphQLList) {
    return readOnlyArrayOfType(transformScalarType(type.ofType, state, objectProps));
  } else if (type instanceof GraphQLObjectType || type instanceof GraphQLUnionType || type instanceof GraphQLInterfaceType) {
    return objectProps;
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type, state);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type, state);
  } else {
    throw new Error("Could not convert from GraphQL type ".concat(type.toString()));
  }
}

function transformGraphQLScalarType(type, state) {
  var customType = state.customScalars[type.name];

  switch (customType || type.name) {
    case 'ID':
    case 'String':
      return t.stringTypeAnnotation();

    case 'Float':
    case 'Int':
      return t.numberTypeAnnotation();

    case 'Boolean':
      return t.booleanTypeAnnotation();

    default:
      return customType == null ? t.anyTypeAnnotation() : t.genericTypeAnnotation(t.identifier(customType));
  }
}

function transformGraphQLEnumType(type, state) {
  state.usedEnums[type.name] = type;
  return t.genericTypeAnnotation(t.identifier(type.name));
}

function transformInputType(type, state) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableInputType(type.ofType, state);
  } else {
    return t.nullableTypeAnnotation(transformNonNullableInputType(type, state));
  }
}

function transformNonNullableInputType(type, state) {
  if (type instanceof GraphQLList) {
    return readOnlyArrayOfType(transformInputType(type.ofType, state));
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type, state);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type, state);
  } else if (type instanceof GraphQLInputObjectType) {
    var typeIdentifier = getInputObjectTypeIdentifier(type);

    if (state.generatedInputObjectTypes[typeIdentifier]) {
      return t.genericTypeAnnotation(t.identifier(typeIdentifier));
    }

    state.generatedInputObjectTypes[typeIdentifier] = 'pending';
    var fields = type.getFields();
    var props = Object.keys(fields).map(function (key) {
      return fields[key];
    }).map(function (field) {
      var property = t.objectTypeProperty(t.identifier(field.name), transformInputType(field.type, state));

      if (state.optionalInputFields.indexOf(field.name) >= 0 || !(field.type instanceof GraphQLNonNull)) {
        property.optional = true;
      }

      return property;
    });
    state.generatedInputObjectTypes[typeIdentifier] = exactObjectTypeAnnotation(props);
    return t.genericTypeAnnotation(t.identifier(typeIdentifier));
  } else {
    throw new Error("Could not convert from GraphQL type ".concat(type.toString()));
  }
}

module.exports = {
  transformInputType: transformInputType,
  transformScalarType: transformScalarType
};