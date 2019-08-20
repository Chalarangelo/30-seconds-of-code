// @flow strict

import find from '../polyfills/find';
import objectValues from '../polyfills/objectValues';
import isObjectLike from '../jsutils/isObjectLike';
import {
  type GraphQLType,
  type GraphQLNamedType,
  type GraphQLAbstractType,
  type GraphQLObjectType,
  isAbstractType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isInputObjectType,
  isWrappingType,
} from './definition';
import {
  type SchemaDefinitionNode,
  type SchemaExtensionNode,
} from '../language/ast';
import {
  GraphQLDirective,
  isDirective,
  specifiedDirectives,
} from './directives';
import { type GraphQLError } from '../error/GraphQLError';
import inspect from '../jsutils/inspect';
import { __Schema } from './introspection';
import defineToStringTag from '../jsutils/defineToStringTag';
import instanceOf from '../jsutils/instanceOf';
import invariant from '../jsutils/invariant';
import { type ObjMap } from '../jsutils/ObjMap';

/**
 * Test if the given value is a GraphQL schema.
 */
declare function isSchema(schema: mixed): boolean %checks(schema instanceof
  GraphQLSchema);
// eslint-disable-next-line no-redeclare
export function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}

export function assertSchema(schema: mixed): GraphQLSchema {
  invariant(
    isSchema(schema),
    `Expected ${inspect(schema)} to be a GraphQL schema.`,
  );
  return schema;
}

/**
 * Schema Definition
 *
 * A Schema is created by supplying the root types of each type of operation,
 * query and mutation (optional). A schema definition is then supplied to the
 * validator and executor.
 *
 * Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       query: MyAppQueryRootType,
 *       mutation: MyAppMutationRootType,
 *     })
 *
 * Note: When the schema is constructed, by default only the types that are
 * reachable by traversing the root types are included, other types must be
 * explicitly referenced.
 *
 * Example:
 *
 *     const characterInterface = new GraphQLInterfaceType({
 *       name: 'Character',
 *       ...
 *     });
 *
 *     const humanType = new GraphQLObjectType({
 *       name: 'Human',
 *       interfaces: [characterInterface],
 *       ...
 *     });
 *
 *     const droidType = new GraphQLObjectType({
 *       name: 'Droid',
 *       interfaces: [characterInterface],
 *       ...
 *     });
 *
 *     const schema = new GraphQLSchema({
 *       query: new GraphQLObjectType({
 *         name: 'Query',
 *         fields: {
 *           hero: { type: characterInterface, ... },
 *         }
 *       }),
 *       ...
 *       // Since this schema references only the `Character` interface it's
 *       // necessary to explicitly list the types that implement it if
 *       // you want them to be included in the final schema.
 *       types: [humanType, droidType],
 *     })
 *
 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
 * the exact list of directives represented and allowed. If `directives` is not
 * provided then a default set of the specified directives (e.g. @include and
 * @skip) will be used. If you wish to provide *additional* directives to these
 * specified directives, you must explicitly declare them. Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       ...
 *       directives: specifiedDirectives.concat([ myCustomDirective ]),
 *     })
 *
 */
export class GraphQLSchema {
  astNode: ?SchemaDefinitionNode;
  extensionASTNodes: ?$ReadOnlyArray<SchemaExtensionNode>;
  _queryType: ?GraphQLObjectType;
  _mutationType: ?GraphQLObjectType;
  _subscriptionType: ?GraphQLObjectType;
  _directives: $ReadOnlyArray<GraphQLDirective>;
  _typeMap: TypeMap;
  _implementations: ObjMap<Array<GraphQLObjectType>>;
  _possibleTypeMap: ObjMap<ObjMap<boolean>>;
  // Used as a cache for validateSchema().
  __validationErrors: ?$ReadOnlyArray<GraphQLError>;
  // Referenced by validateSchema().
  __allowedLegacyNames: $ReadOnlyArray<string>;

  constructor(config: GraphQLSchemaConfig): void {
    // If this schema was built from a source known to be valid, then it may be
    // marked with assumeValid to avoid an additional type system validation.
    if (config && config.assumeValid) {
      this.__validationErrors = [];
    } else {
      this.__validationErrors = undefined;

      // Otherwise check for common mistakes during construction to produce
      // clear and early error messages.
      invariant(isObjectLike(config), 'Must provide configuration object.');
      invariant(
        !config.types || Array.isArray(config.types),
        `"types" must be Array if provided but got: ${inspect(config.types)}.`,
      );
      invariant(
        !config.directives || Array.isArray(config.directives),
        '"directives" must be Array if provided but got: ' +
          `${inspect(config.directives)}.`,
      );
      invariant(
        !config.allowedLegacyNames || Array.isArray(config.allowedLegacyNames),
        '"allowedLegacyNames" must be Array if provided but got: ' +
          `${inspect(config.allowedLegacyNames)}.`,
      );
    }

    this.__allowedLegacyNames = config.allowedLegacyNames || [];
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription;
    // Provide specified directives (e.g. @include and @skip) by default.
    this._directives = config.directives || specifiedDirectives;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;

    // Build type map now to detect any errors within this schema.
    let initialTypes: Array<?GraphQLNamedType> = [
      this.getQueryType(),
      this.getMutationType(),
      this.getSubscriptionType(),
      __Schema,
    ];

    const types = config.types;
    if (types) {
      initialTypes = initialTypes.concat(types);
    }

    // Keep track of all types referenced within the schema.
    let typeMap: TypeMap = Object.create(null);

    // First by deeply visiting all initial types.
    typeMap = initialTypes.reduce(typeMapReducer, typeMap);

    // Then by deeply visiting all directive types.
    typeMap = this._directives.reduce(typeMapDirectiveReducer, typeMap);

    // Storing the resulting map for reference by the schema.
    this._typeMap = typeMap;

    this._possibleTypeMap = Object.create(null);

    // Keep track of all implementations by interface name.
    this._implementations = Object.create(null);
    for (const type of objectValues(this._typeMap)) {
      if (isObjectType(type)) {
        for (const iface of type.getInterfaces()) {
          if (isInterfaceType(iface)) {
            const impls = this._implementations[iface.name];
            if (impls) {
              impls.push(type);
            } else {
              this._implementations[iface.name] = [type];
            }
          }
        }
      } else if (isAbstractType(type) && !this._implementations[type.name]) {
        this._implementations[type.name] = [];
      }
    }
  }

