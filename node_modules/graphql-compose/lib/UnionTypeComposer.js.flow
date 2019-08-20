/* @flow strict */
/* eslint-disable no-use-before-define */

// import invariant from 'graphql/jsutils/invariant';
import { GraphQLUnionType, GraphQLObjectType, GraphQLList, GraphQLNonNull } from './graphql';
import { isObject, isString, isFunction } from './utils/is';
import { inspect } from './utils/misc';
import { ObjectTypeComposer, type ComposeObjectType } from './ObjectTypeComposer';
import type { GraphQLResolveInfo, GraphQLTypeResolver } from './graphql';
import type { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type {
  Thunk,
  Extensions,
  MaybePromise,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { resolveTypeArrayAsThunk } from './utils/configAsThunk';
import { getGraphQLType, getComposeTypeName } from './utils/typeHelpers';
import { graphqlVersion } from './utils/graphqlVersion';

export type GraphQLUnionTypeExtended<TSource, TContext> = GraphQLUnionType & {
  _gqcTypeMap?: Map<string, ComposeObjectType>,
  _gqcTypeResolvers?: UnionTypeResolversMap<TSource, TContext>,
  _gqcExtensions?: Extensions,
};

export type UnionTypeResolversMap<TSource, TContext> = Map<
  ComposeObjectType,
  UnionTypeResolverCheckFn<TSource, TContext>
>;

export type UnionTypeResolverCheckFn<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => MaybePromise<boolean | null | void>;

export type ComposeUnionTypeConfig<TSource, TContext> = {
  +name: string,
  +types?: Thunk<ComposeObjectType[]>,
  +resolveType?: GraphQLTypeResolver<TSource, TContext> | null,
  +description?: string | null,
  +extensions?: Extensions,
};

export type UnionTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeUnionTypeConfig<TSource, TContext>;

export type ComposeUnionType =
  | UnionTypeComposer<any, any>
  | GraphQLUnionType
  | TypeDefinitionString
  | TypeAsString;

export class UnionTypeComposer<TSource, TContext> {
  gqType: GraphQLUnionTypeExtended<TSource, TContext>;
  schemaComposer: SchemaComposer<TContext>;

  // Also supported `GraphQLUnionType` but in such case Flowtype force developers
  // to explicitly write annotations in their code. But it's bad.
  static create<TSrc, TCtx>(
    typeDef: UnionTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): UnionTypeComposer<TSrc, TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `UnionTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const utc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(utc);
    return utc;
  }

  static createTemp<TSrc, TCtx>(
    typeDef: UnionTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): UnionTypeComposer<TSrc, TCtx> {
    const sc = schemaComposer || new SchemaComposer();
    let UTC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        UTC = new UnionTypeComposer(
          new GraphQLUnionType({
            name: typeName,
            types: () => [],
          }),
          sc
        );
      } else {
        UTC = sc.typeMapper.createType(typeName);
        if (!(UTC instanceof UnionTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLUnionType type definition.' +
              'Eg. `union MyType = Photo | Person`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLUnionType) {
      UTC = new UnionTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const types = typeDef.types;
      const type = new GraphQLUnionType({
        ...(typeDef: any),
        types: isFunction(types)
          ? () => resolveTypeArrayAsThunk(sc, (types(): any), typeDef.name)
          : () => [],
      });
      UTC = new UnionTypeComposer(type, sc);
      if (Array.isArray(types)) UTC.setTypes(types);
      UTC.gqType._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLUnionTypeConfig or string with union name or SDL definition. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return UTC;
  }

  constructor(
    gqType: GraphQLUnionType,
    schemaComposer: SchemaComposer<TContext>
  ): UnionTypeComposer<TSource, TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new UnionTypeComposer(GraphQLUnionType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLUnionType)) {
      throw new Error(
        'UnionTypeComposer accept only GraphQLUnionType in constructor. Try to use more flexible method `UnionTypeComposer.create()`.'
      );
    }
    this.gqType = (gqType: any);

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Union Types methods
  // -----------------------------------------------

  hasType(name: string | GraphQLObjectType | ObjectTypeComposer<any, TContext>): boolean {
    const nameAsString = getComposeTypeName(name);
    return this.getTypeNames().includes(nameAsString);
  }

  _getTypeMap() {
    if (!this.gqType._gqcTypeMap) {
      const types = this.gqType.getTypes();
      const m: Map<string, ComposeObjectType> = new Map();
      types.forEach(type => {
        m.set(getComposeTypeName(type), type);
      });
      this.gqType._gqcTypeMap = m;

      if (graphqlVersion >= 14) {
        this.gqType._types = () => {
          return resolveTypeArrayAsThunk(this.schemaComposer, this.getTypes(), this.getTypeName());
        };
      } else {
        (this.gqType: any)._types = null;
        (this.gqType: any)._typeConfig.types = () => {
          return resolveTypeArrayAsThunk(this.schemaComposer, this.getTypes(), this.getTypeName());
        };
      }
    }

    return this.gqType._gqcTypeMap;
  }

  getTypes(): ComposeObjectType[] {
    return Array.from(this._getTypeMap().values());
  }

  getTypeNames(): string[] {
    return Array.from(this._getTypeMap().keys());
  }

  clearTypes(): UnionTypeComposer<TSource, TContext> {
    this._getTypeMap().clear();
    return this;
  }

  setTypes(types: ComposeObjectType[]): UnionTypeComposer<TSource, TContext> {
    this.clearTypes();
    types.forEach(type => {
      this._getTypeMap().set(getComposeTypeName(type), type);
    });
    return this;
  }

  addType(type: ComposeObjectType): UnionTypeComposer<TSource, TContext> {
    this._getTypeMap().set(getComposeTypeName(type), type);
    return this;
  }

  removeType(nameOrArray: string | string[]): UnionTypeComposer<TSource, TContext> {
    const typeNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    typeNames.forEach(typeName => {
      this._getTypeMap().delete(typeName);
    });
    return this;
  }

  removeOtherTypes(nameOrArray: string | string[]): UnionTypeComposer<TSource, TContext> {
    const keepTypeNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    this._getTypeMap().forEach((v, i) => {
      if (keepTypeNames.indexOf(i) === -1) {
        this._getTypeMap().delete(i);
      }
    });
    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLUnionType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLUnionType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLUnionType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): UnionTypeComposer<TSource, TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): UnionTypeComposer<TSource, TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): UnionTypeComposer<TSource, TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for UnionTypeComposer.clone()');
    }

    const cloned = UnionTypeComposer.create(newTypeName, this.schemaComposer);
    cloned.setTypes(this.getTypes());
    cloned.setDescription(this.getDescription());

    return cloned;
  }

  merge(
    type: GraphQLUnionType | UnionTypeComposer<any, any>
  ): UnionTypeComposer<TSource, TContext> {
    if (type instanceof GraphQLUnionType) {
      type.getTypes().forEach((t: any) => this.addType(t));
    } else if (type instanceof UnionTypeComposer) {
      type.getTypes().forEach(t => this.addType(t));
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with UnionType(${this.getTypeName()}). Provided type should be GraphQLUnionType or UnionTypeComposer.`
      );
    }

    return this;
  }

  // -----------------------------------------------
  // ResolveType methods
  // -----------------------------------------------

  getResolveType(): ?GraphQLTypeResolver<TSource, TContext> {
    return (this.gqType.resolveType: any);
  }

  setResolveType(
    fn: ?GraphQLTypeResolver<TSource, TContext>
  ): UnionTypeComposer<TSource, TContext> {
    this.gqType.resolveType = fn;
    return this;
  }

  hasTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): boolean {
    const typeResolversMap = this.getTypeResolvers();
    return typeResolversMap.has(type);
  }

  getTypeResolvers(): UnionTypeResolversMap<TSource, TContext> {
    if (!this.gqType._gqcTypeResolvers) {
      this.gqType._gqcTypeResolvers = new Map();
    }
    return this.gqType._gqcTypeResolvers;
  }

  getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): UnionTypeResolverCheckFn<any, TContext> {
    const typeResolversMap = this.getTypeResolvers();

    if (!typeResolversMap.has(type)) {
      throw new Error(
        `Type resolve function in union '${this.getTypeName()}' is not defined for type ${inspect(
          type
        )}.`
      );
    }

    return (typeResolversMap.get(type): any);
  }

  getTypeResolverNames(): string[] {
    const typeResolversMap = this.getTypeResolvers();
    const names = [];
    typeResolversMap.forEach((resolveFn, composeType) => {
      if (composeType instanceof ObjectTypeComposer) {
        names.push(composeType.getTypeName());
      } else if (composeType && typeof composeType.name === 'string') {
        names.push(composeType.name);
      }
    });
    return names;
  }

  getTypeResolverTypes(): GraphQLObjectType[] {
    const typeResolversMap = this.getTypeResolvers();
    const types = [];
    typeResolversMap.forEach((resolveFn, composeType) => {
      types.push(((getGraphQLType(composeType): any): GraphQLObjectType));
    });
    return types;
  }

  setTypeResolvers(
    typeResolversMap: UnionTypeResolversMap<TSource, TContext>
  ): UnionTypeComposer<TSource, TContext> {
    this._isTypeResolversValid(typeResolversMap);

    this.gqType._gqcTypeResolvers = typeResolversMap;

    // extract GraphQLObjectType from ObjectTypeComposer
    const fastEntries = [];
    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      fastEntries.push([((getGraphQLType(composeType): any): GraphQLObjectType), checkFn]);
      this.addType(composeType);
    }

    let resolveType;
    const isAsyncRuntime = this._isTypeResolversAsync(typeResolversMap);
    if (isAsyncRuntime) {
      resolveType = async (value, context, info) => {
        for (const [gqType, checkFn] of fastEntries) {
          // should we run checkFn simultaniously or in serial?
          // Current decision is: dont SPIKE event loop - run in serial (it may be changed in future)
          // eslint-disable-next-line no-await-in-loop
          if (await checkFn(value, context, info)) return gqType;
        }
        return null;
      };
    } else {
      resolveType = (value, context, info) => {
        for (const [gqType, checkFn] of fastEntries) {
          if (checkFn(value, context, info)) return gqType;
        }
        return null;
      };
    }

    this.setResolveType(resolveType);
    return this;
  }

  _isTypeResolversValid(typeResolversMap: UnionTypeResolversMap<any, TContext>): true {
    if (!(typeResolversMap instanceof Map)) {
      throw new Error(
        `For union ${this.getTypeName()} you should provide Map object for type resolvers.`
      );
    }

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      // checking composeType
      try {
        const type = getGraphQLType(composeType);
        if (!(type instanceof GraphQLObjectType)) throw new Error('Must be GraphQLObjectType');
      } catch (e) {
        throw new Error(
          `For union type resolver ${this.getTypeName()} you must provide GraphQLObjectType or ObjectTypeComposer, but provided ${inspect(
            composeType
          )}`
        );
      }

      // checking checkFn
      if (!isFunction(checkFn)) {
        throw new Error(
          `Union ${this.getTypeName()} has invalid check function for type ${inspect(composeType)}`
        );
      }
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  _isTypeResolversAsync(typeResolversMap: UnionTypeResolversMap<any, TContext>): boolean {
    let res = false;
    for (const [, checkFn] of typeResolversMap.entries()) {
      try {
        const r = checkFn(({}: any), ({}: any), ({}: any));
        if (r instanceof Promise) {
          r.catch(() => {});
          res = true;
        }
      } catch (e) {
        // noop
      }
    }
    return res;
  }

  addTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
    checkFn: UnionTypeResolverCheckFn<TSource, TContext>
  ): UnionTypeComposer<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();
    typeResolversMap.set(type, checkFn);
    this.setTypeResolvers(typeResolversMap);
    return this;
  }

  removeTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): UnionTypeComposer<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();
    typeResolversMap.delete(type);
    this.setTypeResolvers(typeResolversMap);
    return this;
  }

  // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------

  getExtensions(): Extensions {
    if (!this.gqType._gqcExtensions) {
      return {};
    } else {
      return this.gqType._gqcExtensions;
    }
  }

  setExtensions(extensions: Extensions): UnionTypeComposer<TSource, TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): UnionTypeComposer<TSource, TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): UnionTypeComposer<TSource, TContext> {
    this.setExtensions({});
    return this;
  }

  getExtension(extensionName: string): ?any {
    const extensions = this.getExtensions();
    return extensions[extensionName];
  }

  hasExtension(extensionName: string): boolean {
    const extensions = this.getExtensions();
    return extensionName in extensions;
  }

  setExtension(extensionName: string, value: any): UnionTypeComposer<TSource, TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): UnionTypeComposer<TSource, TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  // -----------------------------------------------
  // Directive methods
  // -----------------------------------------------

  getDirectives(): Array<ExtensionsDirective> {
    const directives = this.getExtension('directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  getDirectiveNames(): string[] {
    return this.getDirectives().map(d => d.name);
  }

  getDirectiveByName(directiveName: string): ?DirectiveArgs {
    const directive = this.getDirectives().find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getDirectiveById(idx: number): ?DirectiveArgs {
    const directive = this.getDirectives()[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  // get(path: string | string[]): any {
  //   return typeByPath(this, path);
  // }
}
