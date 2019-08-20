/* @flow strict */
/* eslint-disable class-methods-use-this */

import deprecate from './utils/deprecate';
import { TypeStorage } from './TypeStorage';
import { TypeMapper } from './TypeMapper';
import { ObjectTypeComposer, type ObjectTypeComposeDefinition } from './ObjectTypeComposer';
import { InputTypeComposer, type InputTypeComposeDefinition } from './InputTypeComposer';
import { ScalarTypeComposer, type ScalarTypeComposeDefinition } from './ScalarTypeComposer';
import { EnumTypeComposer, type EnumTypeComposeDefinition } from './EnumTypeComposer';
import {
  InterfaceTypeComposer,
  type InterfaceTypeComposeDefinition,
} from './InterfaceTypeComposer';
import { UnionTypeComposer, type UnionTypeComposeDefinition } from './UnionTypeComposer';
import { Resolver, type ResolverOpts } from './Resolver';
import { isFunction } from './utils/is';
import { inspect, forEachKey } from './utils/misc';
import { getGraphQLType } from './utils/typeHelpers';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLDirective,
  GraphQLSkipDirective,
  GraphQLIncludeDirective,
  GraphQLDeprecatedDirective,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLList,
  type GraphQLType,
  type GraphQLNamedType,
  type SchemaDefinitionNode,
  type GraphQLResolveInfo,
} from './graphql';
import DefaultDirective from './directive/default';

type ExtraSchemaConfig = {
  types?: GraphQLNamedType[] | null,
  directives?: GraphQLDirective[] | null,
  astNode?: SchemaDefinitionNode | null,
};

export type AnyComposeType<TContext> =
  | ObjectTypeComposer<any, TContext>
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>
  | ScalarTypeComposer<TContext>;

export type AnyType<TContext> =
  | ObjectTypeComposer<any, TContext>
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>
  | ScalarTypeComposer<TContext>
  | GraphQLNamedType;

type GraphQLToolsResolveMethods<TContext> = {
  [typeName: string]: {
    [fieldName: string]: (
      source: any,
      args: Object,
      context: TContext,
      info: GraphQLResolveInfo
    ) => any,
  },
};

export const BUILT_IN_DIRECTIVES = [
  GraphQLSkipDirective,
  GraphQLIncludeDirective,
  GraphQLDeprecatedDirective,
  DefaultDirective,
];

export class SchemaComposer<TContext> extends TypeStorage<any, any> {
  typeMapper: TypeMapper<TContext>;
  _schemaMustHaveTypes: Array<AnyType<TContext>> = [];
  _directives: Array<GraphQLDirective> = BUILT_IN_DIRECTIVES;

