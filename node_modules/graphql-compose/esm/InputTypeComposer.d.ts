import {
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputType,
  InputValueDefinitionNode,
} from './graphql';
import { Thunk, ObjMap, Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';
import { SchemaComposer } from './SchemaComposer';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { TypeAsString } from './TypeMapper';

export type GraphQLInputObjectTypeExtended = GraphQLInputObjectType & {
  _gqcFields?: ComposeInputFieldConfigMap;
  _gqcExtensions?: Extensions;
};

export type ComposeInputFieldConfigMap = ObjMap<ComposeInputFieldConfig>;

export type ComposeInputFieldConfig =
  | ComposeInputFieldConfigAsObject
  | ComposeInputType
  | (() => ComposeInputFieldConfigAsObject | ComposeInputType);

export type ComposeInputFieldConfigAsObject = {
  type: Thunk<ComposeInputType> | GraphQLInputType;
  defaultValue?: any;
  description?: string | null;
  astNode?: InputValueDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type ComposeInputType =
  | InputTypeComposer<any>
  | EnumTypeComposer<any>
  | ScalarTypeComposer<any>
  | GraphQLInputType
  | TypeAsString
  | Array<
      | InputTypeComposer<any>
      | EnumTypeComposer<any>
      | ScalarTypeComposer<any>
      | GraphQLInputType
      | TypeAsString
    >;

export function isComposeInputType(type: any): boolean;

export type ComposeInputObjectTypeConfig = {
  name: string;
  fields: Thunk<ComposeInputFieldConfigMap>;
  description?: string | null;
  extensions?: Extensions;
};

export type InputTypeComposeDefinition =
  | TypeAsString
  | ComposeInputObjectTypeConfig
  | GraphQLInputObjectType;

export class InputTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;

  protected gqType: GraphQLInputObjectTypeExtended;

  public constructor(gqType: GraphQLInputObjectType, schemaComposer: SchemaComposer<TContext>);

  /**
   * Create `InputTypeComposer` with adding it by name to the `SchemaComposer`.
   */
  public static create<TCtx = any>(
    typeDef: InputTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx>;

  /**
   * Create `InputTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: InputTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx>;

  /**
   * -----------------------------------------------
   * Field methods
   * -----------------------------------------------
   */

  public getFields(): ComposeInputFieldConfigMap;

  public getFieldNames(): string[];

  public hasField(fieldName: string): boolean;

  public setFields(fields: ComposeInputFieldConfigMap): this;

  public setField(fieldName: string, fieldConfig: ComposeInputFieldConfig): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newFields: ComposeInputFieldConfigMap): this;

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  public addNestedFields(newFields: ComposeInputFieldConfigMap): this;

  public getField(fieldName: string): ComposeInputFieldConfigAsObject;

  public removeField(fieldNameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public extendField(fieldName: string, partialFieldConfig: Partial<ComposeInputFieldConfig>): this;

  public reorderFields(names: string[]): this;

  public isFieldNonNull(fieldName: string): boolean;

  /**
   * An alias for `isFieldNonNull`
   */
  public isRequired(fieldName: string): boolean;

  public getFieldConfig(fieldName: string): GraphQLInputFieldConfig;

  public getFieldType(fieldName: string): GraphQLInputType;

  public getFieldTC(
    fieldName: string
  ): InputTypeComposer<TContext> | EnumTypeComposer<TContext> | ScalarTypeComposer<TContext>;

  /**
   * Alias for `getFieldTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldITC(fieldName: string): InputTypeComposer<TContext>;

  public makeFieldNonNull(fieldNameOrArray: string | string[]): this;

  /**
   * An alias for `makeFieldNonNull`
   */
  public makeRequired(fieldNameOrArray: string | string[]): this;

  public makeFieldNullable(fieldNameOrArray: string | string[]): this;

  /**
   * An alias for `makeFieldNullable`
   */
  public makeOptional(fieldNameOrArray: string | string[]): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLInputObjectType;

  public getTypePlural(): GraphQLList<GraphQLInputObjectType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLInputObjectType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): InputTypeComposer<TContext>;

  public merge(type: GraphQLInputObjectType | InputTypeComposer<any>): this;

  /**
   * -----------------------------------------------
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

  /**
   * -----------------------------------------------
   * Directive methods
   *
   * Directive methods are usefull if you declare your schemas via SDL.
   * Users who actively use `graphql-tools` can open new abilities for writing
   * your own directive handlers.
   *
   * If you create your schemas via config objects, then probably you
   * no need in `directives`. Instead directives better to use `extensions`.
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

  /**
   *  -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */
  public get(path: string | string[]): any;
}