  getQueryType(): ?GraphQLObjectType {
    return this._queryType;
  }

  getMutationType(): ?GraphQLObjectType {
    return this._mutationType;
  }

  getSubscriptionType(): ?GraphQLObjectType {
    return this._subscriptionType;
  }

  getTypeMap(): TypeMap {
    return this._typeMap;
  }

  getType(name: string): ?GraphQLNamedType {
    return this.getTypeMap()[name];
  }

  getPossibleTypes(
    abstractType: GraphQLAbstractType,
  ): $ReadOnlyArray<GraphQLObjectType> {
    if (isUnionType(abstractType)) {
      return abstractType.getTypes();
    }
    return this._implementations[abstractType.name];
  }

  isPossibleType(
    abstractType: GraphQLAbstractType,
    possibleType: GraphQLObjectType,
  ): boolean {
    const possibleTypeMap = this._possibleTypeMap;

    if (!possibleTypeMap[abstractType.name]) {
      const possibleTypes = this.getPossibleTypes(abstractType);
      possibleTypeMap[abstractType.name] = possibleTypes.reduce((map, type) => {
        map[type.name] = true;
        return map;
      }, Object.create(null));
    }

    return Boolean(possibleTypeMap[abstractType.name][possibleType.name]);
  }

  getDirectives(): $ReadOnlyArray<GraphQLDirective> {
    return this._directives;
  }

  getDirective(name: string): ?GraphQLDirective {
    return find(this.getDirectives(), directive => directive.name === name);
  }

  toConfig(): {|
    ...GraphQLSchemaConfig,
    types: Array<GraphQLNamedType>,
    directives: Array<GraphQLDirective>,
    extensionASTNodes: $ReadOnlyArray<SchemaExtensionNode>,
    assumeValid: boolean,
    allowedLegacyNames: $ReadOnlyArray<string>,
  |} {
    return {
      types: objectValues(this.getTypeMap()),
      directives: this.getDirectives().slice(),
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes || [],
      assumeValid: this.__validationErrors !== undefined,
      allowedLegacyNames: this.__allowedLegacyNames,
    };
  }
}

// Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported
defineToStringTag(GraphQLSchema);

type TypeMap = ObjMap<GraphQLNamedType>;

export type GraphQLSchemaValidationOptions = {|
  /**
   * When building a schema from a GraphQL service's introspection result, it
   * might be safe to assume the schema is valid. Set to true to assume the
   * produced schema is valid.
   *
   * Default: false
   */
  assumeValid?: boolean,

  /**
   * If provided, the schema will consider fields or types with names included
   * in this list valid, even if they do not adhere to the specification's
   * schema validation rules.
   *
   * This option is provided to ease adoption and will be removed in v15.
   */
  allowedLegacyNames?: ?$ReadOnlyArray<string>,
|};

export type GraphQLSchemaConfig = {|
  query?: ?GraphQLObjectType,
  mutation?: ?GraphQLObjectType,
  subscription?: ?GraphQLObjectType,
  types?: ?Array<GraphQLNamedType>,
  directives?: ?Array<GraphQLDirective>,
  astNode?: ?SchemaDefinitionNode,
  extensionASTNodes?: ?$ReadOnlyArray<SchemaExtensionNode>,
  ...GraphQLSchemaValidationOptions,
|};

function typeMapReducer(map: TypeMap, type: ?GraphQLType): TypeMap {
  if (!type) {
    return map;
  }
  if (isWrappingType(type)) {
    return typeMapReducer(map, type.ofType);
  }
  if (map[type.name]) {
    invariant(
      map[type.name] === type,
      'Schema must contain uniquely named types but contains multiple ' +
        `types named "${type.name}".`,
    );
    return map;
  }
  map[type.name] = type;

  let reducedMap = map;

  if (isUnionType(type)) {
    reducedMap = type.getTypes().reduce(typeMapReducer, reducedMap);
  }

  if (isObjectType(type)) {
    reducedMap = type.getInterfaces().reduce(typeMapReducer, reducedMap);
  }

  if (isObjectType(type) || isInterfaceType(type)) {
    for (const field of objectValues(type.getFields())) {
      if (field.args) {
        const fieldArgTypes = field.args.map(arg => arg.type);
        reducedMap = fieldArgTypes.reduce(typeMapReducer, reducedMap);
      }
      reducedMap = typeMapReducer(reducedMap, field.type);
    }
  }

  if (isInputObjectType(type)) {
    for (const field of objectValues(type.getFields())) {
      reducedMap = typeMapReducer(reducedMap, field.type);
    }
  }

  return reducedMap;
}

function typeMapDirectiveReducer(
  map: TypeMap,
  directive: ?GraphQLDirective,
): TypeMap {
  // Directives are not validated until validateSchema() is called.
  if (!isDirective(directive)) {
    return map;
  }
  return directive.args.reduce(
    (_map, arg) => typeMapReducer(_map, arg.type),
    map,
  );
}