  constructor(schema?: GraphQLSchema): SchemaComposer<TContext> {
    super();
    this.typeMapper = new TypeMapper(this);

    if (schema instanceof GraphQLSchema) {
      this.merge(schema);
    }

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  get Query(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Query');
  }

  /* @deprecated 7.0.0 */
  rootQuery(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Query property instead');
    return this.getOrCreateOTC('Query');
  }

  get Mutation(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Mutation');
  }

  /* @deprecated 7.0.0 */
  rootMutation(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Mutation property instead');
    return this.getOrCreateOTC('Mutation');
  }

  get Subscription(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Subscription');
  }

  /* @deprecated 7.0.0 */
  rootSubscription(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Subscription property instead');
    return this.getOrCreateOTC('Subscription');
  }

  buildSchema(extraConfig?: ExtraSchemaConfig): GraphQLSchema {
    const roots = {};

    if (this.has('Query')) {
      const tc = this.getOTC('Query');
      this.removeEmptyTypes(tc, new Set());
      roots.query = tc.getType();
    }

    if (this.has('Mutation')) {
      const tc = this.getOTC('Mutation');
      this.removeEmptyTypes(tc, new Set());
      roots.mutation = tc.getType();
    }

    if (this.has('Subscription')) {
      const tc = this.getOTC('Subscription');
      this.removeEmptyTypes(tc, new Set());
      roots.subscription = tc.getType();
    }

    if (!roots.query) {
      throw new Error(
        'Can not build schema. Must be initialized Query type. See https://github.com/graphql/graphql-js/issues/448'
      );
    }

    if (Object.keys(roots).length === 0) {
      throw new Error(
        'Can not build schema. Must be initialized at least one ' +
          'of the following types: Query, Mutation, Subscription.'
      );
    }

    const types = [
      ...this._schemaMustHaveTypes.map(t => (getGraphQLType(t): any)), // additional types, eg. used in Interfaces
      ...(extraConfig && Array.isArray(extraConfig.types) ? [...extraConfig.types] : []),
    ];

    const directives = [
      ...this._directives,
      ...(extraConfig && Array.isArray(extraConfig.directives) ? [...extraConfig.directives] : []),
    ];

    return new GraphQLSchema({ ...roots, ...extraConfig, types, directives });
  }

  addSchemaMustHaveType(type: AnyType<TContext>): SchemaComposer<TContext> {
    this._schemaMustHaveTypes.push(type);
    return this;
  }

  removeEmptyTypes(
    tc: ObjectTypeComposer<any, TContext>,
    passedTypes: Set<string> = new Set()
  ): void {
    tc.getFieldNames().forEach(fieldName => {
      const fieldType = tc.getFieldType(fieldName);
      if (fieldType instanceof GraphQLObjectType) {
        const typeName = fieldType.name;
        if (!passedTypes.has(typeName)) {
          passedTypes.add(typeName);
          const fieldTC = new ObjectTypeComposer(fieldType, this);
          if (Object.keys(fieldTC.getFields()).length > 0) {
            this.removeEmptyTypes(fieldTC, passedTypes);
          } else {
            // eslint-disable-next-line
            console.log(
              `graphql-compose: Delete field '${tc.getTypeName()}.${fieldName}' ` +
                `with type '${fieldTC.getTypeName()}', cause it does not have fields.`
            );
            tc.removeField(fieldName);
          }
        }
      }
    });
  }

  merge(schema: GraphQLSchema | SchemaComposer<any>): SchemaComposer<TContext> {
    let query;
    let mutation;
    let subscription;
    let typeMap: Map<any, any>;
    let directives;

    if (schema instanceof SchemaComposer) {
      query = schema.Query;
      mutation = schema.Mutation;
      subscription = schema.Subscription;
      typeMap = schema.types;
      directives = schema.getDirectives();
    } else if (schema instanceof GraphQLSchema) {
      query = schema.getQueryType();
      mutation = schema.getMutationType();
      subscription = schema.getSubscriptionType();
      typeMap = new Map();
      forEachKey(schema.getTypeMap(), (v, k) => {
        typeMap.set(k, v);
      });
      directives = schema.getDirectives();
    } else {
      throw new Error(
        'SchemaComposer.merge() accepts only GraphQLSchema or SchemaComposer instances.'
      );
    }

    // Root types may have any name, so import them manually.
    if (query) this.Query.merge(query);
    if (mutation) this.Mutation.merge(mutation);
    if (subscription) this.Subscription.merge(subscription);

    // Merging non-root types
    typeMap.forEach((type, key) => {
      // skip internal and root types
      if (
        (typeof key === 'string' && key.startsWith('__')) ||
        type === query ||
        type === mutation ||
        type === subscription
      )
        return;

      // merge regular types
      if (this.has(key)) {
        this.getAnyTC(key).merge((type: any));
      } else {
        this.set(key, type);
      }
    });

    directives.forEach(directive => {
      this.addDirective(directive);
    });

    return this;
  }

  /**
   * -----------------------------------------------
   * Like graphql-tools methods
   * -----------------------------------------------
   */

  addTypeDefs(typeDefs: string): TypeStorage<string, AnyComposeType<any>> {
    const types = this.typeMapper.parseTypesFromString(typeDefs);
    types.forEach((type: AnyComposeType<any>) => {
      const name = type.getTypeName();
      if (name !== 'Query' && name !== 'Mutation' && name !== 'Subscription') {
        this.add(type);
      }
    });
    if (types.has('Query')) {
      const tc = types.get('Query');
      if (!(tc instanceof ObjectTypeComposer)) {
        throw new Error(`Type Query in typedefs isn't an Object Type.`);
      }
      this.Query.addFields(tc.getFields());
    }
    if (types.has('Mutation')) {
      const tc = types.get('Mutation');
      if (!(tc instanceof ObjectTypeComposer)) {
        throw new Error(`Type Mutation in typedefs isn't an Object Type.`);
      }
      this.Mutation.addFields(tc.getFields());
    }
    if (types.has('Subscription')) {
      const tc = types.get('Subscription');
      if (!(tc instanceof ObjectTypeComposer)) {
        throw new Error(`Type Subscription in typedefs isn't an Object Type.`);
      }
      this.Subscription.addFields(tc.getFields());
    }
    return types;
  }

  addResolveMethods(typesFieldsResolve: GraphQLToolsResolveMethods<TContext>): void {
    const typeNames = Object.keys(typesFieldsResolve);
    typeNames.forEach(typeName => {
      let type = this.get(typeName);
      if (type instanceof ScalarTypeComposer) {
        type = type.getType();
      }
      if (type instanceof GraphQLScalarType) {
        const maybeScalar: any = typesFieldsResolve[typeName];
        if (maybeScalar instanceof GraphQLScalarType) {
          this.set(typeName, maybeScalar);
          return;
        }
        if (typeof maybeScalar.name === 'string' && typeof maybeScalar.serialize === 'function') {
          this.set(typeName, new GraphQLScalarType(maybeScalar));
          return;
        }
      }
      const tc = this.getOTC(typeName);
      const fieldsResolve = typesFieldsResolve[typeName];
      const fieldNames = Object.keys(fieldsResolve);
      fieldNames.forEach(fieldName => {
        tc.extendField(fieldName, {
          resolve: fieldsResolve[fieldName],
        });
      });
    });
  }

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  createObjectTC(
    typeDef: ObjectTypeComposeDefinition<any, TContext>
  ): ObjectTypeComposer<any, TContext> {
    return ObjectTypeComposer.create(typeDef, this);
  }

  createInputTC(typeDef: InputTypeComposeDefinition): InputTypeComposer<TContext> {
    return InputTypeComposer.create(typeDef, this);
  }

  createEnumTC(typeDef: EnumTypeComposeDefinition): EnumTypeComposer<TContext> {
    return EnumTypeComposer.create(typeDef, this);
  }

  createInterfaceTC(
    typeDef: InterfaceTypeComposeDefinition<any, TContext>
  ): InterfaceTypeComposer<any, TContext> {
    return InterfaceTypeComposer.create(typeDef, this);
  }

  createUnionTC(
    typeDef: UnionTypeComposeDefinition<any, TContext>
  ): UnionTypeComposer<any, TContext> {
    return UnionTypeComposer.create(typeDef, this);
  }

  createScalarTC(typeDef: ScalarTypeComposeDefinition): ScalarTypeComposer<TContext> {
    return ScalarTypeComposer.create(typeDef, this);
  }

  createResolver(opts: ResolverOpts<any, TContext>): Resolver<any, TContext> {
    return new Resolver<any, TContext, any>(opts, this);
  }

  createTC(
    typeOrSDL: mixed
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext> {
    if (this.has(typeOrSDL)) {
      return this.get(typeOrSDL);
    }
    const tc = this.createTempTC(typeOrSDL);
    this.set(tc.getTypeName(), tc);
    this.set(typeOrSDL, tc);
    return tc;
  }

  createTempTC(
    typeOrSDL: mixed
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext> {
    let type;
    if (typeof typeOrSDL === 'string') {
      type = this.typeMapper.createType(typeOrSDL);
    } else {
      type = typeOrSDL;
    }

    if (
      type instanceof ObjectTypeComposer ||
      type instanceof InputTypeComposer ||
      type instanceof ScalarTypeComposer ||
      type instanceof EnumTypeComposer ||
      type instanceof InterfaceTypeComposer ||
      type instanceof UnionTypeComposer
    ) {
      return type;
    } else if (type instanceof GraphQLObjectType) {
      return ObjectTypeComposer.createTemp(type, this);
    } else if (type instanceof GraphQLInputObjectType) {
      return InputTypeComposer.createTemp(type, this);
    } else if (type instanceof GraphQLScalarType) {
      return ScalarTypeComposer.createTemp(type, this);
    } else if (type instanceof GraphQLEnumType) {
      return EnumTypeComposer.createTemp(type, this);
    } else if (type instanceof GraphQLInterfaceType) {
      return InterfaceTypeComposer.createTemp(type, this);
    } else if (type instanceof GraphQLUnionType) {
      return UnionTypeComposer.createTemp(type, this);
    }

    throw new Error(`Cannot create as TypeComposer the following value: ${inspect(type)}.`);
  }

  /* @deprecated 7.0.0 */
  getOrCreateTC(
    typeName: string,
    onCreate?: (ObjectTypeComposer<any, TContext>) => any
  ): ObjectTypeComposer<any, TContext> {
    deprecate(`Use SchemaComposer.getOrCreateOTC() method instead`);
    return this.getOrCreateOTC(typeName, onCreate);
  }

  getOrCreateOTC(
    typeName: string,
    onCreate?: (ObjectTypeComposer<any, TContext>) => any
  ): ObjectTypeComposer<any, TContext> {
    try {
      return this.getOTC(typeName);
    } catch (e) {
      const tc = ObjectTypeComposer.create(typeName, this);
      this.set(typeName, tc);
      if (onCreate && isFunction(onCreate)) onCreate(tc);
      return tc;
    }
  }

  getOrCreateITC(
    typeName: string,
    onCreate?: (InputTypeComposer<TContext>) => any
  ): InputTypeComposer<TContext> {
    try {
      return this.getITC(typeName);
    } catch (e) {
      const itc = InputTypeComposer.create(typeName, this);
      this.set(typeName, itc);
      if (onCreate && isFunction(onCreate)) onCreate(itc);
      return itc;
    }
  }

  getOrCreateETC(
    typeName: string,
    onCreate?: (EnumTypeComposer<TContext>) => any
  ): EnumTypeComposer<TContext> {
    try {
      return this.getETC(typeName);
    } catch (e) {
      const etc = EnumTypeComposer.create(typeName, this);
      this.set(typeName, etc);
      if (onCreate && isFunction(onCreate)) onCreate(etc);
      return etc;
    }
  }

  getOrCreateIFTC(
    typeName: string,
    onCreate?: (InterfaceTypeComposer<any, TContext>) => any
  ): InterfaceTypeComposer<any, TContext> {
    try {
      return this.getIFTC(typeName);
    } catch (e) {
      const iftc = InterfaceTypeComposer.create(typeName, this);
      this.set(typeName, iftc);
      if (onCreate && isFunction(onCreate)) onCreate(iftc);
      return iftc;
    }
  }

  getOrCreateUTC(
    typeName: string,
    onCreate?: (UnionTypeComposer<any, TContext>) => any
  ): UnionTypeComposer<any, TContext> {
    try {
      return this.getUTC(typeName);
    } catch (e) {
      const utc = UnionTypeComposer.create(typeName, this);
      this.set(typeName, utc);
      if (onCreate && isFunction(onCreate)) onCreate(utc);
      return utc;
    }
  }

  getOrCreateSTC(
    typeName: string,
    onCreate?: (ScalarTypeComposer<TContext>) => any
  ): ScalarTypeComposer<TContext> {
    try {
      return this.getSTC(typeName);
    } catch (e) {
      const stc = ScalarTypeComposer.create(typeName, this);
      this.set(typeName, stc);
      if (onCreate && isFunction(onCreate)) onCreate(stc);
      return stc;
    }
  }

  /* @deprecated 7.0.0 */
  getTC(typeName: any): ObjectTypeComposer<any, TContext> {
    deprecate(`Use SchemaComposer.getOTC() method instead`);
    return this.getOTC(typeName);
  }

  getOTC(typeName: any): ObjectTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLObjectType)) {
      return ObjectTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, ObjectTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find ObjectTypeComposer with name ${typeName}`);
  }

  getITC(typeName: any): InputTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLInputObjectType)) {
      return InputTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, InputTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find InputTypeComposer with name ${typeName}`);
  }

