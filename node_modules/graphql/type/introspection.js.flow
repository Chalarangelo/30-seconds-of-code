// @flow strict

import objectValues from '../polyfills/objectValues';
import inspect from '../jsutils/inspect';
import { astFromValue } from '../utilities/astFromValue';
import { print } from '../language/printer';
import {
  type GraphQLType,
  type GraphQLInputField,
  type GraphQLEnumValue,
  type GraphQLField,
  type GraphQLFieldConfigMap,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isAbstractType,
  isNamedType,
} from './definition';
import { type GraphQLSchema } from './schema';
import { type GraphQLDirective } from './directives';
import { GraphQLString, GraphQLBoolean } from './scalars';
import { DirectiveLocation } from '../language/directiveLocation';

export const __Schema = new GraphQLObjectType({
  name: '__Schema',
  description:
    'A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.',
  fields: () =>
    ({
      types: {
        description: 'A list of all types supported by this server.',
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__Type))),
        resolve(schema) {
          return objectValues(schema.getTypeMap());
        },
      },
      queryType: {
        description: 'The type that query operations will be rooted at.',
        type: GraphQLNonNull(__Type),
        resolve: schema => schema.getQueryType(),
      },
      mutationType: {
        description:
          'If this server supports mutation, the type that mutation operations will be rooted at.',
        type: __Type,
        resolve: schema => schema.getMutationType(),
      },
      subscriptionType: {
        description:
          'If this server support subscription, the type that subscription operations will be rooted at.',
        type: __Type,
        resolve: schema => schema.getSubscriptionType(),
      },
      directives: {
        description: 'A list of all directives supported by this server.',
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__Directive))),
        resolve: schema => schema.getDirectives(),
      },
    }: GraphQLFieldConfigMap<GraphQLSchema, mixed>),
});

export const __Directive = new GraphQLObjectType({
  name: '__Directive',
  description:
    "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: () =>
    ({
      name: {
        type: GraphQLNonNull(GraphQLString),
        resolve: obj => obj.name,
      },
      description: {
        type: GraphQLString,
        resolve: obj => obj.description,
      },
      locations: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__DirectiveLocation))),
        resolve: obj => obj.locations,
      },
      args: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__InputValue))),
        resolve: directive => directive.args,
      },
    }: GraphQLFieldConfigMap<GraphQLDirective, mixed>),
});

export const __DirectiveLocation = new GraphQLEnumType({
  name: '__DirectiveLocation',
  description:
    'A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.',
  values: {
    QUERY: {
      value: DirectiveLocation.QUERY,
      description: 'Location adjacent to a query operation.',
    },
    MUTATION: {
      value: DirectiveLocation.MUTATION,
      description: 'Location adjacent to a mutation operation.',
    },
    SUBSCRIPTION: {
      value: DirectiveLocation.SUBSCRIPTION,
      description: 'Location adjacent to a subscription operation.',
    },
    FIELD: {
      value: DirectiveLocation.FIELD,
      description: 'Location adjacent to a field.',
    },
    FRAGMENT_DEFINITION: {
      value: DirectiveLocation.FRAGMENT_DEFINITION,
      description: 'Location adjacent to a fragment definition.',
    },
    FRAGMENT_SPREAD: {
      value: DirectiveLocation.FRAGMENT_SPREAD,
      description: 'Location adjacent to a fragment spread.',
    },
    INLINE_FRAGMENT: {
      value: DirectiveLocation.INLINE_FRAGMENT,
      description: 'Location adjacent to an inline fragment.',
    },
    VARIABLE_DEFINITION: {
      value: DirectiveLocation.VARIABLE_DEFINITION,
      description: 'Location adjacent to a variable definition.',
    },
    SCHEMA: {
      value: DirectiveLocation.SCHEMA,
      description: 'Location adjacent to a schema definition.',
    },
    SCALAR: {
      value: DirectiveLocation.SCALAR,
      description: 'Location adjacent to a scalar definition.',
    },
    OBJECT: {
      value: DirectiveLocation.OBJECT,
      description: 'Location adjacent to an object type definition.',
    },
    FIELD_DEFINITION: {
      value: DirectiveLocation.FIELD_DEFINITION,
      description: 'Location adjacent to a field definition.',
    },
    ARGUMENT_DEFINITION: {
      value: DirectiveLocation.ARGUMENT_DEFINITION,
      description: 'Location adjacent to an argument definition.',
    },
    INTERFACE: {
      value: DirectiveLocation.INTERFACE,
      description: 'Location adjacent to an interface definition.',
    },
    UNION: {
      value: DirectiveLocation.UNION,
      description: 'Location adjacent to a union definition.',
    },
    ENUM: {
      value: DirectiveLocation.ENUM,
      description: 'Location adjacent to an enum definition.',
    },
    ENUM_VALUE: {
      value: DirectiveLocation.ENUM_VALUE,
      description: 'Location adjacent to an enum value definition.',
    },
    INPUT_OBJECT: {
      value: DirectiveLocation.INPUT_OBJECT,
      description: 'Location adjacent to an input object type definition.',
    },
    INPUT_FIELD_DEFINITION: {
      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: 'Location adjacent to an input object field definition.',
    },
  },
});

