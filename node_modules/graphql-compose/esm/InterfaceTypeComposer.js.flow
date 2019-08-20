/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  getNamedType,
} from './graphql';
import { isObject, isString, isFunction } from './utils/is';
import { resolveMaybeThunk, inspect } from './utils/misc';
import { ObjectTypeComposer, isComposeOutputType } from './ObjectTypeComposer';
import type {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLOutputType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from './graphql';
import { InputTypeComposer } from './InputTypeComposer';
import type { EnumTypeComposer } from './EnumTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import type { ScalarTypeComposer } from './ScalarTypeComposer';
import type { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type {
  ComposeFieldConfigMap,
  ComposeFieldConfig,
  ComposeFieldConfigAsObject,
  ComposeArgumentConfig,
  ComposeArgumentConfigAsObject,
  ComposeFieldConfigArgumentMap,
  ArgsMap,
} from './ObjectTypeComposer';
import type {
  Thunk,
  Extensions,
  MaybePromise,
  DirectiveArgs,
  ExtensionsDirective,
} from './utils/definitions';
import {
  resolveOutputConfigMapAsThunk,
  resolveOutputConfigAsThunk,
  resolveArgConfigAsThunk,
} from './utils/configAsThunk';
import { toInputObjectType } from './utils/toInputObjectType';
import { typeByPath } from './utils/typeByPath';
import { getGraphQLType } from './utils/typeHelpers';
import { defineFieldMap, defineFieldMapToConfig } from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';

export type GraphQLInterfaceTypeExtended<TSource, TContext> = GraphQLInterfaceType & {
  _gqcFields?: ComposeFieldConfigMap<TSource, TContext>,
  _gqcInputTypeComposer?: InputTypeComposer<TContext>,
  _gqcTypeResolvers?: InterfaceTypeResolversMap<TContext>,
  _gqcExtensions?: Extensions,
};

export type InterfaceTypeResolversMap<TContext> = Map<
  ObjectTypeComposer<any, TContext> | GraphQLObjectType,
  InterfaceTypeResolverCheckFn<any, TContext>
>;

export type InterfaceTypeResolverCheckFn<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => MaybePromise<?boolean>;

export type ComposeInterfaceTypeConfig<TSource, TContext> = {
  +name: string,
  +fields?: Thunk<ComposeFieldConfigMap<TSource, TContext>>,
  +resolveType?: ?GraphQLTypeResolver<TSource, TContext>,
  +description?: ?string,
  +extensions?: Extensions,
};

export type InterfaceTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeInterfaceTypeConfig<TSource, TContext>;

export type ComposeInterfaceType =
  | InterfaceTypeComposer<any, any>
  | GraphQLInterfaceType
  | TypeDefinitionString
  | TypeAsString;

export class InterfaceTypeComposer<TSource, TContext> {
  gqType: GraphQLInterfaceTypeExtended<TSource, TContext>;
  schemaComposer: SchemaComposer<TContext>;

  // Also supported `GraphQLInterfaceType` but in such case Flowtype force developers
  // to explicitly write annotations in their code. But it's bad.
  static create<TSrc, TCtx>(
    typeDef: InterfaceTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `InterfaceTypeComposer.create(typeDef, schemaComposer)`'
      );
    }

    const iftc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(iftc);
    return iftc;
  }

  static createTemp<TSrc, TCtx>(
    typeDef: InterfaceTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let IFTC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        IFTC = new InterfaceTypeComposer(
          new GraphQLInterfaceType({
            name: typeName,
            fields: () => ({}),
          }),
          sc
        );
      } else {
        IFTC = sc.typeMapper.createType(typeName);
        if (!(IFTC instanceof InterfaceTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLInterfaceType type definition.' +
              'Eg. `interface MyType { id: ID!, name: String! }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLInterfaceType) {
      IFTC = new InterfaceTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const fields = typeDef.fields;
      const type = new GraphQLInterfaceType({
        ...(typeDef: any),
        fields: isFunction(fields)
          ? () => resolveOutputConfigMapAsThunk(sc, (fields(): any), typeDef.name)
          : () => ({}),
      });
      IFTC = new InterfaceTypeComposer(type, sc);
      if (isObject(typeDef.fields)) IFTC.addFields(typeDef.fields);
      IFTC.gqType._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLInterfaceTypeConfig or string with interface name or SDL definition. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return IFTC;
  }

  constructor(
    gqType: GraphQLInterfaceType,
    schemaComposer: SchemaComposer<TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new InterfaceTypeComposer(GraphQLInterfaceType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLInterfaceType)) {
      throw new Error('InterfaceTypeComposer accept only GraphQLInterfaceType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Field methods
  // -----------------------------------------------

  hasField(name: string): boolean {
    const fields = this.getFields();
    return !!fields[name];
  }

  getFields(): ComposeFieldConfigMap<TSource, TContext> {
    if (!this.gqType._gqcFields) {
      if (graphqlVersion >= 14) {
        this.gqType._gqcFields = (defineFieldMapToConfig(this.gqType._fields): any);
      } else {
        const fields: Thunk<GraphQLFieldConfigMap<any, TContext>> = (this.gqType: any)._typeConfig
          .fields;
        this.gqType._gqcFields = (resolveMaybeThunk(fields) || {}: any);
      }
    }

    return this.gqType._gqcFields;
  }

  getField(fieldName: string): ComposeFieldConfigAsObject<TSource, TContext> {
    const fields = this.getFields();
    let field = fields[fieldName];

    if (!field) {
      throw new Error(
        `Cannot get field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    if (isFunction(field)) field = field();

    if (typeof field === 'string' || isComposeOutputType(field) || Array.isArray(field)) {
      return { type: (field: any) };
    }

    return (field: any);
  }

  getFieldNames(): string[] {
    return Object.keys(this.getFields());
  }

  setFields(
    fields: ComposeFieldConfigMap<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this.gqType._gqcFields = fields;

    if (graphqlVersion >= 14) {
      this.gqType._fields = () => {
        return defineFieldMap(
          this.gqType,
          resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName())
        );
      };
    } else {
      (this.gqType: any)._typeConfig.fields = () => {
        return resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName());
      };
      delete this.gqType._fields; // clear builded fields in type
    }
    return this;
  }

  setField(
    name: string,
    fieldConfig: ComposeFieldConfig<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this.addFields({ [name]: fieldConfig });
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(
    newValues: ComposeFieldConfigMap<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this.setFields({ ...this.getFields(), ...newValues });
    return this;
  }

  removeField(nameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    const values = this.getFields();
    fieldNames.forEach(valueName => delete values[valueName]);
    this.setFields({ ...values });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
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

  reorderFields(names: string[]): InterfaceTypeComposer<TSource, TContext> {
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
    fieldName: string,
    partialFieldConfig: $Shape<ComposeFieldConfigAsObject<TSource, TContext, any>>
  ): InterfaceTypeComposer<TSource, TContext> {
    let prevFieldConfig;
    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(
        `Cannot extend field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
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

  isFieldNonNull(fieldName: string): boolean {
    return this.getFieldType(fieldName) instanceof GraphQLNonNull;
  }

  getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext> {
    const fc = this.getField(fieldName);
    if (!fc) {
      throw new Error(`Type ${this.getTypeName()} does not have field with name '${fieldName}'`);
    }

    return resolveOutputConfigAsThunk(this.schemaComposer, fc, fieldName, this.getTypeName());
  }

  getFieldType(fieldName: string): GraphQLOutputType {
    return this.getFieldConfig(fieldName).type;
  }

  getFieldTC(
    fieldName: string
  ):
    | ObjectTypeComposer<TSource, TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<TSource, TContext>
    | UnionTypeComposer<TSource, TContext>
    | ScalarTypeComposer<TContext> {
    const fieldType = getNamedType(this.getFieldType(fieldName));
    const tc = this.schemaComposer.createTC(fieldType);
    if (tc instanceof InputTypeComposer) {
      throw new Error(
        `${this.getTypeName()}.getFieldTC('${fieldName}') returns InputTypeComposer. It's very strange cause fields may have only Output types (Scalar, Object, Enum, Union, Interface).`
      );
    }
    return tc;
  }

  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldOTC(fieldName: string): ObjectTypeComposer<TSource, TContext> {
    const tc = this.getFieldTC(fieldName);
    if (!(tc instanceof ObjectTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldOTC('${fieldName}') must be ObjectTypeComposer, but recieved ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  makeFieldNonNull(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
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

  makeFieldNullable(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
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

  deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate unexisted field '${fields}' from interface type '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted field '${field}' from interface type '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted field '${field}' from interface type '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
    }

    return this;
  }

  getFieldArgs(fieldName: string): ComposeFieldConfigArgumentMap<ArgsMap> {
    try {
      const fc = this.getField(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(
        `Cannot get field args. Field '${fieldName}' from type '${this.getTypeName()}' does not exist.`
      );
    }
  }

  hasFieldArg(fieldName: string, argName: string): boolean {
    try {
      const fieldArgs = this.getFieldArgs(fieldName);
      return !!fieldArgs[argName];
    } catch (e) {
      return false;
    }
  }

  getFieldArg(fieldName: string, argName: string): ComposeArgumentConfigAsObject {
    const fieldArgs = this.getFieldArgs(fieldName);
    let arg = fieldArgs[argName];

    if (!arg) {
      throw new Error(
        `Cannot get arg '${argName}' from type.field '${this.getTypeName()}.${fieldName}'. Argument does not exist.`
      );
    }

    if (isFunction(arg)) arg = arg();

    if (typeof arg === 'string' || isComposeOutputType(arg) || Array.isArray(arg)) {
      return { type: (arg: any) };
    }

    return (arg: any);
  }

  getFieldArgType(fieldName: string, argName: string): GraphQLInputType {
    const ac = this.getFieldArg(fieldName, argName);
    const graphqlAC = resolveArgConfigAsThunk(
      this.schemaComposer,
      ac,
      argName,
      fieldName,
      this.getTypeName()
    );
    return graphqlAC.type;
  }

  getFieldArgTC(
    fieldName: string,
    argName: string
  ): InputTypeComposer<TContext> | EnumTypeComposer<TContext> | ScalarTypeComposer<TContext> {
    const fieldType = getNamedType(this.getFieldArgType(fieldName, argName));
    const tc = this.schemaComposer.createTC(fieldType);
    if (
      tc instanceof ObjectTypeComposer ||
      tc instanceof InterfaceTypeComposer ||
      tc instanceof UnionTypeComposer
    ) {
      throw new Error(
        `${this.getTypeName()}.getFieldArgTC('${fieldName}', '${argName}') returns ${
          tc.constructor.name
        }. It's very strange cause args may have only Input types (Scalar, InputObject, Enum).`
      );
    }
    return tc;
  }

  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldArgITC(fieldName: string, argName: string): InputTypeComposer<TContext> {
    const tc = this.getFieldArgTC(fieldName, argName);
    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldArgITC('${fieldName}', '${argName}') must be InputTypeComposer, but recieved ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldArgTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  setFieldArgs(
    fieldName: string,
    args: ComposeFieldConfigArgumentMap<any>
  ): InterfaceTypeComposer<TSource, TContext> {
    const field = { ...this.getField(fieldName) };
    field.args = args;
    this.setField(fieldName, field);
    return this;
  }

  addFieldArgs(
    fieldName: string,
    newArgs: ComposeFieldConfigMap<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this.setFieldArgs(fieldName, { ...this.getFieldArgs(fieldName), ...newArgs });
    return this;
  }

  setFieldArg(
    fieldName: string,
    argName: string,
    argConfig: ComposeArgumentConfig
  ): InterfaceTypeComposer<TSource, TContext> {
    this.addFieldArgs(fieldName, { [argName]: argConfig });
    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLInterfaceType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLInterfaceType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLInterfaceType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): InterfaceTypeComposer<TSource, TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): InterfaceTypeComposer<TSource, TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): InterfaceTypeComposer<TSource, TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for InterfaceTypeComposer.clone()');
    }

    const newFields = {};
    this.getFieldNames().forEach(fieldName => {
      const fc = this.getFieldConfig(fieldName);
      newFields[fieldName] = { ...(fc: any) };
    });

    const cloned = new InterfaceTypeComposer(
      new GraphQLInterfaceType({
        name: newTypeName,
        fields: newFields,
      }),
      this.schemaComposer
    );

    cloned.setDescription(this.getDescription());

    return cloned;
  }

  merge(
    type:
      | GraphQLInterfaceType
      | GraphQLObjectType
      | InterfaceTypeComposer<any, any>
      | ObjectTypeComposer<any, any>
  ): InterfaceTypeComposer<TSource, TContext> {
    if (type instanceof GraphQLInterfaceType || type instanceof GraphQLObjectType) {
      this.addFields((defineFieldMapToConfig(type.getFields()): any));
    } else if (type instanceof InterfaceTypeComposer || type instanceof ObjectTypeComposer) {
      this.addFields(type.getFields());
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with InterfaceType(${this.getTypeName()}). Provided type should be GraphQLInterfaceType, GraphQLObjectType, InterfaceTypeComposer or ObjectTypeComposer.`
      );
    }

    return this;
  }

  // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------

  getInputType(): GraphQLInputObjectType {
    return this.getInputTypeComposer().getType();
  }

  hasInputTypeComposer(): boolean {
    return !!this.gqType._gqcInputTypeComposer;
  }

  setInputTypeComposer(itc: InputTypeComposer<TContext>): InterfaceTypeComposer<TSource, TContext> {
    this.gqType._gqcInputTypeComposer = itc;
    return this;
  }

  getInputTypeComposer(): InputTypeComposer<TContext> {
    if (!this.gqType._gqcInputTypeComposer) {
      this.gqType._gqcInputTypeComposer = toInputObjectType(this);
    }

    return this.gqType._gqcInputTypeComposer;
  }

  getITC(): InputTypeComposer<TContext> {
    return this.getInputTypeComposer();
  }

  removeInputTypeComposer(): InterfaceTypeComposer<TSource, TContext> {
    this.gqType._gqcInputTypeComposer = undefined;
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
  ): InterfaceTypeComposer<TSource, TContext> {
    this.gqType.resolveType = fn;
    return this;
  }

  hasTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): boolean {
    const typeResolversMap = this.getTypeResolvers();
    return typeResolversMap.has(type);
  }

  getTypeResolvers(): InterfaceTypeResolversMap<TContext> {
    if (!this.gqType._gqcTypeResolvers) {
      this.gqType._gqcTypeResolvers = new Map();
    }
    return this.gqType._gqcTypeResolvers;
  }

  getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeResolverCheckFn<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();

    if (!typeResolversMap.has(type)) {
      throw new Error(
        `Type resolve function in interface '${this.getTypeName()}' is not defined for type ${inspect(
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
      } else if (composeType && composeType.name) {
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
    typeResolversMap: InterfaceTypeResolversMap<TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._isTypeResolversValid(typeResolversMap);

    this.gqType._gqcTypeResolvers = typeResolversMap;

    // extract GraphQLObjectType from ObjectTypeComposer
    const fastEntries = [];
    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      fastEntries.push([((getGraphQLType(composeType): any): GraphQLObjectType), checkFn]);
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

  _isTypeResolversValid(typeResolversMap: InterfaceTypeResolversMap<TContext>): true {
    if (!(typeResolversMap instanceof Map)) {
      throw new Error(
        `For interface ${this.getTypeName()} you should provide Map object for type resolvers.`
      );
    }

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      // checking composeType
      try {
        const type = getGraphQLType(composeType);
        if (!(type instanceof GraphQLObjectType)) throw new Error('Must be GraphQLObjectType');
      } catch (e) {
        throw new Error(
          `For interface type resolver ${this.getTypeName()} you must provide GraphQLObjectType or ObjectTypeComposer, but provided ${inspect(
            composeType
          )}`
        );
      }

      // checking checkFn
      if (!isFunction(checkFn)) {
        throw new Error(
          `Interface ${this.getTypeName()} has invalid check function for type ${inspect(
            composeType
          )}`
        );
      }
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  _isTypeResolversAsync(typeResolversMap: InterfaceTypeResolversMap<TContext>): boolean {
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

  addTypeResolver<TSrc>(
    type: ObjectTypeComposer<TSrc, TContext> | GraphQLObjectType,
    checkFn: InterfaceTypeResolverCheckFn<TSrc, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();
    typeResolversMap.set(type, checkFn);
    this.setTypeResolvers(typeResolversMap);
    return this;
  }

  removeTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeComposer<TSource, TContext> {
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

  setExtensions(extensions: Extensions): InterfaceTypeComposer<TSource, TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): InterfaceTypeComposer<TSource, TContext> {
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

  setExtension(extensionName: string, value: any): InterfaceTypeComposer<TSource, TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...extensions,
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): InterfaceTypeComposer<TSource, TContext> {
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
  ): InterfaceTypeComposer<TSource, TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(
    fieldName: string,
    extensionName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getFieldExtensions(fieldName) };
    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
    return this;
  }

  getFieldArgExtensions(fieldName: string, argName: string): Extensions {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.extensions || {};
  }

  setFieldArgExtensions(
    fieldName: string,
    argName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const ac = this.getFieldArg(fieldName, argName);
    this.setFieldArg(fieldName, argName, { ...ac, extensions });
    return this;
  }

  extendFieldArgExtensions(
    fieldName: string,
    argName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getFieldArgExtensions(fieldName, argName);
    this.setFieldArgExtensions(fieldName, argName, {
      ...current,
      ...extensions,
    });
    return this;
  }

  clearFieldArgExtensions(
    fieldName: string,
    argName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    this.setFieldArgExtensions(fieldName, argName, {});
    return this;
  }

  getFieldArgExtension(fieldName: string, argName: string, extensionName: string): ?any {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensions[extensionName];
  }

  hasFieldArgExtension(fieldName: string, argName: string, extensionName: string): boolean {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensionName in extensions;
  }

  setFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string,
    value: any
  ): InterfaceTypeComposer<TSource, TContext> {
    this.extendFieldArgExtensions(fieldName, argName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getFieldArgExtensions(fieldName, argName) };
    delete extensions[extensionName];
    this.setFieldArgExtensions(fieldName, argName, extensions);
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

  getFieldArgDirectives(fieldName: string, argName: string): Array<ExtensionsDirective> {
    const directives = this.getFieldArgExtension(fieldName, argName, 'directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  getFieldArgDirectiveNames(fieldName: string, argName: string): string[] {
    return this.getFieldArgDirectives(fieldName, argName).map(d => d.name);
  }

  getFieldArgDirectiveByName(
    fieldName: string,
    argName: string,
    directiveName: string
  ): ?DirectiveArgs {
    const directive = this.getFieldArgDirectives(fieldName, argName).find(
      d => d.name === directiveName
    );
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectiveById(fieldName: string, argName: string, idx: number): ?DirectiveArgs {
    const directive = this.getFieldArgDirectives(fieldName, argName)[idx];
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
