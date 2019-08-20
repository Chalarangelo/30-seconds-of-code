/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLScalarType, GraphQLList, GraphQLNonNull, valueFromASTUntyped } from './graphql';
import { isObject, isString } from './utils/is';
import type {
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarLiteralParser,
} from './graphql';
import type { TypeAsString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type { Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';
import { inspect } from './utils/misc';

export type ComposeScalarTypeConfig = GraphQLScalarTypeConfig<any, any> & {
  +extensions?: Extensions,
};

export type ScalarTypeComposeDefinition =
  | TypeAsString
  | $ReadOnly<ComposeScalarTypeConfig>
  | $ReadOnly<GraphQLScalarType>;

export type GraphQLScalarTypeExtended = GraphQLScalarType & {
  _gqcExtensions?: Extensions,
};

export class ScalarTypeComposer<TContext> {
  gqType: GraphQLScalarTypeExtended;
  schemaComposer: SchemaComposer<TContext>;

  static create<TCtx>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `ScalarTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const stc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(stc);
    return stc;
  }

  static createTemp<TCtx>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let STC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        STC = new ScalarTypeComposer(
          new GraphQLScalarType({
            name: typeName,
            serialize: () => {},
          }),
          sc
        );
      } else {
        STC = sc.typeMapper.createType(typeName);
        if (!(STC instanceof ScalarTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLScalarType type definition. Eg. `scalar UInt`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLScalarType) {
      STC = new ScalarTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLScalarType({
        ...(typeDef: any),
      });
      STC = new ScalarTypeComposer(type, sc);
      STC.gqType._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLScalarTypeConfig or string with scalar name or SDL. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return STC;
  }

  constructor(
    gqType: GraphQLScalarType,
    schemaComposer: SchemaComposer<TContext>
  ): ScalarTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new ScalarTypeComposer(GraphQLScalarType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLScalarType)) {
      throw new Error('ScalarTypeComposer accept only GraphQLScalarType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Serialize methods
  // -----------------------------------------------

  setSerialize(fn: GraphQLScalarSerializer<any>) {
    this.gqType.serialize = fn;
  }

  getSerialize(): GraphQLScalarSerializer<any> {
    return this.gqType.serialize;
  }

  setParseValue(fn: ?GraphQLScalarValueParser<any>) {
    this.gqType.parseValue = fn || (value => value);
  }

  getParseValue(): GraphQLScalarValueParser<any> {
    return this.gqType.parseValue;
  }

  setParseLiteral(fn: ?GraphQLScalarLiteralParser<any>) {
    this.gqType.parseLiteral = fn || valueFromASTUntyped;
  }

  getParseLiteral(): GraphQLScalarLiteralParser<any> {
    return this.gqType.parseLiteral;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLScalarType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLScalarType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLScalarType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): ScalarTypeComposer<TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): ScalarTypeComposer<TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): ScalarTypeComposer<TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for ScalarTypeComposer.clone()');
    }

    const cloned = new ScalarTypeComposer(
      new GraphQLScalarType({
        name: newTypeName,
        serialize: this.getSerialize(),
        parseValue: this.getParseValue(),
        parseLiteral: this.getParseLiteral(),
      }),
      this.schemaComposer
    );

    cloned.setDescription(this.getDescription());

    return cloned;
  }

  merge(type: GraphQLScalarType | ScalarTypeComposer<any>): ScalarTypeComposer<TContext> {
    if (type instanceof GraphQLScalarType) {
      this.setSerialize(type.serialize);
      this.setParseValue(type.parseValue);
      this.setParseLiteral(type.parseLiteral);
    } else if (type instanceof ScalarTypeComposer) {
      this.setSerialize(type.getSerialize());
      this.setParseValue(type.getParseValue());
      this.setParseLiteral(type.getParseLiteral());
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with ScalarType(${this.getTypeName()}). Provided type should be GraphQLScalarType or ScalarTypeComposer.`
      );
    }

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

  setExtensions(extensions: Extensions): ScalarTypeComposer<TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): ScalarTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): ScalarTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): ScalarTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): ScalarTypeComposer<TContext> {
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
}
