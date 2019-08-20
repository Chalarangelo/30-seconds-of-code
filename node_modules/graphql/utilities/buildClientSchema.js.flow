// @flow strict

import objectValues from '../polyfills/objectValues';
import inspect from '../jsutils/inspect';
import invariant from '../jsutils/invariant';
import keyValMap from '../jsutils/keyValMap';
import isObjectLike from '../jsutils/isObjectLike';
import { valueFromAST } from './valueFromAST';
import { parseValue } from '../language/parser';
import {
  type GraphQLSchemaValidationOptions,
  GraphQLSchema,
} from '../type/schema';

import {
  type GraphQLType,
  type GraphQLInputType,
  type GraphQLOutputType,
  type GraphQLNamedType,
  isInputType,
  isOutputType,
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  assertNullableType,
  assertObjectType,
  assertInterfaceType,
} from '../type/definition';

import { GraphQLDirective } from '../type/directives';

import { introspectionTypes, TypeKind } from '../type/introspection';

import { specifiedScalarTypes } from '../type/scalars';

import {
  type IntrospectionQuery,
  type IntrospectionType,
  type IntrospectionScalarType,
  type IntrospectionObjectType,
  type IntrospectionInterfaceType,
  type IntrospectionUnionType,
  type IntrospectionEnumType,
  type IntrospectionInputObjectType,
  type IntrospectionTypeRef,
  type IntrospectionInputTypeRef,
  type IntrospectionOutputTypeRef,
  type IntrospectionNamedTypeRef,
} from './introspectionQuery';

type Options = {|
  ...GraphQLSchemaValidationOptions,
|};

/**
 * Build a GraphQLSchema for use by client tools.
 *
 * Given the result of a client running the introspection query, creates and
 * returns a GraphQLSchema instance which can be then used with all graphql-js
 * tools, but cannot be used to execute a query, as introspection does not
 * represent the "resolver", "parse" or "serialize" functions or any other
 * server-internal mechanisms.
 *
 * This function expects a complete introspection result. Don't forget to check
 * the "errors" field of a server response before calling this function.
 */