export const __Type = new GraphQLObjectType({
  name: '__Type',
  description:
    'The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.',
  fields: () =>
    ({
      kind: {
        type: GraphQLNonNull(__TypeKind),
        resolve(type) {
          if (isScalarType(type)) {
            return TypeKind.SCALAR;
          } else if (isObjectType(type)) {
            return TypeKind.OBJECT;
          } else if (isInterfaceType(type)) {
            return TypeKind.INTERFACE;
          } else if (isUnionType(type)) {
            return TypeKind.UNION;
          } else if (isEnumType(type)) {
            return TypeKind.ENUM;
          } else if (isInputObjectType(type)) {
            return TypeKind.INPUT_OBJECT;
          } else if (isListType(type)) {
            return TypeKind.LIST;
          } else if (isNonNullType(type)) {
            return TypeKind.NON_NULL;
          }

          // Not reachable. All possible types have been considered.
          /* istanbul ignore next */
          throw new Error(`Unexpected type: "${inspect((type: empty))}".`);
        },
      },
      name: {
        type: GraphQLString,
        resolve: obj => (obj.name !== undefined ? obj.name : undefined),
      },
      description: {
        type: GraphQLString,
        resolve: obj =>
          obj.description !== undefined ? obj.description : undefined,
      },
      fields: {
        type: GraphQLList(GraphQLNonNull(__Field)),
        args: {
          includeDeprecated: { type: GraphQLBoolean, defaultValue: false },
        },
        resolve(type, { includeDeprecated }) {
          if (isObjectType(type) || isInterfaceType(type)) {
            let fields = objectValues(type.getFields());
            if (!includeDeprecated) {
              fields = fields.filter(field => !field.deprecationReason);
            }
            return fields;
          }
          return null;
        },
      },
      interfaces: {
        type: GraphQLList(GraphQLNonNull(__Type)),
        resolve(type) {
          if (isObjectType(type)) {
            return type.getInterfaces();
          }
        },
      },
      possibleTypes: {
        type: GraphQLList(GraphQLNonNull(__Type)),
        resolve(type, args, context, { schema }) {
          if (isAbstractType(type)) {
            return schema.getPossibleTypes(type);
          }
        },
      },
      enumValues: {
        type: GraphQLList(GraphQLNonNull(__EnumValue)),
        args: {
          includeDeprecated: { type: GraphQLBoolean, defaultValue: false },
        },
        resolve(type, { includeDeprecated }) {
          if (isEnumType(type)) {
            let values = type.getValues();
            if (!includeDeprecated) {
              values = values.filter(value => !value.deprecationReason);
            }
            return values;
          }
        },
      },
      inputFields: {
        type: GraphQLList(GraphQLNonNull(__InputValue)),
        resolve(type) {
          if (isInputObjectType(type)) {
            return objectValues(type.getFields());
          }
        },
      },
      ofType: {
        type: __Type,
        resolve: obj => (obj.ofType !== undefined ? obj.ofType : undefined),
      },
    }: GraphQLFieldConfigMap<GraphQLType, mixed>),
});

