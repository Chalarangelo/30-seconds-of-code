/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  getNamedType,
  isInputType,
} from './graphql';
import { resolveMaybeThunk, upperFirst, inspect } from './utils/misc';
import { isObject, isFunction, isString } from './utils/is';
import { resolveInputConfigMapAsThunk, resolveInputConfigAsThunk } from './utils/configAsThunk';
import { typeByPath } from './utils/typeByPath';
import type {
  Thunk,
  ObjMap,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { SchemaComposer } from './SchemaComposer';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import type { TypeAsString } from './TypeMapper';
import type {
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLInputType,
  InputValueDefinitionNode,
} from './graphql';
import { graphqlVersion } from './utils/graphqlVersion';
import { defineInputFieldMap, defineInputFieldMapToConfig } from './utils/configToDefine';

export type GraphQLInputObjectTypeExtended = GraphQLInputObjectType & {
  _gqcFields?: ComposeInputFieldConfigMap,
  _gqcExtensions?: Extensions,
};

export type ComposeInputFieldConfigMap = ObjMap<ComposeInputFieldConfig>;

export type ComposeInputFieldConfig =
  | ComposeInputFieldConfigAsObject
  | ComposeInputType
  | (() => ComposeInputFieldConfigAsObject | ComposeInputType);

export type ComposeInputFieldConfigAsObject = {
  type: Thunk<ComposeInputType> | GraphQLInputType,
  defaultValue?: mixed,
  description?: ?string,
  astNode?: ?InputValueDefinitionNode,
  extensions?: Extensions,
  [key: string]: any,
};

export type ComposeInputType =
  | InputTypeComposer<any>
  | EnumTypeComposer<any>
  | ScalarTypeComposer<any>
  | GraphQLInputType
  | TypeAsString
  | $ReadOnlyArray<ComposeInputType>;

export function isComposeInputType(type: mixed): boolean %checks {
  return (
    isInputType(type) ||
    (Array.isArray(type) && isComposeInputType(type[0])) ||
    type instanceof InputTypeComposer ||
    type instanceof EnumTypeComposer ||
    type instanceof ScalarTypeComposer
  );
}

export type ComposeInputObjectTypeConfig = {
  name: string,
  fields: Thunk<ComposeInputFieldConfigMap>,
  description?: ?string,
  extensions?: Extensions,
};

export type InputTypeComposeDefinition =
  | TypeAsString
  | ComposeInputObjectTypeConfig
  | GraphQLInputObjectType;

export class InputTypeComposer<TContext> {
  gqType: GraphQLInputObjectTypeExtended;
  schemaComposer: SchemaComposer<TContext>;

  static create<TCtx>(
    typeDef: InputTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `InputTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const itc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(itc);
    return itc;
  }

  static createTemp<TCtx>(
    typeDef: InputTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let ITC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        ITC = new InputTypeComposer(
          new GraphQLInputObjectType({
            name: typeName,
            fields: () => ({}),
          }),
          sc
        );
      } else {
        ITC = sc.typeMapper.createType(typeName);
        if (!(ITC instanceof InputTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLInputObjectType type definition.' +
              'Eg. `input MyInputType { name: String! }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLInputObjectType) {
      ITC = new InputTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const fields = typeDef.fields;
      const type = new GraphQLInputObjectType({
        name: typeDef.name,
        description: typeDef.description,
        fields: isFunction(fields)
          ? () => resolveInputConfigMapAsThunk(sc, (fields(): any), typeDef.name)
          : () => ({}),
      });
      ITC = new InputTypeComposer(type, sc);
      if (isObject(typeDef.fields)) ITC.addFields(typeDef.fields);
      ITC.gqType._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(
        `You should provide InputObjectConfig or string with type name to InputTypeComposer.create(typeDef). Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return ITC;
  }

  constructor(
    gqType: GraphQLInputObjectType,
    schemaComposer: SchemaComposer<TContext>
  ): InputTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new InputTypeComposer(GraphQLInputType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLInputObjectType)) {
      throw new Error('InputTypeComposer accept only GraphQLInputObjectType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Field methods
  // -----------------------------------------------

  getFields(): ComposeInputFieldConfigMap {
    if (!this.gqType._gqcFields) {
      if (graphqlVersion >= 14) {
        this.gqType._gqcFields = (defineInputFieldMapToConfig(this.gqType._fields): any);
      } else {
        const fields: Thunk<GraphQLInputFieldConfigMap> = (this.gqType: any)._typeConfig.fields;
        this.gqType._gqcFields = (resolveMaybeThunk(fields) || {}: any);
      }
    }

    return this.gqType._gqcFields;
  }

  getFieldNames(): string[] {
    return Object.keys(this.getFields());
  }

  hasField(fieldName: string): boolean {
    const fields = this.getFields();
    return !!fields[fieldName];
  }

  /**
   * Completely replace all fields in GraphQL type
   * WARNING: this method rewrite an internal GraphQL instance variable.
   */
  setFields(fields: ComposeInputFieldConfigMap): InputTypeComposer<TContext> {
    this.gqType._gqcFields = fields;

    if (graphqlVersion >= 14) {
      this.gqType._fields = () => {
        return defineInputFieldMap(
          this.gqType,
          resolveInputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName())
        );
      };
    } else {
      (this.gqType: any)._typeConfig.fields = () => {
        return resolveInputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName());
      };
      delete this.gqType._fields; // if schema was builded, delete defineFieldMap
    }
    return this;
  }

  setField(fieldName: string, fieldConfig: ComposeInputFieldConfig): InputTypeComposer<TContext> {
    this.addFields({ [fieldName]: fieldConfig });
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(newFields: ComposeInputFieldConfigMap): InputTypeComposer<TContext> {
    this.setFields({ ...this.getFields(), ...newFields });
    return this;
  }

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  addNestedFields(newFields: ComposeInputFieldConfigMap): InputTypeComposer<TContext> {
    Object.keys(newFields).forEach(fieldName => {
      const fc = newFields[fieldName];
      const names = fieldName.split('.');
      const name = names.shift();

      if (names.length === 0) {
        // single field
        this.setField(name, fc);
      } else {
        // nested field
        let childTC;
        if (!this.hasField(name)) {
          childTC = InputTypeComposer.createTemp(
            `${this.getTypeName()}${upperFirst(name)}`,
            this.schemaComposer
          );
          this.setField(name, childTC);
        } else {
          childTC = this.getFieldTC(name);
        }
        if (childTC instanceof InputTypeComposer) {
          childTC.addNestedFields({ [names.join('.')]: fc });
        }
      }
    });

    return this;
  }

  getField(fieldName: string): ComposeInputFieldConfigAsObject {
    const fields = this.getFields();
    let field = fields[fieldName];

    if (!field) {
      throw new Error(
        `Cannot get field '${fieldName}' from input  type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    if (isFunction(field)) field = field();

    if (typeof field === 'string' || isComposeInputType(field) || Array.isArray(field)) {
      return { type: (field: any) };
    }

    return (field: any);
  }

  removeField(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    const fields = this.getFields();
    fieldNames.forEach(fieldName => delete fields[fieldName]);
    this.setFields(fields);
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    const fields = this.getFields();
    Object.keys(fields).forEach(fieldName => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete fields[fieldName];
      }
    });
    this.setFields(fields);
    return this;
  }

  extendField(
    fieldName: string,
    partialFieldConfig: $Shape<ComposeInputFieldConfigAsObject>
  ): InputTypeComposer<TContext> {
    let prevFieldConfig;
    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(
        `Cannot extend field '${fieldName}' from input type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    this.setField(fieldName, {
      ...prevFieldConfig,
      ...partialFieldConfig,
      extensions: {
        ...(prevFieldConfig.extensions || {}),
        ...(partialFieldConfig.extensions || {}),
      },
    });
    return this;
  }

  reorderFields(names: string[]): InputTypeComposer<TContext> {
    const orderedFields = {};
    const fields = this.getFields();
    names.forEach(name => {
      if (fields[name]) {
        orderedFields[name] = fields[name];
        delete fields[name];
      }
    });
    this.setFields({ ...orderedFields, ...fields });
    return this;
  }

  isFieldNonNull(fieldName: string): boolean {
    return this.getFieldType(fieldName) instanceof GraphQLNonNull;
  }

  // alias for isFieldNonNull
  isRequired(fieldName: string): boolean {
    return this.isFieldNonNull(fieldName);
  }

  getFieldConfig(fieldName: string): GraphQLInputFieldConfig {
    const fc = this.getField(fieldName);
    if (!fc) {
      throw new Error(`Type ${this.getTypeName()} does not have field with name '${fieldName}'`);
    }

    return resolveInputConfigAsThunk(this.schemaComposer, fc, fieldName, this.getTypeName());
  }

  getFieldType(fieldName: string): GraphQLInputType {
    return this.getFieldConfig(fieldName).type;
  }

  getFieldTC(
    fieldName: string
  ): InputTypeComposer<TContext> | EnumTypeComposer<TContext> | ScalarTypeComposer<TContext> {
    const fieldType = getNamedType(this.getFieldType(fieldName));
    const tc = this.schemaComposer.createTC(fieldType);
    if (
      tc instanceof InputTypeComposer ||
      tc instanceof EnumTypeComposer ||
      tc instanceof ScalarTypeComposer
    ) {
      return tc;
    } else {
      throw new Error(
        `Type ${this.getTypeName()} has invalid field ${fieldName} which is not of an input type.`
      );
    }
  }

  /**
   * Alias for `getFieldTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldITC(fieldName: string): InputTypeComposer<TContext> {
    const tc = this.getFieldTC(fieldName);
    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldITC('${fieldName}') must be InputTypeComposer, but recieved ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  makeFieldNonNull(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);
        if (!(fieldType instanceof GraphQLNonNull)) {
          this.extendField(fieldName, { type: new GraphQLNonNull(fieldType) });
        }
      }
    });
    return this;
  }

  // alias for makeFieldNonNull
  makeRequired(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    return this.makeFieldNonNull(fieldNameOrArray);
  }

  makeFieldNullable(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);
        if (fieldType instanceof GraphQLNonNull) {
          this.extendField(fieldName, { type: fieldType.ofType });
        }
      }
    });
    return this;
  }

  makeOptional(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    return this.makeFieldNullable(fieldNameOrArray);
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLInputObjectType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLInputObjectType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLInputObjectType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): InputTypeComposer<TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): InputTypeComposer<TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): InputTypeComposer<TContext> {
    if (!newTypeName) {
      throw new Error('You should provide new type name for clone() method');
    }

    const newFields = {};
    this.getFieldNames().forEach(fieldName => {
      const fc = this.getFieldConfig(fieldName);
      newFields[fieldName] = { ...(fc: any) };
    });

    return new InputTypeComposer(
      new GraphQLInputObjectType({
        name: newTypeName,
        fields: newFields,
      }),
      this.schemaComposer
    );
  }

  merge(type: GraphQLInputObjectType | InputTypeComposer<any>): InputTypeComposer<TContext> {
    if (type instanceof GraphQLInputObjectType) {
      this.addFields((defineInputFieldMapToConfig(type.getFields()): any));
    } else if (type instanceof InputTypeComposer) {
      this.addFields(type.getFields());
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with InputObjectType(${this.getTypeName()}). Provided type should be GraphQLInputObjectType or InputTypeComposer.`
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

  setExtensions(extensions: Extensions): InputTypeComposer<TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): InputTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): InputTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): InputTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): InputTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName: string, extensions: Extensions): InputTypeComposer<TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(fieldName: string, extensions: Extensions): InputTypeComposer<TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...extensions,
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): InputTypeComposer<TContext> {
    this.setFieldExtensions(fieldName, {});
    return this;
  }

  getFieldExtension(fieldName: string, extensionName: string): ?any {
    const extensions = this.getFieldExtensions(fieldName);
    return extensions[extensionName];
  }

  hasFieldExtension(fieldName: string, extensionName: string): boolean {
    const extensions = this.getFieldExtensions(fieldName);
    return extensionName in extensions;
  }

  setFieldExtension(
    fieldName: string,
    extensionName: string,
    value: any
  ): InputTypeComposer<TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(fieldName: string, extensionName: string): InputTypeComposer<TContext> {
    const extensions = { ...this.getFieldExtensions(fieldName) };
    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
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

  getFieldDirectives(fieldName: string): Array<ExtensionsDirective> {
    const directives = this.getFieldExtension(fieldName, 'directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  getFieldDirectiveNames(fieldName: string): string[] {
    return this.getFieldDirectives(fieldName).map(d => d.name);
  }

  getFieldDirectiveByName(fieldName: string, directiveName: string): ?DirectiveArgs {
    const directive = this.getFieldDirectives(fieldName).find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectiveById(fieldName: string, idx: number): ?DirectiveArgs {
    const directive = this.getFieldDirectives(fieldName)[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  get(path: string | string[]): any {
    return typeByPath(this, path);
  }
}
