/* @flow strict */
/* eslint-disable no-use-before-define */

import keyMap from 'graphql/jsutils/keyMap';
import { GraphQLEnumType, GraphQLList, GraphQLNonNull } from './graphql';
import { isObject, isString } from './utils/is';
import { inspect } from './utils/misc';
import type { EnumValueDefinitionNode } from './graphql';
import { defineEnumValues, defineEnumValuesToConfig } from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';
import type { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type { ObjMap, Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';

export type ComposeEnumTypeConfig = {
  name: string,
  values?: ComposeEnumValueConfigMap,
  description?: ?string,
  extensions?: Extensions,
};

export type ComposeEnumValueConfig = {
  value?: any /* T */,
  deprecationReason?: ?string,
  description?: ?string,
  astNode?: ?EnumValueDefinitionNode,
  extensions?: Extensions,
};

export type ComposeEnumValueConfigMap = ObjMap<ComposeEnumValueConfig>;

export type EnumTypeComposeDefinition =
  | TypeAsString
  | $ReadOnly<ComposeEnumTypeConfig>
  | $ReadOnly<GraphQLEnumType>;

export type ComposeEnumType =
  | EnumTypeComposer<any>
  | TypeDefinitionString
  | GraphQLEnumType
  | TypeAsString;

export type GraphQLEnumTypeExtended = GraphQLEnumType & {
  _gqcExtensions?: Extensions,
  _gqcFields?: ComposeEnumValueConfigMap,
};

export class EnumTypeComposer<TContext> {
  gqType: GraphQLEnumTypeExtended;
  schemaComposer: SchemaComposer<TContext>;

  static create<TCtx>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `EnumTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const etc = this.createTemp(typeDef, schemaComposer);
    if (schemaComposer) schemaComposer.add(etc);
    return etc;
  }

  static createTemp<TCtx>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let ETC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        ETC = new EnumTypeComposer(
          new GraphQLEnumType({
            name: typeName,
            values: graphqlVersion < 13 ? { _OldGraphqlStubValue_: {} } : {},
          }),
          sc
        );
      } else {
        ETC = sc.typeMapper.createType(typeName);
        if (!(ETC instanceof EnumTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLEnumType type definition.' +
              'Eg. `enum MyType { KEY1 KEY2 KEY3 }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLEnumType) {
      ETC = new EnumTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLEnumType({
        ...(typeDef: any),
      });
      ETC = new EnumTypeComposer(type, sc);
      ETC.setFields((typeDef: any).values || {});
      ETC.gqType._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLEnumTypeConfig or string with enum name or SDL. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return ETC;
  }

  constructor(
    gqType: GraphQLEnumType,
    schemaComposer: SchemaComposer<TContext>
  ): EnumTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new EnumTypeComposer(GraphQLEnumType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLEnumType)) {
      throw new Error('EnumTypeComposer accept only GraphQLEnumType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Value methods
  // -----------------------------------------------

  hasField(name: string): boolean {
    const values = this.getFields();
    return !!values[name];
  }

  _fixEnumBelowV13() {
    if (graphqlVersion < 13) {
      if (!this.gqType._values) {
        // $FlowFixMe Support for graphql@0.11 and below
        this.gqType._values = defineEnumValues(this.gqType, this.gqType._enumConfig.values);
      }
      this.gqType._values = this.gqType._values.filter(o => o.name !== '_OldGraphqlStubValue_');
    }
  }

  getFields(): ComposeEnumValueConfigMap {
    if (!this.gqType._gqcFields) {
      if (graphqlVersion >= 14) {
        this.gqType._gqcFields = (defineEnumValuesToConfig(this.gqType._values): any);
      } else {
        this._fixEnumBelowV13();
        this.gqType._gqcFields = (this.gqType: any)._getNameLookup();
      }
    }

    return this.gqType._gqcFields;
  }

  getField(name: string): ComposeEnumValueConfig {
    const values = this.getFields();

    if (!values[name]) {
      throw new Error(
        `Cannot get value '${name}' from enum type '${this.getTypeName()}'. Value with such name does not exist.`
      );
    }

    return values[name];
  }

  getFieldNames(): string[] {
    return Object.keys(this.getFields());
  }

  /**
   * Completely replace all values in GraphQL enum type
   * WARNING: this method rewrite an internal GraphQL instance properties.
   */
  setFields(values: ComposeEnumValueConfigMap): EnumTypeComposer<TContext> {
    const preparedValues = {};
    Object.keys(values).forEach(valueName => {
      const value = values[valueName];
      preparedValues[valueName] = {
        value: value.hasOwnProperty('value') ? value.value : valueName,
        description: value.description,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions || {},
        astNode: value.astNode,
      };
    });
    this.gqType._gqcFields = preparedValues;

    if (graphqlVersion >= 14) {
      this.gqType._values = defineEnumValues(this.gqType, (values: any));
      this.gqType._valueLookup = new Map(
        this.gqType._values.map(enumValue => [enumValue.value, enumValue])
      );
      this.gqType._nameLookup = keyMap(this.gqType._values, value => value.name);
    } else {
      // cleanup isDepricated
      Object.keys(values).forEach(key => {
        // $FlowFixMe
        delete values[key].isDeprecated; // eslint-disable-line
      });

      // $FlowFixMe
      this.gqType._enumConfig.values = values;

      // clear builded fields in type
      delete this.gqType._values;
      delete this.gqType._valueLookup;
      delete this.gqType._nameLookup;

      this._fixEnumBelowV13();
    }

    return this;
  }

  setField(name: string, valueConfig: $Shape<ComposeEnumValueConfig>): EnumTypeComposer<TContext> {
    this.addFields({ [name]: { value: name, ...valueConfig } });
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(newValues: ComposeEnumValueConfigMap): EnumTypeComposer<TContext> {
    this.setFields({ ...this.getFields(), ...newValues });
    return this;
  }

  removeField(nameOrArray: string | string[]): EnumTypeComposer<TContext> {
    const valueNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    const values = this.getFields();
    valueNames.forEach(valueName => delete values[valueName]);
    this.setFields({ ...values });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): EnumTypeComposer<TContext> {
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

  reorderFields(names: string[]): EnumTypeComposer<TContext> {
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

  extendField(
    name: string,
    partialValueConfig: $Shape<ComposeEnumValueConfig>
  ): EnumTypeComposer<TContext> {
    let prevValueConfig;
    try {
      prevValueConfig = this.getField(name);
    } catch (e) {
      throw new Error(
        `Cannot extend value '${name}' from enum '${this.getTypeName()}'. Value does not exist.`
      );
    }

    const valueConfig: ComposeEnumValueConfig = {
      ...(prevValueConfig: any),
      ...(partialValueConfig: any),
    };
    this.setField(name, valueConfig);
    return this;
  }

  deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate unexisted value '${fields}' from enum '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
    }

    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLEnumType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLEnumType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLEnumType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): EnumTypeComposer<TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): EnumTypeComposer<TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): EnumTypeComposer<TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for EnumTypeComposer.clone()');
    }

    const values = this.getFields();
    const newValues = {};
    Object.keys(values).forEach(fieldName => {
      newValues[fieldName] = { ...values[fieldName] };
      delete newValues[fieldName].isDeprecated;
    });

    const cloned = new EnumTypeComposer(
      new GraphQLEnumType({
        name: newTypeName,
        values: newValues,
      }),
      this.schemaComposer
    );

    cloned.setDescription(this.getDescription());

    return cloned;
  }

  merge(type: GraphQLEnumType | EnumTypeComposer<any>): EnumTypeComposer<TContext> {
    if (type instanceof GraphQLEnumType) {
      const fields = defineEnumValuesToConfig(type._values);
      this.addFields((fields: any));
    } else if (type instanceof EnumTypeComposer) {
      this.addFields(type.getFields());
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with EnumType(${this.getTypeName()}). Provided type should be GraphQLEnumType or EnumTypeComposer.`
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

  setExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): EnumTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): EnumTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): EnumTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName: string, extensions: Extensions): EnumTypeComposer<TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(fieldName: string, extensions: Extensions): EnumTypeComposer<TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...extensions,
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): EnumTypeComposer<TContext> {
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
  ): EnumTypeComposer<TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(fieldName: string, extensionName: string): EnumTypeComposer<TContext> {
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
}
