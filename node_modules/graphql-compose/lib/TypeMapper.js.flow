/* @flow strict */
/* eslint-disable no-use-before-define, class-methods-use-this, no-unused-vars, no-param-reassign */

import { parse, parseType } from 'graphql/language/parser';
import { Kind } from 'graphql/language';
import { getDescription } from 'graphql/utilities/buildASTSchema';
import keyValMap from 'graphql/jsutils/keyValMap';
import invariant from 'graphql/jsutils/invariant';
import { getArgumentValues, getDirectiveValues } from 'graphql/execution/values';
import type {
  DocumentNode,
  ScalarTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  UnionTypeDefinitionNode,
  SchemaDefinitionNode,
  DirectiveDefinitionNode,
  TypeNode,
  NamedTypeNode,
  DirectiveNode,
  InputValueDefinitionNode,
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  DefinitionNode,
} from 'graphql/language/ast';
import { inspect } from './utils/misc';
import find from './utils/polyfills/find';
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLDirective,
  GraphQLSkipDirective,
  GraphQLIncludeDirective,
  GraphQLDeprecatedDirective,
  GraphQLUnionType,
  isNamedType,
  isScalarType,
  valueFromAST,
} from './graphql';
import type {
  GraphQLType,
  GraphQLNamedType,
  GraphQLOutputType,
  GraphQLInputType,
  GraphQLNullableType,
  GraphQLFieldConfigMap,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLArgumentConfig,
  GraphQLInputFieldConfigMap,
  GraphQLInputFieldConfig,
} from './graphql';
import GraphQLJSON from './type/json';
import GraphQLDate from './type/date';
import GraphQLBuffer from './type/buffer';

import type { ComposeInputFieldConfigMap, ComposeInputFieldConfig } from './InputTypeComposer';
import type {
  ComposeOutputType,
  ComposeFieldConfigMap,
  ComposeFieldConfig,
  ComposeArgumentConfig,
  ComposeFieldConfigArgumentMap,
  ComposeObjectType,
  ComposeFieldConfigAsObject,
  ComposeArgumentConfigAsObject,
} from './ObjectTypeComposer';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import type { SchemaComposer, AnyComposeType, AnyType } from './SchemaComposer';
import { InputTypeComposer, type ComposeInputFieldConfigAsObject } from './InputTypeComposer';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer, type ComposeEnumValueConfig } from './EnumTypeComposer';
import { InterfaceTypeComposer, type ComposeInterfaceType } from './InterfaceTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { Resolver } from './Resolver';
import { TypeStorage } from './TypeStorage';
import type { Thunk, ExtensionsDirective } from './utils/definitions';
import { isFunction, isObject } from './utils/is';

export type TypeDefinitionString = string; // eg type Name { field: Int }
export type TypeWrappedString = string; // eg. Int, Int!, [Int]
export type TypeNameString = string; // eg. Int, Float
export type TypeAsString = TypeDefinitionString | TypeWrappedString | TypeNameString;

// solve Flow reqursion limit, do not import from graphql.js
function isOutputType(type: any): boolean {
  return (
    type instanceof GraphQLScalarType ||
    type instanceof GraphQLObjectType ||
    type instanceof GraphQLInterfaceType ||
    type instanceof GraphQLUnionType ||
    type instanceof GraphQLEnumType ||
    (type instanceof GraphQLNonNull && isOutputType(type.ofType)) ||
    (type instanceof GraphQLList && isOutputType(type.ofType))
  );
}

// solve Flow reqursion limit, do not import from graphql.js
function isInputType(type: any): boolean {
  return (
    type instanceof GraphQLScalarType ||
    type instanceof GraphQLEnumType ||
    type instanceof GraphQLInputObjectType ||
    (type instanceof GraphQLNonNull && isInputType(type.ofType)) ||
    (type instanceof GraphQLList && isInputType(type.ofType))
  );
}

export class TypeMapper<TContext> {
  schemaComposer: SchemaComposer<TContext>;