export function buildClientSchema(
  introspection: IntrospectionQuery,
  options?: Options,
): GraphQLSchema {
  invariant(
    isObjectLike(introspection) && isObjectLike(introspection.__schema),
    'Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ' +
      inspect(introspection),
  );

  // Get the schema from the introspection result.
  const schemaIntrospection = introspection.__schema;

  // Iterate through all types, getting the type definition for each.
  const typeMap = keyValMap(
    schemaIntrospection.types,
    typeIntrospection => typeIntrospection.name,
    typeIntrospection => buildType(typeIntrospection),
  );

  for (const stdType of [...specifiedScalarTypes, ...introspectionTypes]) {
    if (typeMap[stdType.name]) {
      typeMap[stdType.name] = stdType;
    }
  }

  // Get the root Query, Mutation, and Subscription types.
  const queryType = schemaIntrospection.queryType
    ? getObjectType(schemaIntrospection.queryType)
    : null;

  const mutationType = schemaIntrospection.mutationType
    ? getObjectType(schemaIntrospection.mutationType)
    : null;

  const subscriptionType = schemaIntrospection.subscriptionType
    ? getObjectType(schemaIntrospection.subscriptionType)
    : null;

  // Get the directives supported by Introspection, assuming empty-set if
  // directives were not queried for.
  const directives = schemaIntrospection.directives
    ? schemaIntrospection.directives.map(buildDirective)
    : [];

  // Then produce and return a Schema with these types.
  return new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: objectValues(typeMap),
    directives,
    assumeValid: options && options.assumeValid,
    allowedLegacyNames: options && options.allowedLegacyNames,
  });

  // Given a type reference in introspection, return the GraphQLType instance.
  // preferring cached instances before building new instances.
  function getType(typeRef: IntrospectionTypeRef): GraphQLType {
    if (typeRef.kind === TypeKind.LIST) {
      const itemRef = typeRef.ofType;
      if (!itemRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }
      return GraphQLList(getType(itemRef));
    }
    if (typeRef.kind === TypeKind.NON_NULL) {
      const nullableRef = typeRef.ofType;
      if (!nullableRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }
      const nullableType = getType(nullableRef);
      return GraphQLNonNull(assertNullableType(nullableType));
    }
    if (!typeRef.name) {
      throw new Error('Unknown type reference: ' + inspect(typeRef));
    }
    return getNamedType(typeRef.name);
  }

  function getNamedType(typeName: string): GraphQLNamedType {
    const type = typeMap[typeName];
    if (!type) {
      throw new Error(
        `Invalid or incomplete schema, unknown type: ${typeName}. Ensure that a full introspection query is used in order to build a client schema.`,
      );
    }

    return type;
  }

  function getInputType(typeRef: IntrospectionInputTypeRef): GraphQLInputType {
    const type = getType(typeRef);
    invariant(
      isInputType(type),
      'Introspection must provide input type for arguments, but received: ' +
        inspect(type) +
        '.',
    );
    return type;
  }

  function getOutputType(
    typeRef: IntrospectionOutputTypeRef,
  ): GraphQLOutputType {
    const type = getType(typeRef);
    invariant(
      isOutputType(type),
      'Introspection must provide output type for fields, but received: ' +
        inspect(type) +
        '.',
    );
    return type;
  }

  function getObjectType(
    typeRef: IntrospectionNamedTypeRef<IntrospectionObjectType>,
  ): GraphQLObjectType {
    const type = getType(typeRef);
    return assertObjectType(type);
  }

  function getInterfaceType(
    typeRef: IntrospectionTypeRef,
  ): GraphQLInterfaceType {
    const type = getType(typeRef);
    return assertInterfaceType(type);
  }

  // Given a type's introspection result, construct the correct
  // GraphQLType instance.
  function buildType(type: IntrospectionType): GraphQLNamedType {
    if (type && type.name && type.kind) {
      switch (type.kind) {
        case TypeKind.SCALAR:
          return buildScalarDef(type);
        case TypeKind.OBJECT:
          return buildObjectDef(type);
        case TypeKind.INTERFACE:
          return buildInterfaceDef(type);
        case TypeKind.UNION:
          return buildUnionDef(type);
        case TypeKind.ENUM:
          return buildEnumDef(type);
        case TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }
    throw new Error(
      'Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema:' +
        inspect(type),
    );
  }

  function buildScalarDef(
    scalarIntrospection: IntrospectionScalarType,
  ): GraphQLScalarType {
    return new GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
    });
  }

  function buildObjectDef(
    objectIntrospection: IntrospectionObjectType,
  ): GraphQLObjectType {
    if (!objectIntrospection.interfaces) {
      throw new Error(
        'Introspection result missing interfaces: ' +
          inspect(objectIntrospection),
      );
    }
    return new GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: () => objectIntrospection.interfaces.map(getInterfaceType),
      fields: () => buildFieldDefMap(objectIntrospection),
    });
  }

  function buildInterfaceDef(
    interfaceIntrospection: IntrospectionInterfaceType,
  ): GraphQLInterfaceType {
    return new GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      fields: () => buildFieldDefMap(interfaceIntrospection),
    });
  }

  function buildUnionDef(
    unionIntrospection: IntrospectionUnionType,
  ): GraphQLUnionType {
    if (!unionIntrospection.possibleTypes) {
      throw new Error(
        'Introspection result missing possibleTypes: ' +
          inspect(unionIntrospection),
      );
    }
    return new GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: () => unionIntrospection.possibleTypes.map(getObjectType),
    });
  }

  function buildEnumDef(
    enumIntrospection: IntrospectionEnumType,
  ): GraphQLEnumType {
    if (!enumIntrospection.enumValues) {
      throw new Error(
        'Introspection result missing enumValues: ' +
          inspect(enumIntrospection),
      );
    }
    return new GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: keyValMap(
        enumIntrospection.enumValues,
        valueIntrospection => valueIntrospection.name,
        valueIntrospection => ({
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason,
        }),
      ),
    });
  }

  function buildInputObjectDef(
    inputObjectIntrospection: IntrospectionInputObjectType,
  ): GraphQLInputObjectType {
    if (!inputObjectIntrospection.inputFields) {
      throw new Error(
        'Introspection result missing inputFields: ' +
          inspect(inputObjectIntrospection),
      );
    }
    return new GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: () => buildInputValueDefMap(inputObjectIntrospection.inputFields),
    });
  }

  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error(
        'Introspection result missing fields: ' + inspect(typeIntrospection),
      );
    }
    return keyValMap(
      typeIntrospection.fields,
      fieldIntrospection => fieldIntrospection.name,
      fieldIntrospection => {
        if (!fieldIntrospection.args) {
          throw new Error(
            'Introspection result missing field args: ' +
              inspect(fieldIntrospection),
          );
        }
        return {
          description: fieldIntrospection.description,
          deprecationReason: fieldIntrospection.deprecationReason,
          type: getOutputType(fieldIntrospection.type),
          args: buildInputValueDefMap(fieldIntrospection.args),
        };
      },
    );
  }

  function buildInputValueDefMap(inputValueIntrospections) {
    return keyValMap(
      inputValueIntrospections,
      inputValue => inputValue.name,
      buildInputValue,
    );
  }

  function buildInputValue(inputValueIntrospection) {
    const type = getInputType(inputValueIntrospection.type);
    const defaultValue = inputValueIntrospection.defaultValue
      ? valueFromAST(parseValue(inputValueIntrospection.defaultValue), type)
      : undefined;
    return {
      description: inputValueIntrospection.description,
      type,
      defaultValue,
    };
  }

  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      throw new Error(
        'Introspection result missing directive args: ' +
          inspect(directiveIntrospection),
      );
    }
    if (!directiveIntrospection.locations) {
      throw new Error(
        'Introspection result missing directive locations: ' +
          inspect(directiveIntrospection),
      );
    }
    return new GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args),
    });
  }
}
