/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLScalarType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarLiteralParser,
} from './graphql';
import { TypeMapper } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { TypeAsString } from './TypeMapper';
import { Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';

export type ComposeScalarTypeConfig = GraphQLScalarTypeConfig<any, any> & {
  extensions?: Extensions;
};

export type ScalarTypeComposeDefinition =
  | TypeAsString
  | ComposeScalarTypeConfig
  | GraphQLScalarType;

export type GraphQLScalarTypeExtended = GraphQLScalarType & {
  _gqcExtensions?: Extensions;
};

/**
 * `ScalarTypeComposer` is a class which helps to create and modify `GraphQLScalarType`.
 */
export class ScalarTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;

  protected gqType: GraphQLScalarTypeExtended;

  public constructor(gqType: GraphQLScalarType, schemaComposer: SchemaComposer<TContext>);

  /**
   * Create `ScalarTypeComposer` with adding it by name to the `SchemaComposer`. This type became avaliable in SDL by its name.
   */
  public static create<TCtx = any>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx>;

  /**
   * Create `ScalarTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx>;

  /**
   *  -----------------------------------------------
   * Serialize methods
   * -----------------------------------------------
   */

  public setSerialize(fn: GraphQLScalarSerializer<any>): void;

  public getSerialize(): GraphQLScalarSerializer<any>;

  public setParseValue(fn: GraphQLScalarValueParser<any> | void): void;

  public getParseValue(): GraphQLScalarValueParser<any>;

  public setParseLiteral(fn: GraphQLScalarLiteralParser<any> | void): void;

  public getParseLiteral(): GraphQLScalarLiteralParser<any>;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLScalarType;

  public getTypePlural(): GraphQLList<GraphQLScalarType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLScalarType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): ScalarTypeComposer<TContext>;

  public merge(type: GraphQLScalarType | ScalarTypeComposer<any>): this;

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

  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */

  public getDirectives(): ExtensionsDirective[];

  public getDirectiveNames(): string[];

  public getDirectiveByName(directiveName: string): DirectiveArgs | void;

  public getDirectiveById(idx: number): DirectiveArgs | void;
}