  getETC(typeName: any): EnumTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLEnumType)) {
      return EnumTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, EnumTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find EnumTypeComposer with name ${typeName}`);
  }

  getIFTC(typeName: any): InterfaceTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLInterfaceType)) {
      return InterfaceTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, InterfaceTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find InterfaceTypeComposer with name ${typeName}`);
  }

  getUTC(typeName: any): UnionTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLUnionType)) {
      return UnionTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, UnionTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find UnionTypeComposer with name ${typeName}`);
  }

  getSTC(typeName: any): ScalarTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLScalarType)) {
      return ScalarTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, ScalarTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find ScalarTypeComposer with name ${typeName}`);
  }

  getAnyTC(
    typeOrName: string | AnyType<any> | GraphQLType
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext> {
    let type;
    if (typeof typeOrName === 'string') {
      type = this.get(typeOrName);
    } else {
      type = typeOrName;
    }

    if (type == null) {
      throw new Error(`Cannot find type with name ${(typeOrName: any)}`);
    } else if (
      type instanceof ObjectTypeComposer ||
      type instanceof InputTypeComposer ||
      type instanceof ScalarTypeComposer ||
      type instanceof EnumTypeComposer ||
      type instanceof InterfaceTypeComposer ||
      type instanceof UnionTypeComposer
    ) {
      return type;
    }

    while (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
      type = type.ofType;
    }

    if (type instanceof GraphQLObjectType) {
      return ObjectTypeComposer.create(type, this);
    } else if (type instanceof GraphQLInputObjectType) {
      return InputTypeComposer.create(type, this);
    } else if (type instanceof GraphQLScalarType) {
      return ScalarTypeComposer.create(type, this);
    } else if (type instanceof GraphQLEnumType) {
      return EnumTypeComposer.create(type, this);
    } else if (type instanceof GraphQLInterfaceType) {
      return InterfaceTypeComposer.create(type, this);
    } else if (type instanceof GraphQLUnionType) {
      return UnionTypeComposer.create(type, this);
    }

    throw new Error(
      `Type with name ${inspect(
        typeOrName
      )} cannot be obtained as any Composer helper. Put something strange?`
    );
  }

  addAsComposer(typeOrSDL: mixed): string {
    const composer = this.createTempTC(typeOrSDL);
    this.set(composer.getTypeName(), composer);
    return composer.getTypeName();
  }

  /**
   * -----------------------------------------------
   * Storage methods
   * -----------------------------------------------
   */

  clear(): void {
    super.clear();
    this._schemaMustHaveTypes = [];
    this._directives = BUILT_IN_DIRECTIVES;
    this.typeMapper.initScalars();
  }

  add(typeOrSDL: mixed): ?string {
    if (typeof typeOrSDL === 'string') {
      return this.addAsComposer(typeOrSDL);
    } else {
      return super.add((typeOrSDL: any));
    }
  }

  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */

  addDirective(directive: GraphQLDirective): SchemaComposer<TContext> {
    if (!(directive instanceof GraphQLDirective)) {
      throw new Error(
        `You should provide GraphQLDirective to schemaComposer.addDirective(), but recieved ${inspect(
          directive
        )}`
      );
    }
    if (!this.hasDirective(directive)) {
      this._directives.push(directive);
    }
    return this;
  }

  removeDirective(directive: GraphQLDirective): SchemaComposer<TContext> {
    this._directives = this._directives.filter(o => o !== directive);
    return this;
  }

  getDirectives(): Array<GraphQLDirective> {
    return this._directives;
  }

  /**
   * This method used in TypeMapper and for fast parsing
   */
  _getDirective(name: string): ?GraphQLDirective {
    const directives = this.getDirectives();
    return directives.find(d => d.name === name);
  }

  getDirective(name: string): GraphQLDirective {
    const directive = this._getDirective(name);
    if (!directive) {
      throw new Error(`Directive instance with name ${name} does not exists.`);
    }
    return directive;
  }

  hasDirective(directive: string | GraphQLDirective): boolean {
    if (!directive) return false;

    if (typeof directive === 'string') {
      const name = directive.startsWith('@') ? directive.slice(1) : directive;
      return !!this._directives.find(o => o.name === name);
    } else if (directive instanceof GraphQLDirective) {
      return !!this._directives.find(o => o === directive);
    }

    return false;
  }

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  // disable redundant noise in console.logs
  toString(): string {
    return 'SchemaComposer';
  }

  toJSON() {
    return 'SchemaComposer';
  }

  inspect() {
    return 'SchemaComposer';
  }
}
