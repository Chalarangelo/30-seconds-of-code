import {
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from 'graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import {
  ComposeFieldConfig,
  ComposeFieldConfigMap,
  ComposeFieldConfigAsObject,
  ObjectTypeComposer,
  ComposeArgumentConfig,
  ComposeArgumentConfigAsObject,
  ComposeFieldConfigArgumentMap,
  ArgsMap,
} from './ObjectTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { TypeAsString, TypeDefinitionString } from './TypeMapper';
import {
  Thunk,
  MaybePromise,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';

export type GraphQLInterfaceTypeExtended<TSource, TContext> = GraphQLInterfaceType & {
  _gqcFields?: ComposeFieldConfigMap<TSource, TContext>;
  _gqcInputTypeComposer?: InputTypeComposer<TContext>;
  _gqcTypeResolvers?: InterfaceTypeResolversMap<TContext>;
  _gqcExtensions?: Extensions;
};

export type InterfaceTypeResolversMap<TContext> = Map<
  ObjectTypeComposer<any, TContext> | GraphQLObjectType,
  InterfaceTypeResolverCheckFn<any, TContext>
>;

export type InterfaceTypeResolverCheckFn<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => MaybePromise<boolean | null | undefined>;

export type ComposeInterfaceTypeConfig<TSource, TContext> = {
  name: string;
  fields?: Thunk<ComposeFieldConfigMap<TSource, TContext>>;
  resolveType?: GraphQLTypeResolver<TSource, TContext> | null;
  description?: string | null;
  extensions?: Extensions;
};

export type InterfaceTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeInterfaceTypeConfig<TSource, TContext>;

export type ComposeInterfaceType =
  | InterfaceTypeComposer<any, any>
  | GraphQLInterfaceType
  | TypeDefinitionString
  | TypeAsString;

/**
 * Class that helps to create `GraphQLInterfaceType`s and provide ability to modify them.
 */
export class InterfaceTypeComposer<TSource = any, TContext = any> {
  public sc: SchemaComposer<TContext>;

  protected gqType: GraphQLInterfaceTypeExtended<TSource, TContext>;

  public constructor(gqType: GraphQLInterfaceType, schemaComposer: SchemaComposer<TContext>);

  /**
   * Create `InterfaceTypeComposer` with adding it by name to the `SchemaComposer`.
   */
  public static create<TSrc = any, TCtx = any>(
    typeDef: InterfaceTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx>;

  /**
   * Create `InterfaceTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TSrc = any, TCtx = any>(
    typeDef: InterfaceTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx>;

  /**
   * -----------------------------------------------
   * Field methods
   * -----------------------------------------------
   */

  public hasField(name: string): boolean;

  public getFields(): ComposeFieldConfigMap<TSource, TContext>;

  public getField(name: string): ComposeFieldConfigAsObject<TSource, TContext>;

  public getFieldNames(): string[];

  public setFields(fields: ComposeFieldConfigMap<TSource, TContext>): this;

  public setField(name: string, fieldConfig: ComposeFieldConfig<TSource, TContext>): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newValues: ComposeFieldConfigMap<TSource, TContext>): this;

  public removeField(nameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField(
    fieldName: string,
    partialFieldConfig: Partial<ComposeFieldConfigAsObject<TSource, TContext>>
  ): this;

  public isFieldNonNull(fieldName: string): boolean;

  public getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext>;

  public getFieldType(fieldName: string): GraphQLOutputType;

  public getFieldTC(
    fieldName: string
  ):
    | ObjectTypeComposer<TSource, TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<TSource, TContext>
    | UnionTypeComposer<TSource, TContext>
    | ScalarTypeComposer<TContext>;

  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldOTC(fieldName: string): ObjectTypeComposer<TSource, TContext>;

  public makeFieldNonNull(fieldNameOrArray: string | string[]): this;

  public makeFieldNullable(fieldNameOrArray: string | string[]): this;

  public deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this;

  public getFieldArgs<TArgs = ArgsMap>(fieldName: string): ComposeFieldConfigArgumentMap<TArgs>;

  public hasFieldArg(fieldName: string, argName: string): boolean;

  public getFieldArg(fieldName: string, argName: string): ComposeArgumentConfigAsObject;

  public getFieldArgType(fieldName: string, argName: string): GraphQLInputType;

  public getFieldArgTC(
    fieldName: string,
    argName: string
  ): InputTypeComposer<TContext> | EnumTypeComposer<TContext> | ScalarTypeComposer<TContext>;

  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldArgITC(fieldName: string, argName: string): InputTypeComposer<TContext>;

  public setFieldArgs(fieldName: string, args: ComposeFieldConfigArgumentMap<any>): this;

  public addFieldArgs(fieldName: string, newArgs: ComposeFieldConfigMap<TSource, TContext>): this;

  public setFieldArg(fieldName: string, argName: string, argConfig: ComposeArgumentConfig): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLInterfaceType;

  public getTypePlural(): GraphQLList<GraphQLInterfaceType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLInterfaceType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): this;

  /**
   * -----------------------------------------------
   * InputType methods
   * -----------------------------------------------
   */

  public getInputType(): GraphQLInputObjectType;

  public hasInputTypeComposer(): boolean;

  public setInputTypeComposer(itc: InputTypeComposer<TContext>): this;

  public getInputTypeComposer(): InputTypeComposer<TContext>;

  /**
   * An alias for `getInputTypeComposer`
   */
  public getITC(): InputTypeComposer<TContext>;

  public removeInputTypeComposer(): this;

  /**
   * -----------------------------------------------
   * ResolveType methods
   * -----------------------------------------------
   */

  public getResolveType(): GraphQLTypeResolver<TSource, TContext> | null | void;

  public setResolveType(fn: GraphQLTypeResolver<TSource, TContext> | null | void): this;

  public hasTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): boolean;

  public getTypeResolvers(): InterfaceTypeResolversMap<TContext>;

  public getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeResolverCheckFn<TSource, TContext>;

  public getTypeResolverNames(): string[];

  public getTypeResolverTypes(): GraphQLObjectType[];

  public setTypeResolvers(typeResolversMap: InterfaceTypeResolversMap<TContext>): this;

  public addTypeResolver<TSrc = any>(
    type: ObjectTypeComposer<TSrc, TContext> | GraphQLObjectType,
    checkFn: InterfaceTypeResolverCheckFn<TSrc, TContext>
  ): this;

  public removeTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): this;

  /**
   *  -----------------------------------------------
   * Extensions methods
   * -----------------------------------------------
   */

  public getExtensions(): Extensions;

  public setExtensions(extensions: Extensions): this;

  public extendExtensions(extensions: Extensions): this;

  public clearExtensions(): this;

  public getExtension(extensionName: string): any;

  public hasExtension(extensionName: string): boolean;

  public setExtension(extensionName: string, value: any): this;

  public removeExtension(extensionName: string): this;

  public getFieldExtensions(fieldName: string): Extensions;

  public setFieldExtensions(fieldName: string, extensions: Extensions): this;

  public extendFieldExtensions(fieldName: string, extensions: Extensions): this;

  public clearFieldExtensions(fieldName: string): this;

  public getFieldExtension(fieldName: string, extensionName: string): any;

  public hasFieldExtension(fieldName: string, extensionName: string): boolean;

  public setFieldExtension(fieldName: string, extensionName: string, value: any): this;

  public removeFieldExtension(fieldName: string, extensionName: string): this;

  public getFieldArgExtensions(fieldName: string, argName: string): Extensions;

  public setFieldArgExtensions(fieldName: string, argName: string, extensions: Extensions): this;

  public extendFieldArgExtensions(fieldName: string, argName: string, extensions: Extensions): this;

  public clearFieldArgExtensions(fieldName: string, argName: string): this;

  public getFieldArgExtension(fieldName: string, argName: string, extensionName: string): any;

  public hasFieldArgExtension(fieldName: string, argName: string, extensionName: string): boolean;

  public setFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string,
    value: any
  ): this;

  public removeFieldArgExtension(fieldName: string, argName: string, extensionName: string): this;

  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */

  public getDirectives(): ExtensionsDirective[];

  public getDirectiveNames(): string[];

  public getDirectiveByName(directiveName: string): DirectiveArgs | void;

  public getDirectiveById(idx: number): DirectiveArgs | void;

  public getFieldDirectives(fieldName: string): ExtensionsDirective[];

  public getFieldDirectiveNames(fieldName: string): string[];

  public getFieldDirectiveByName(fieldName: string, directiveName: string): DirectiveArgs | void;

  public getFieldDirectiveById(fieldName: string, idx: number): DirectiveArgs | void;

  public getFieldArgDirectives(fieldName: string, argName: string): ExtensionsDirective[];

  public getFieldArgDirectiveNames(fieldName: string, argName: string): string[];

  public getFieldArgDirectiveByName(
    fieldName: string,
    argName: string,
    directiveName: string
  ): DirectiveArgs | void;

  public getFieldArgDirectiveById(
    fieldName: string,
    argName: string,
    idx: number
  ): DirectiveArgs | void;

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  public get(path: string | string[]): any;
}