  constructor(schemaComposer: SchemaComposer<TContext>): TypeMapper<TContext> {
    if (!schemaComposer) {
      throw new Error('TypeMapper must have SchemaComposer instance.');
    }
    this.schemaComposer = schemaComposer;
    this.initScalars();

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  initScalars() {
    const scalars = [
      ['String', GraphQLString],
      ['Float', GraphQLFloat],
      ['Int', GraphQLInt],
      ['Boolean', GraphQLBoolean],
      ['ID', GraphQLID],
      ['JSON', GraphQLJSON],
      ['Json', GraphQLJSON],
      ['Date', GraphQLDate],
      ['Buffer', GraphQLBuffer],
    ];
    scalars.forEach(([name, type]) => {
      this.schemaComposer.set(name, type);
    });
  }

  get(name: string): GraphQLNamedType | void {
    const schemaType = this.schemaComposer.get(name);
    if (isNamedType(schemaType) || isScalarType(schemaType)) {
      return schemaType;
    }
    return schemaType.getType();
  }

  set(name: string, type: AnyType<any>): void {
    this.schemaComposer.set(name, type);
  }

  has(name: string): boolean {
    return this.schemaComposer.has(name);
  }

  getWrapped(str: TypeWrappedString | TypeNameString): GraphQLType | void {
    const typeAST: TypeNode = parseType(str);
    return this.typeFromAST(typeAST);
  }

  createType(str: TypeDefinitionString): AnyComposeType<TContext> | void {
    if (this.has(str)) {
      return this.schemaComposer.getAnyTC(str);
    }

    const astDocument: DocumentNode = parse(str);

    if (!astDocument || astDocument.kind !== 'Document') {
      throw new Error(
        'You should provide correct type syntax. ' +
          "Eg. createType('type IntRange { min: Int, max: Int }')"
      );
    }

    const types = this.parseTypes(astDocument);

    const type = types[0];

    if (type) {
      this.set(type.getTypeName(), type);
      // Also keep type string representation for avoiding duplicates type defs for same strings
      this.set(str, type);
      return type;
    }

    return undefined;
  }

  static isTypeNameString(str: string): boolean {
    return /^[_A-Za-z][_0-9A-Za-z]*$/.test(str);
  }

  static isTypeDefinitionString(str: string): boolean {
    return (
      this.isOutputTypeDefinitionString(str) ||
      this.isInputTypeDefinitionString(str) ||
      this.isEnumTypeDefinitionString(str) ||
      this.isScalarTypeDefinitionString(str) ||
      this.isInterfaceTypeDefinitionString(str)
    );
  }

  static isOutputTypeDefinitionString(str: string): boolean {
    return /type\s[^{]+\{[^}]+\}/im.test(str);
  }

  static isInputTypeDefinitionString(str: string): boolean {
    return /input\s[^{]+\{[^}]+\}/im.test(str);
  }

  static isEnumTypeDefinitionString(str: string): boolean {
    return /enum\s[^{]+\{[^}]+\}/im.test(str);
  }

  static isScalarTypeDefinitionString(str: string): boolean {
    return /scalar\s/im.test(str);
  }

  static isInterfaceTypeDefinitionString(str: string): boolean {
    return /interface\s/im.test(str);
  }

  createGraphQLType(str: TypeDefinitionString): GraphQLType | void {
    const type = this.createType(str);
    if (type) {
      return type.getType();
    }

    return undefined;
  }

  parseTypesFromString(str: string): TypeStorage<string, AnyComposeType<TContext>> {
    const astDocument: DocumentNode = parse(str);

    if (!astDocument || astDocument.kind !== 'Document') {
      throw new Error('You should provide correct SDL syntax.');
    }

    const types = this.parseTypes(astDocument);
    const typeStorage = new TypeStorage();
    types.forEach(type => {
      typeStorage.set(type.getTypeName(), type);
    });
    return typeStorage;
  }

  convertOutputType(composeType: ComposeObjectType): GraphQLObjectType {
    if (this.schemaComposer.hasInstance(composeType, ObjectTypeComposer)) {
      return this.schemaComposer.getOTC(composeType).getType();
    } else if (typeof composeType === 'string') {
      const type = TypeMapper.isTypeDefinitionString(composeType)
        ? this.createGraphQLType(composeType)
        : this.getWrapped(composeType);

      if (!type) {
        throw new Error(`Cannot convert to OutputType the following string: '${composeType}'`);
      }

      if (!(type instanceof GraphQLObjectType)) {
        throw new Error(`Cannot convert to OutputType the following object: '${inspect(type)}'`);
      }

      return type;
    } else if (composeType instanceof GraphQLObjectType) {
      return composeType;
    } else if (composeType instanceof ObjectTypeComposer) {
      return composeType.getType();
    }

    throw new Error(`Cannot convert to OutputType the following object: '${inspect(composeType)}'`);
  }

  convertOutputFieldConfig<TSource>(
    composeFC: ComposeFieldConfig<TSource, TContext>,
    fieldName?: string = '',
    typeName?: string = ''
  ): GraphQLFieldConfig<TSource, TContext> {
    invariant(composeFC, `You provide empty argument field config for ${typeName}.${fieldName}`);

    let composeType;
    let copyProps;
    let copyArgs;

    if (composeFC instanceof GraphQLList || composeFC instanceof GraphQLNonNull) {
      return { type: composeFC };
    } else if (isFunction(composeFC)) {
      return (composeFC: any);
    } else if (composeFC instanceof Resolver) {
      return composeFC.getFieldConfig();
    } else if (
      composeFC instanceof ObjectTypeComposer ||
      composeFC instanceof EnumTypeComposer ||
      composeFC instanceof InterfaceTypeComposer ||
      composeFC instanceof UnionTypeComposer ||
      composeFC instanceof ScalarTypeComposer
    ) {
      return {
        type: composeFC.getType(),
        description: composeFC.getDescription(),
      };
    } else if (Array.isArray(composeFC)) {
      composeType = composeFC;
    } else if (composeFC.type) {
      const { type, args, ...rest } = (composeFC: any);
      composeType = type;
      copyProps = rest;
      copyArgs = args;
    } else {
      composeType = composeFC;
    }

    let wrapWithList = 0;
    while (Array.isArray(composeType)) {
      if (composeType.length !== 1) {
        throw new Error(
          `${typeName}.${fieldName} can accept Array exact with one output type definition`
        );
      }
      wrapWithList += 1;
      composeType = composeType[0];
    }

    if (composeType instanceof InputTypeComposer) {
      throw new Error(
        `You cannot provide InputTypeComposer to the field '${typeName}.${fieldName}'. It should be OutputType.`
      );
    }

    const fieldConfig: GraphQLFieldConfig<any, TContext> = ({}: any);
    if (typeof composeType === 'string') {
      if (TypeMapper.isInputTypeDefinitionString(composeType)) {
        throw new Error(
          `${typeName}.${fieldName} should be OutputType, but got following type definition '${composeType}'`
        );
      }

      if (this.schemaComposer.has(composeType)) {
        fieldConfig.type = (this.schemaComposer.getAnyTC(composeType).getType(): any);
        if (!isOutputType(fieldConfig.type)) {
          throw new Error(
            `${typeName}.${fieldName} cannot convert to OutputType the following type: '${fieldConfig.type.toString()}'`
          );
        }
      } else {
        const type = TypeMapper.isTypeDefinitionString(composeType)
          ? this.createGraphQLType(composeType)
          : this.getWrapped(composeType);

        if (!type) {
          throw new Error(
            `${typeName}.${fieldName} cannot convert to OutputType the following string: '${composeType}'`
          );
        }
        fieldConfig.type = (type: any);
      }
    } else if (
      composeType instanceof ObjectTypeComposer ||
      composeType instanceof EnumTypeComposer ||
      composeType instanceof InterfaceTypeComposer ||
      composeType instanceof UnionTypeComposer ||
      composeType instanceof ScalarTypeComposer
    ) {
      fieldConfig.type = composeType.getType();
    } else if (composeType instanceof Resolver) {
      fieldConfig.type = composeType.getType();
    } else {
      fieldConfig.type = (composeType: any);
    }

    if (!fieldConfig.type) {
      throw new Error(`${typeName}.${fieldName} must have some 'type'`);
    }

    if (!isFunction(fieldConfig.type)) {
      if (!isOutputType(fieldConfig.type)) {
        throw new Error(
          `${typeName}.${fieldName} provided incorrect OutputType: '${inspect(composeType)}'`
        );
      }

      if (wrapWithList > 0) {
        for (let i = 0; i < wrapWithList; i++) {
          fieldConfig.type = new GraphQLList((fieldConfig.type: any));
        }
      }
    }

    if (copyArgs) {
      const args: GraphQLFieldConfigArgumentMap = this.convertArgConfigMap(
        copyArgs,
        fieldName,
        typeName
      );
      fieldConfig.args = args;
    }

    if (isObject(copyProps)) {
      // copy all other props
      for (const prop in copyProps) {
        if (copyProps.hasOwnProperty(prop)) {
          fieldConfig[prop] = copyProps[prop];
        }
      }
    }

    return fieldConfig;
  }

  convertOutputFieldConfigMap<TSource>(
    composeFields: ComposeFieldConfigMap<TSource, TContext>,
    typeName?: string = ''
  ): GraphQLFieldConfigMap<TSource, TContext> {
    const fields: GraphQLFieldConfigMap<TSource, TContext> = ({}: any);
    Object.keys(composeFields).forEach(name => {
      fields[name] = this.convertOutputFieldConfig(composeFields[name], name, typeName);
    });

    return fields;
  }

  convertArgConfig(
    composeAC: ComposeArgumentConfig,
    argName?: string = '',
    fieldName?: string = '',
    typeName?: string = ''
  ): GraphQLArgumentConfig {
    invariant(
      composeAC,
      `You provide empty argument config for ${typeName}.${fieldName}.${argName}`
    );

    let composeType;
    let copyProps;

    if (composeAC instanceof GraphQLList || composeAC instanceof GraphQLNonNull) {
      return { type: composeAC };
    } else if (
      composeAC instanceof InputTypeComposer ||
      composeAC instanceof EnumTypeComposer ||
      composeAC instanceof ScalarTypeComposer
    ) {
      return {
        type: composeAC.getType(),
        description: composeAC.getDescription(),
      };
    } else if (Array.isArray(composeAC)) {
      composeType = composeAC;
    } else if (isFunction(composeAC)) {
      return (composeAC: any);
    } else if (composeAC.type) {
      const { type, ...rest } = (composeAC: any);
      composeType = type;
      copyProps = rest;
    } else {
      composeType = composeAC;
    }

    let wrapWithList = 0;
    while (Array.isArray(composeType)) {
      if (composeType.length !== 1) {
        throw new Error(
          `${typeName}.${fieldName}@${argName} can accept Array exact with one input type definition`
        );
      }
      wrapWithList += 1;
      composeType = composeType[0];
    }

    if (composeType instanceof ObjectTypeComposer) {
      throw new Error(
        `You cannot provide ObjectTypeComposer to the arg '${typeName}.${fieldName}.@${argName}'. It should be InputType.`
      );
    }

    const argConfig: GraphQLArgumentConfig = ({}: any);
    if (typeof composeType === 'string') {
      if (TypeMapper.isOutputTypeDefinitionString(composeType)) {
        throw new Error(
          `${typeName}.${fieldName}@${argName} should be InputType, but got output type definition '${composeType}'`
        );
      }

      if (this.schemaComposer.has(composeType)) {
        argConfig.type = (this.schemaComposer.getAnyTC(composeType).getType(): any);
        if (!isInputType(argConfig.type)) {
          throw new Error(
            `${typeName}.${fieldName}@${argName} cannot convert to InputType the following type: '${argConfig.type.toString()}'`
          );
        }
      } else {
        const type = TypeMapper.isTypeDefinitionString(composeType)
          ? this.createGraphQLType(composeType)
          : this.getWrapped(composeType);

        if (!type) {
          throw new Error(
            `${typeName}.${fieldName}@${argName} cannot convert to InputType the following string: '${composeType}'`
          );
        }

        argConfig.type = (type: any);
      }
    } else if (
      composeType instanceof InputTypeComposer ||
      composeType instanceof EnumTypeComposer ||
      composeType instanceof ScalarTypeComposer
    ) {
      argConfig.type = composeType.getType();
    } else {
      argConfig.type = (composeType: any);
    }

    if (!argConfig.type) {
      throw new Error(`${typeName}.${fieldName}@${argName} must have some 'type'`);
    }

    if (!isFunction(argConfig.type)) {
      if (!isInputType(argConfig.type)) {
        throw new Error(
          `${typeName}.${fieldName}@${argName} provided incorrect InputType: '${inspect(
            composeType
          )}'`
        );
      }

      if (wrapWithList > 0) {
        for (let i = 0; i < wrapWithList; i++) {
          argConfig.type = new GraphQLList((argConfig.type: any));
        }
      }
    }

    if (isObject(copyProps)) {
      // copy all other props
      for (const prop in copyProps) {
        if (copyProps.hasOwnProperty(prop)) {
          argConfig[prop] = copyProps[prop];
        }
      }
    }

    return argConfig;
  }

  convertArgConfigMap(
    composeArgsConfigMap: ComposeFieldConfigArgumentMap<any>,
    fieldName?: string = '',
    typeName?: string = ''
  ): GraphQLFieldConfigArgumentMap {
    const argsConfigMap = {};
    if (composeArgsConfigMap) {
      Object.keys(composeArgsConfigMap).forEach(argName => {
        argsConfigMap[argName] = this.convertArgConfig(
          composeArgsConfigMap[argName],
          argName,
          fieldName,
          typeName
        );
      });
    }

    return argsConfigMap;
  }

  convertInputFieldConfig(
    composeIFC: ComposeInputFieldConfig,
    fieldName?: string = '',
    typeName?: string = ''
  ): GraphQLInputFieldConfig {
    invariant(composeIFC, `You provide empty input field config for ${typeName}.${fieldName}`);

    let composeType;
    let copyProps;

    if (composeIFC instanceof GraphQLList || composeIFC instanceof GraphQLNonNull) {
      return { type: composeIFC };
    } else if (
      composeIFC instanceof InputTypeComposer ||
      composeIFC instanceof EnumTypeComposer ||
      composeIFC instanceof ScalarTypeComposer
    ) {
      return {
        type: composeIFC.getType(),
        description: composeIFC.getDescription(),
      };
    } else if (Array.isArray(composeIFC)) {
      composeType = composeIFC;
    } else if (isFunction(composeIFC)) {
      return (composeIFC: any);
    } else if (composeIFC.type) {
      const { type, ...rest } = (composeIFC: any);
      composeType = composeIFC.type;
      copyProps = rest;
    } else {
      composeType = composeIFC;
    }

    let wrapWithList = 0;
    while (Array.isArray(composeType)) {
      if (composeType.length !== 1) {
        throw new Error(
          `${typeName}.${fieldName} can accept Array exact with one input type definition`
        );
      }
      wrapWithList += 1;
      composeType = composeType[0];
    }

    if (composeType instanceof ObjectTypeComposer) {
      throw new Error(
        `You cannot provide ObjectTypeComposer to the field '${typeName}.${fieldName}'. It should be InputType.`
      );
    }

    const fieldConfig: GraphQLInputFieldConfig = ({}: any);
    if (typeof composeType === 'string') {
      if (TypeMapper.isOutputTypeDefinitionString(composeType)) {
        throw new Error(
          `${typeName}.${fieldName} should be InputType, but got output type definition '${composeType}'`
        );
      }

      if (this.schemaComposer.has(composeType)) {
        fieldConfig.type = (this.schemaComposer.getAnyTC(composeType).getType(): any);
        if (!isInputType(fieldConfig.type)) {
          throw new Error(
            `${typeName}.${fieldName} cannot convert to InputType the following type: '${fieldConfig.type.toString()}'`
          );
        }
      } else {
        const type = TypeMapper.isTypeDefinitionString(composeType)
          ? this.createGraphQLType(composeType)
          : this.getWrapped(composeType);

        if (!type) {
          throw new Error(
            `${typeName}.${fieldName} cannot convert to InputType the following string: '${composeType}'`
          );
        }

        fieldConfig.type = (type: any);
      }
    } else if (
      composeType instanceof InputTypeComposer ||
      composeType instanceof EnumTypeComposer ||
      composeType instanceof ScalarTypeComposer
    ) {
      fieldConfig.type = composeType.getType();
    } else {
      fieldConfig.type = (composeType: any);
    }

    if (!fieldConfig.type) {
      throw new Error(`${typeName}.${fieldName} must have some 'type'`);
    }

    if (!isFunction(fieldConfig.type)) {
      if (!isInputType(fieldConfig.type)) {
        throw new Error(
          `${typeName}.${fieldName} provided incorrect InputType: '${inspect(composeType)}'`
        );
      }

      if (wrapWithList > 0) {
        for (let i = 0; i < wrapWithList; i++) {
          fieldConfig.type = new GraphQLList((fieldConfig.type: any));
        }
      }
    }

    if (isObject(copyProps)) {
      // copy all other props
      for (const prop in copyProps) {
        if (copyProps.hasOwnProperty(prop)) {
          fieldConfig[prop] = copyProps[prop];
        }
      }
    }

    return fieldConfig;
  }

  convertInputFieldConfigMap(
    composeFields: ComposeInputFieldConfigMap,
    typeName?: string = ''
  ): GraphQLInputFieldConfigMap {
    const fields: GraphQLInputFieldConfigMap = ({}: any);
    Object.keys(composeFields).forEach(name => {
      fields[name] = this.convertInputFieldConfig(composeFields[name], name, typeName);
    });

    return fields;
  }

  /**
   * -----------------------------------------------
   * Internal methods
   * -----------------------------------------------
   */

  convertInterfaceType(composeType: ComposeInterfaceType): GraphQLInterfaceType {
    if (this.schemaComposer.hasInstance(composeType, InterfaceTypeComposer)) {
      return this.schemaComposer.getIFTC(composeType).getType();
    } else if (typeof composeType === 'string') {
      const type = TypeMapper.isInterfaceTypeDefinitionString(composeType)
        ? this.createGraphQLType(composeType)
        : this.getWrapped(composeType);

      if (!type) {
        throw new Error(`Cannot convert to InterfaceType the following string: '${composeType}'`);
      }

      if (!(type instanceof GraphQLInterfaceType)) {
        throw new Error(`Cannot convert to InterfaceType the following object: '${inspect(type)}'`);
      }

      return type;
    } else if (composeType instanceof GraphQLInterfaceType) {
      return composeType;
    } else if (composeType instanceof InterfaceTypeComposer) {
      return composeType.getType();
    }

    throw new Error(
      `Cannot convert to InterfaceType the following object: '${inspect(composeType)}'`
    );
  }

  parseTypes(astDocument: DocumentNode): Array<AnyComposeType<TContext>> {
    const types = [];
    for (let i = 0; i < astDocument.definitions.length; i++) {
      const def = astDocument.definitions[i];
      const type = this.makeSchemaDef(def);
      if (type) {
        types[i] = type;
      }
    }
    return types;
  }

  typeFromAST(inputTypeAST: TypeNode): GraphQLType | void {
    let innerType;
    if (inputTypeAST.kind === Kind.LIST_TYPE) {
      innerType = this.typeFromAST(inputTypeAST.type);
      return innerType && new GraphQLList(innerType);
    }
    if (inputTypeAST.kind === Kind.NON_NULL_TYPE) {
      innerType = this.typeFromAST(inputTypeAST.type);
      return innerType && new GraphQLNonNull(((innerType: any): GraphQLNullableType));
    }
    invariant(inputTypeAST.kind === Kind.NAMED_TYPE, 'Must be a named type.');
    return this.get(inputTypeAST.name.value);
  }

  typeDefNamed(typeName: string): GraphQLNamedType {
    const type = this.get(typeName);
    if (type && isNamedType(type)) {
      return type;
    } else if (type) {
      return type.getType();
    }
    if (typeName === 'Query') {
      return this.schemaComposer.Query.getType();
    }
    if (typeName === 'Mutation') {
      return this.schemaComposer.Mutation.getType();
    }
    if (typeName === 'Subscription') {
      return this.schemaComposer.Subscription.getType();
    }
    throw new Error(`Cannot find type with name '${typeName}' in SchemaComposer.`);
  }

  makeSchemaDef(def: DefinitionNode): AnyComposeType<any> | null {
    if (!def) {
      throw new Error('def must be defined');
    }

    switch (def.kind) {
      case Kind.OBJECT_TYPE_DEFINITION:
        return this.makeTypeDef(def);
      case Kind.INTERFACE_TYPE_DEFINITION:
        return this.makeInterfaceDef(def);
      case Kind.ENUM_TYPE_DEFINITION:
        return this.makeEnumDef(def);
      case Kind.UNION_TYPE_DEFINITION:
        return this.makeUnionDef(def);
      case Kind.SCALAR_TYPE_DEFINITION:
        return this.makeScalarDef(def);
      case Kind.SCHEMA_DEFINITION:
        this.checkSchemaDef(def);
        return null;
      case Kind.DIRECTIVE_DEFINITION: {
        const directive = this.makeDirectiveDef(def);
        if (directive) this.schemaComposer.addDirective(directive);
        return null;
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION:
        return this.makeInputObjectDef(def);
      default:
        throw new Error(`Type kind "${def.kind}" not supported.`);
    }
  }

  makeArguments(
    values: ?$ReadOnlyArray<InputValueDefinitionNode>
  ): ComposeFieldConfigArgumentMap<any> {
    if (!values) {
      return {};
    }
    const result = {};
    values.forEach(value => {
      const key = value.name.value;
      let val;
      const typeName = this.getNamedTypeAST(value.type).name.value;
      const type = this.produceType(value.type);

      const ac: ComposeArgumentConfigAsObject = {
        type,
        description: getDescription(value),
      };

      if (value.directives) {
        const directives = this.parseDirectives(value.directives);
        if (directives) {
          ac.extensions = { directives };

          const data = directives.find(d => d.name === 'default');
          if (data) {
            ac.defaultValue = data.args.value;
          }
        }
      }

      if (value.defaultValue) {
        const typeDef = this.typeDefNamed(typeName);
        const wrappedType = this.buildWrappedTypeDef(typeDef, value.type);
        if (isInputType(wrappedType)) {
          ac.defaultValue = valueFromAST(
            value.defaultValue,
            ((wrappedType: any): GraphQLInputType)
          );
        } else {
          throw new Error('Non-input type as an argument.');
        }
      }

      result[key] = ac;
    });
    return result;
  }

  makeFieldDefMap(
    def: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode
  ): ComposeFieldConfigMap<any, any> {
    if (!def.fields) return {};
    return keyValMap(
      def.fields,
      field => field.name.value,
      field => {
        const fc: ComposeFieldConfigAsObject<any, any, any> = {
          type: this.produceType(field.type),
          description: getDescription(field),
          args: this.makeArguments(field.arguments),
          deprecationReason: this.getDeprecationReason(field.directives),
          astNode: field,
        };

        if (field.directives) {
          const directives = this.parseDirectives(field.directives);
          if (directives) {
            fc.extensions = { directives };
          }
        }

        return fc;
      }
    );
  }

  makeInputFieldDef(def: InputObjectTypeDefinitionNode): ComposeInputFieldConfigMap {
    if (!def.fields) return {};
    return keyValMap(
      def.fields,
      field => field.name.value,
      field => {
        const fc: ComposeInputFieldConfigAsObject = {
          type: this.produceType(field.type),
          description: getDescription(field),
          deprecationReason: this.getDeprecationReason(field.directives),
          astNode: field,
        };

        if (field.directives) {
          const directives = this.parseDirectives(field.directives);
          if (directives) {
            fc.extensions = { directives };

            const data = directives.find(d => d.name === 'default');
            if (data) {
              fc.defaultValue = data.args.value;
            }
          }
        }

        return fc;
      }
    );
  }

  makeEnumDef(def: EnumTypeDefinitionNode) {
    const tc = this.schemaComposer.createEnumTC({
      name: def.name.value,
      description: getDescription(def),
      values: !def.values
        ? {}
        : keyValMap(
            def.values,
            enumValue => enumValue.name.value,
            enumValue => {
              const ec: ComposeEnumValueConfig = {
                description: getDescription(enumValue),
                deprecationReason: this.getDeprecationReason(enumValue.directives),
              };

              if (enumValue.directives) {
                const directives = this.parseDirectives(enumValue.directives);
                if (directives) {
                  ec.extensions = { directives };
                }
              }

              return ec;
            }
          ),
      astNode: def,
    });

    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  makeInputObjectDef(def: InputObjectTypeDefinitionNode) {
    const tc = this.schemaComposer.createInputTC({
      name: def.name.value,
      description: getDescription(def),
      fields: this.makeInputFieldDef(def),
      astNode: def,
    });

    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  makeDirectiveDef(def: DirectiveDefinitionNode): GraphQLDirective {
    const locations = def.locations.map(({ value }) => (value: any));
    const args = {};
    (def.arguments || []).forEach(value => {
      const key = value.name.value;
      let val;
      const typeName = this.getNamedTypeAST(value.type).name.value;
      const typeDef = this.typeDefNamed(typeName);
      const wrappedType = this.buildWrappedTypeDef(typeDef, value.type);
      if (isInputType(wrappedType)) {
        val = { type: wrappedType, description: getDescription(value) };
      } else {
        throw new Error('Non-input type as an argument.');
      }
      args[key] = val;
    });

    return new GraphQLDirective({
      name: def.name.value,
      description: getDescription(def),
      locations,
      args,
      astNode: def,
    });
  }

  makeScalarDef(def: ScalarTypeDefinitionNode) {
    const tc = this.schemaComposer.createScalarTC({
      name: def.name.value,
      description: getDescription(def),
      serialize: v => v,
      astNode: def,
    });
    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  makeImplementedInterfaces(def: ObjectTypeDefinitionNode) {
    return (def.interfaces || []).map(iface => {
      const name = this.getNamedTypeAST(iface).name.value;
      return this.schemaComposer.getIFTC(name).getType();
    });
  }

  makeTypeDef(def: ObjectTypeDefinitionNode) {
    const tc = this.schemaComposer.createObjectTC({
      name: def.name.value,
      description: getDescription(def),
      fields: this.makeFieldDefMap(def),
      interfaces: () => this.makeImplementedInterfaces(def),
      astNode: def,
    });
    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  makeInterfaceDef(def: InterfaceTypeDefinitionNode) {
    const tc = this.schemaComposer.createInterfaceTC({
      name: def.name.value,
      description: getDescription(def),
      fields: this.makeFieldDefMap(def),
      astNode: def,
    });
    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  makeUnionDef(def: UnionTypeDefinitionNode) {
    const types: ?$ReadOnlyArray<NamedTypeNode> = def.types;
    const tc = this.schemaComposer.createUnionTC({
      name: def.name.value,
      description: getDescription(def),
      types: (types || []).map(ref => this.getNamedTypeAST(ref).name.value),
      astNode: def,
    });
    if (def.directives) {
      tc.setExtension('directives', this.parseDirectives(def.directives));
    }
    return tc;
  }

  checkSchemaDef(def: SchemaDefinitionNode) {
    const validNames = {
      query: 'Query',
      mutation: 'Mutation',
      subscription: 'Subscription',
    };

    def.operationTypes.forEach(d => {
      if (d.operation) {
        const validTypeName = validNames[d.operation];
        const actualTypeName = d.type.name.value;
        if (actualTypeName !== validTypeName) {
          throw new Error(
            `Incorrect type name '${actualTypeName}' for '${
              d.operation
            }'. The valid definition is "schema { ${d.operation}: ${validTypeName} }"`
          );
        }
      }
    });
  }

  getNamedTypeAST(typeAST: TypeNode): NamedTypeNode {
    let namedType = typeAST;
    while (namedType.kind === Kind.LIST_TYPE || namedType.kind === Kind.NON_NULL_TYPE) {
      namedType = namedType.type;
    }
    return namedType;
  }

  buildWrappedType(innerType: string | GraphQLType, inputTypeAST: TypeNode): string {
    if (inputTypeAST.kind === Kind.LIST_TYPE) {
      const wrappedType = this.buildWrappedType(innerType, inputTypeAST.type);
      return `[${wrappedType}]`;
    }
    if (inputTypeAST.kind === Kind.NON_NULL_TYPE) {
      const wrappedType = this.buildWrappedType(innerType, inputTypeAST.type);
      return `${wrappedType}!`;
    }
    return innerType.toString();
  }

  buildWrappedTypeDef(innerType: GraphQLType, inputTypeAST: TypeNode): GraphQLType {
    if (inputTypeAST.kind === Kind.LIST_TYPE) {
      return new GraphQLList(this.buildWrappedTypeDef(innerType, inputTypeAST.type));
    }
    if (inputTypeAST.kind === Kind.NON_NULL_TYPE) {
      const wrappedType = this.buildWrappedTypeDef(innerType, inputTypeAST.type);
      invariant(!(wrappedType instanceof GraphQLNonNull), 'No nesting nonnull.');
      return new GraphQLNonNull(wrappedType);
    }
    return innerType;
  }

  produceType(typeAST: TypeNode): string {
    const typeName = this.getNamedTypeAST(typeAST).name.value;
    return this.buildWrappedType(typeName, typeAST);
  }

  getDeprecationReason(directives: ?$ReadOnlyArray<DirectiveNode>): ?string {
    const deprecatedAST =
      directives &&
      find(directives, directive => directive.name.value === GraphQLDeprecatedDirective.name);
    if (!deprecatedAST) {
      return;
    }
    const { reason } = getArgumentValues(GraphQLDeprecatedDirective, deprecatedAST);
    return (reason: any); // eslint-disable-line
  }

  parseDirectives(directives: $ReadOnlyArray<DirectiveNode>): Array<ExtensionsDirective> {
    const result = [];
    directives.forEach(directive => {
      const name = directive.name.value;
      const directiveDef = this.schemaComposer._getDirective(name);
      const args = directiveDef
        ? getArgumentValues(directiveDef, directive)
        : (keyValMap(
            directive.arguments || [],
            arg => arg.name.value,
            arg => GraphQLJSON.parseLiteral(arg.value)
          ): any);
      result.push({ name, args });
    });
    return result;
  }
}