export const __Field = new GraphQLObjectType({
  name: '__Field',
  description:
    'Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.',
  fields: () =>
    ({
      name: {
        type: GraphQLNonNull(GraphQLString),
        resolve: obj => obj.name,
      },
      description: {
        type: GraphQLString,
        resolve: obj => obj.description,
      },
      args: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__InputValue))),
        resolve: field => field.args,
      },
      type: {
        type: GraphQLNonNull(__Type),
        resolve: obj => obj.type,
      },
      isDeprecated: {
        type: GraphQLNonNull(GraphQLBoolean),
        resolve: obj => obj.isDeprecated,
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: obj => obj.deprecationReason,
      },
    }: GraphQLFieldConfigMap<GraphQLField<mixed, mixed>, mixed>),
});

export const __InputValue = new GraphQLObjectType({
  name: '__InputValue',
  description:
    'Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.',
  fields: () =>
    ({
      name: {
        type: GraphQLNonNull(GraphQLString),
        resolve: obj => obj.name,
      },
      description: {
        type: GraphQLString,
        resolve: obj => obj.description,
      },
      type: {
        type: GraphQLNonNull(__Type),
        resolve: obj => obj.type,
      },
      defaultValue: {
        type: GraphQLString,
        description:
          'A GraphQL-formatted string representing the default value for this input value.',
        resolve(inputVal) {
          const valueAST = astFromValue(inputVal.defaultValue, inputVal.type);
          return valueAST ? print(valueAST) : null;
        },
      },
    }: GraphQLFieldConfigMap<GraphQLInputField, mixed>),
});

export const __EnumValue = new GraphQLObjectType({
  name: '__EnumValue',
  description:
    'One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.',
  fields: () =>
    ({
      name: {
        type: GraphQLNonNull(GraphQLString),
        resolve: obj => obj.name,
      },
      description: {
        type: GraphQLString,
        resolve: obj => obj.description,
      },
      isDeprecated: {
        type: GraphQLNonNull(GraphQLBoolean),
        resolve: obj => obj.isDeprecated,
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: obj => obj.deprecationReason,
      },
    }: GraphQLFieldConfigMap<GraphQLEnumValue, mixed>),
});

export const TypeKind = Object.freeze({
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  INPUT_OBJECT: 'INPUT_OBJECT',
  LIST: 'LIST',
  NON_NULL: 'NON_NULL',
});

export const __TypeKind = new GraphQLEnumType({
  name: '__TypeKind',
  description: 'An enum describing what kind of type a given `__Type` is.',
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: 'Indicates this type is a scalar.',
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description:
        'Indicates this type is an object. `fields` and `interfaces` are valid fields.',
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description:
        'Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.',
    },
    UNION: {
      value: TypeKind.UNION,
      description:
        'Indicates this type is a union. `possibleTypes` is a valid field.',
    },
    ENUM: {
      value: TypeKind.ENUM,
      description:
        'Indicates this type is an enum. `enumValues` is a valid field.',
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description:
        'Indicates this type is an input object. `inputFields` is a valid field.',
    },
    LIST: {
      value: TypeKind.LIST,
      description: 'Indicates this type is a list. `ofType` is a valid field.',
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description:
        'Indicates this type is a non-null. `ofType` is a valid field.',
    },
  },
});

/**
 * Note that these are GraphQLField and not GraphQLFieldConfig,
 * so the format for args is different.
 */

export const SchemaMetaFieldDef: GraphQLField<mixed, mixed> = {
  name: '__schema',
  type: GraphQLNonNull(__Schema),
  description: 'Access the current type schema of this server.',
  args: [],
  resolve: (source, args, context, { schema }) => schema,
};

export const TypeMetaFieldDef: GraphQLField<mixed, mixed> = {
  name: '__type',
  type: __Type,
  description: 'Request the type information of a single type.',
  args: [{ name: 'name', type: GraphQLNonNull(GraphQLString) }],
  resolve: (source, { name }, context, { schema }) => schema.getType(name),
};

export const TypeNameMetaFieldDef: GraphQLField<mixed, mixed> = {
  name: '__typename',
  type: GraphQLNonNull(GraphQLString),
  description: 'The name of the current Object type at runtime.',
  args: [],
  resolve: (source, args, context, { parentType }) => parentType.name,
};

export const introspectionTypes = Object.freeze([
  __Schema,
  __Directive,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
  __EnumValue,
  __TypeKind,
]);

export function isIntrospectionType(type: mixed): boolean %checks {
  return (
    isNamedType(type) &&
    introspectionTypes.some(({ name }) => type.name === name)
  );
}
