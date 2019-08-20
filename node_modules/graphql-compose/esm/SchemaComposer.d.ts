import {
  GraphQLSchema,
  GraphQLNamedType,
  GraphQLDirective,
  SchemaDefinitionNode,
  GraphQLResolveInfo,
  GraphQLType,
} from 'graphql';
import { ObjectTypeComposer, ObjectTypeComposeDefinition, ArgsMap } from './ObjectTypeComposer';
import { InputTypeComposer, InputTypeComposeDefinition } from './InputTypeComposer';
import { ScalarTypeComposer, ScalarTypeComposeDefinition } from './ScalarTypeComposer';
import { EnumTypeComposer, EnumTypeComposeDefinition } from './EnumTypeComposer';
import { InterfaceTypeComposer, InterfaceTypeComposeDefinition } from './InterfaceTypeComposer';
import { UnionTypeComposer, UnionTypeComposeDefinition } from './UnionTypeComposer';
import { TypeStorage } from './TypeStorage';
import { TypeMapper } from './TypeMapper';
import { Resolver, ResolverOpts } from './Resolver';

type ExtraSchemaConfig = {
  types?: GraphQLNamedType[] | null;
  directives?: GraphQLDirective[] | null;
  astNode?: SchemaDefinitionNode | null;
};

type AnyComposeType<TContext> =
  | ObjectTypeComposer<any, TContext>
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>
  | ScalarTypeComposer<TContext>;

type AnyType<TContext> =
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
      args: {},
      context: TContext,
      info: GraphQLResolveInfo
    ) => any;
  };
};

/**
 * `SchemaComposer` is a class which helps to create `GraphQLSchema`.
 */
export class SchemaComposer<TContext> extends TypeStorage<any, any> {
  /**
   * Returns `ObjectTypeComposer` of `Query` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Query.addFields({ field1: 'String' });
   */
  public readonly Query: ObjectTypeComposer<any, TContext>;

  /**
   * Returns `ObjectTypeComposer` of `Mutation` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Mutation.addFields({ field1: 'String' });
   */
  public readonly Mutation: ObjectTypeComposer<any, TContext>;

  /**
   * Returns `ObjectTypeComposer` of `Subscription` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Subscription.addFields({ field1: 'String' });
   */
  public readonly Subscription: ObjectTypeComposer<any, TContext>;

  public typeMapper: TypeMapper<TContext>;
  protected _schemaMustHaveTypes: Array<AnyType<TContext>>;
  protected _directives: GraphQLDirective[];

  public constructor(schema?: GraphQLSchema);

  /**
   * Create `GraphQLSchema` instance from defined types.
   * This instance can be provided to `express-graphql`, `apollo-server`, `graphql-yoga` etc.
   */
  public buildSchema(extraConfig?: ExtraSchemaConfig): GraphQLSchema;

  /**
   * When using Interfaces you may have such Types which are hidden under Interface.resolveType method. In such cases you should add these types explicitly. Cause `buildSchema()` will take only real used types and types which added via `addSchemaMustHaveType()` method.
   */
  public addSchemaMustHaveType(type: AnyType<TContext>): this;

  /**
   * Deeply traverse fields in Query, Mutation, Subscription & sub-objects
   * where will be removed all fields with empty object types (without sub-fields).
   */
  public removeEmptyTypes(tc: ObjectTypeComposer<any, TContext>, passedTypes: Set<string>): void;

  /**
   * Load all types from GraphQLSchema and merge with current SchemaComposer's types.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.merge(someSchema1);
   *     schemaComposer.merge(someSchema2);
   *     schemaComposer.merge(someSchema3);
   *     const schemaComposer.getOTC('User').removeField('password');
   *     const newSchema = schemaComposer.buildSchema();
   */
  public merge(schema: GraphQLSchema | SchemaComposer<any>): this;

  /**
   * -----------------------------------------------
   * Like graphql-tools methods
   * -----------------------------------------------
   */

  /**
   * Add types to Schema via SDL string. Returns a Map of parsed types.
   *
   * @example
   *     const schemaComposer = new SchemaComposer();
   *     schemaComposer.addTypeDefs(`
   *       type Post {
   *         id: Int!
   *         title: String
   *         votes: Int
   *       }
   *       enum Sort {
   *         ASC
   *         DESC
   *       }
   *     `);
   *
   * @description
   * After that your added types will be avaliable for referencing via string, eg.
   *
   * @example
   *     ObjectTypeComposer.create({
   *       name: 'Author',
   *       fields: {
   *         posts: {
   *           type: '[Post!]',
   *           args: {
   *             sort: 'Sort',
   *           },
   *           resolve: () => {},
   *         }
   *       }
   *     });
   */
  public addTypeDefs(typeDefs: string): TypeStorage<string, GraphQLNamedType>;

