/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLEnumType, GraphQLList, GraphQLNonNull } from './graphql';
import {
  GraphQLEnumValueConfig,
  GraphQLEnumTypeConfig,
  GraphQLEnumValueConfigMap,
  EnumValueDefinitionNode,
} from './graphql';
import { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { ObjMap, Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';

export type ComposeEnumTypeConfig = {
  name: string;
  values?: ComposeEnumValueConfigMap;
  description?: string | null;
  extensions?: Extensions;
};

export type ComposeEnumValueConfig = {
  value?: any /* T */;
  deprecationReason?: string | null;
  description?: string | null;
  astNode?: EnumValueDefinitionNode | null;
  extensions?: Extensions;
};

export type ComposeEnumValueConfigMap = ObjMap<ComposeEnumValueConfig>;

export type EnumTypeComposeDefinition = TypeAsString | ComposeEnumTypeConfig | GraphQLEnumType;

export type ComposeEnumType =
  | EnumTypeComposer<any>
  | GraphQLEnumType
  | TypeDefinitionString
  | TypeAsString;

export type GraphQLEnumTypeExtended = GraphQLEnumType & {
  _gqcExtensions?: Extensions;
};

/**
 * `EnumTypeComposer` is a class which helps to create and modify `GraphQLEnumType`.
 */
export class EnumTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected gqType: GraphQLEnumTypeExtended;

  public constructor(gqType: GraphQLEnumType, schemaComposer: SchemaComposer<TContext>);

  /**
   * Create `EnumTypeComposer` with adding it by name to the `SchemaComposer`. This type became avaliable in SDL by its name.
   */
  public static create<TCtx = any>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx>;

  /**
   * Create `EnumTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx>;

  /**
   * -----------------------------------------------
   * Value methods
   * -----------------------------------------------
   */

  /**
   * For similar naming with `ObjectTypeComposer` and `InputTypeComposer` for working with Enum values used methods with name `*field*` instead of `*value*`.
   */
  public hasField(name: string): boolean;

  public getFields(): ComposeEnumValueConfigMap;

  public getField(name: string): ComposeEnumValueConfig;

  public getFieldNames(): string[];

  /**
   * Completely replace all values in the type with a new set.
   */
  public setFields(values: ComposeEnumValueConfigMap): this;

  public setField(name: string, valueConfig: ComposeEnumValueConfig): this;

  /**
   * Add new fields or replace existed, other fields keep untouched.
   */
  public addFields(newValues: ComposeEnumValueConfigMap): this;

  /**
   * Remove one value by its name, or by array of field names.
   */
  public removeField(nameOrArray: string | string[]): this;

  /**
   * Keep only provided fields in type, other fields will be removed.
   */
  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField(name: string, partialValueConfig: Partial<ComposeEnumValueConfig>): this;

  /**
   * Mark value or map of values as deprecated
   */
  public deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLEnumType;

  public getTypePlural(): GraphQLList<GraphQLEnumType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLEnumType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): EnumTypeComposer<TContext>;

  public merge(type: GraphQLEnumType | EnumTypeComposer<any>): this;

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
}