  /**
   * Define `resolve` methods for Types in `graphql-tools` manner.
   *
   * @example
   *     declare function addResolveMethods(typesFieldsResolve: {
   *       [typeName: string]: {
   *         [fieldName: string]: (
   *           source: any,
   *           args: Object,
   *           context: TContext,
   *           info: GraphQLResolveInfo
   *         ) => any,
   *       },
   *     }): void
   *
   * @description
   * More details can be found in [issue #142](https://github.com/graphql-compose/graphql-compose/issues/142).
   */
  public addResolveMethods(typesFieldsResolve: GraphQLToolsResolveMethods<TContext>): void;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public createObjectTC<TSource = any>(
    typeDef: ObjectTypeComposeDefinition<TSource, TContext>
  ): ObjectTypeComposer<TSource, TContext>;

  public createInputTC(typeDef: InputTypeComposeDefinition): InputTypeComposer<TContext>;

  public createEnumTC(typeDef: EnumTypeComposeDefinition): EnumTypeComposer<TContext>;

  public createInterfaceTC<TSource = any>(
    typeDef: InterfaceTypeComposeDefinition<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext>;

  public createUnionTC<TSource = any>(
    typeDef: UnionTypeComposeDefinition<TSource, TContext>
  ): UnionTypeComposer<TSource, TContext>;

  public createScalarTC(typeDef: ScalarTypeComposeDefinition): ScalarTypeComposer<TContext>;

  public createResolver<TSource = any, TArgs = ArgsMap>(
    opts: ResolverOpts<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs>;

  /**
   * Creates or return existed TypeComposer from SDL or object.
   * If you call this method again with same params should be returned the same TypeComposer instance.
   */
  public createTC(
    typeOrSDL: any
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext>;

  /**
   * Creates TypeComposer from SDL or object without adding it to the type storage.
   */
  public createTempTC(
    typeOrSDL: any
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext>;

  public getOrCreateOTC<TSource = any>(
    typeName: string,
    onCreate?: (tc: ObjectTypeComposer<TSource, TContext>) => any
  ): ObjectTypeComposer<TSource, TContext>;

  public getOrCreateITC(
    typeName: string,
    onCreate?: (itc: InputTypeComposer<TContext>) => any
  ): InputTypeComposer<TContext>;

  public getOrCreateETC(
    typeName: string,
    onCreate?: (etc: EnumTypeComposer<TContext>) => any
  ): EnumTypeComposer<TContext>;

  public getOrCreateIFTC<TSource = any>(
    typeName: string,
    onCreate?: (iftc: InterfaceTypeComposer<TSource, TContext>) => any
  ): InterfaceTypeComposer<TSource, TContext>;

  public getOrCreateUTC<TSource = any>(
    typeName: string,
    onCreate?: (utc: UnionTypeComposer<TSource, TContext>) => any
  ): UnionTypeComposer<TSource, TContext>;

  public getOrCreateSTC(
    typeName: string,
    onCreate?: (stc: ScalarTypeComposer<TContext>) => any
  ): ScalarTypeComposer<TContext>;

  public getOTC<TSource = any>(typeName: any): ObjectTypeComposer<TSource, TContext>;

  public getITC(typeName: any): InputTypeComposer<TContext>;

  public getETC(typeName: any): EnumTypeComposer<TContext>;

  public getIFTC<TSource = any>(typeName: any): InterfaceTypeComposer<TSource, TContext>;

  public getUTC<TSource = any>(typeName: any): UnionTypeComposer<TSource, TContext>;

  public getSTC(typeName: any): ScalarTypeComposer<TContext>;

  public getAnyTC(
    typeName: string | AnyType<any> | GraphQLType
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext>;

  public addAsComposer(typeOrSDL: any): string;

  /**
   * -----------------------------------------------
   * Storage methods
   * -----------------------------------------------
   */

  public clear(): void;

  public delete(key: any): boolean;

  public entries(): Iterator<[any, AnyType<TContext>]>;

  public forEach(
    callbackfn: (value: AnyType<TContext>, index: any, map: Map<any, AnyType<TContext>>) => any,
    thisArg?: any
  ): void;

  public get(key: any): AnyType<TContext>;

  public has(key: any): boolean;

  public keys(): Iterator<any>;

  public set(key: any, value: AnyType<TContext>): this;

  public values(): Iterator<AnyType<TContext>>;

  public add(typeOrSDL: any): string | null;

  public hasInstance(key: any, ClassObj: any): boolean;

  public getOrSet(
    key: any,
    typeOrThunk: AnyType<TContext> | (() => AnyType<TContext>)
  ): AnyType<TContext>;

  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */

  public addDirective(directive: GraphQLDirective): this;

  public removeDirective(directive: GraphQLDirective): this;

  public getDirectives(): GraphQLDirective[];

  public getDirective(name: string): GraphQLDirective;

  public hasDirective(directive: string | GraphQLDirective): boolean;

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  public toString(): string;
  public toJSON(): string;
  public inspect(): string;
}
