function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, getNamedType, GraphQLInterfaceType, isOutputType } from './graphql';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { InputTypeComposer, isComposeInputType } from './InputTypeComposer';
import { InterfaceTypeComposer } from './InterfaceTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { Resolver } from './Resolver';
import { SchemaComposer } from './SchemaComposer';
import { resolveMaybeThunk, upperFirst, inspect } from './utils/misc';
import { isObject, isFunction, isString } from './utils/is';
import { resolveOutputConfigMapAsThunk, resolveOutputConfigAsThunk, resolveArgConfigAsThunk, resolveInterfaceArrayAsThunk } from './utils/configAsThunk';
import { defineFieldMap, defineFieldMapToConfig } from './utils/configToDefine';
import { toInputObjectType } from './utils/toInputObjectType';
import { typeByPath } from './utils/typeByPath';
import { getComposeTypeName } from './utils/typeHelpers';
import { graphqlVersion } from './utils/graphqlVersion';
export function isComposeOutputType(type) {
  return isOutputType(type) || Array.isArray(type) && isComposeOutputType(type[0]) || type instanceof ObjectTypeComposer || type instanceof InterfaceTypeComposer || type instanceof EnumTypeComposer || type instanceof UnionTypeComposer || type instanceof ScalarTypeComposer || type instanceof Resolver;
} // Compose Args -----------------------------

export class ObjectTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `ObjectTypeComposer.create(typeDef, schemaComposer)`');
    }

    const tc = this.createTemp(typeDef, schemaComposer);
    const typeName = tc.getTypeName();

    if (typeName !== 'Query' && typeName !== 'Mutation' && typeName !== 'Subscription') {
      schemaComposer.add(tc);
    }

    return tc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new SchemaComposer();
    let TC;

    if (isString(typeDef)) {
      const typeName = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

      if (NAME_RX.test(typeName)) {
        TC = new ObjectTypeComposer(new GraphQLObjectType({
          name: typeName,
          fields: () => ({})
        }), sc);
      } else {
        TC = sc.typeMapper.createType(typeName);

        if (!(TC instanceof ObjectTypeComposer)) {
          throw new Error('You should provide correct GraphQLObjectType type definition.' + 'Eg. `type MyType { name: String }`');
        }
      }
    } else if (typeDef instanceof GraphQLObjectType) {
      TC = new ObjectTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const fields = typeDef.fields;
      const interfaces = typeDef.interfaces;
      const type = new GraphQLObjectType(_objectSpread({}, typeDef, {
        fields: isFunction(fields) ? () => resolveOutputConfigMapAsThunk(sc, fields(), typeDef.name) : () => ({}),
        interfaces: isFunction(interfaces) ? () => resolveInterfaceArrayAsThunk(sc, interfaces, typeDef.name) : []
      }));
      TC = new ObjectTypeComposer(type, sc);
      if (isObject(fields)) TC.addFields(fields);
      if (Array.isArray(interfaces)) TC.setInterfaces(interfaces);
      TC.gqType._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLObjectTypeConfig or string with type name to ObjectTypeComposer.create(opts). Provided:\n${inspect(typeDef)}`);
    }

    return TC;
  }

  constructor(gqType, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new ObjectTypeComposer(GraphQLObjectType, SchemaComposer)`');
    }

    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLObjectType)) {
      throw new Error('ObjectTypeComposer accept only GraphQLObjectType in constructor');
    }

    this.gqType = gqType; // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */
  } // -----------------------------------------------
  // Field methods
  // -----------------------------------------------


  getFields() {
    if (!this.gqType._gqcFields) {
      if (graphqlVersion >= 14) {
        this.gqType._gqcFields = defineFieldMapToConfig(this.gqType._fields);
      } else {
        const fields = this.gqType._typeConfig.fields;
        this.gqType._gqcFields = resolveMaybeThunk(fields) || {};
      }
    }

    return this.gqType._gqcFields;
  }

  getFieldNames() {
    return Object.keys(this.getFields());
  }

  setFields(fields) {
    this.gqType._gqcFields = fields;

    if (graphqlVersion >= 14) {
      this.gqType._fields = () => {
        return defineFieldMap(this.gqType, resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName()));
      };
    } else {
      this.gqType._typeConfig.fields = () => {
        return resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName());
      };

      delete this.gqType._fields; // clear builded fields in type
    }

    return this;
  }

  hasField(fieldName) {
    const fields = this.getFields();
    return !!fields[fieldName];
  }

  setField(fieldName, fieldConfig) {
    this.addFields({
      [fieldName]: fieldConfig
    });
    return this;
  }
  /**
   * Add new fields or replace existed in a GraphQL type
   */


  addFields(newFields) {
    this.setFields(_objectSpread({}, this.getFields(), newFields));
    return this;
  }
  /**
   * Add new fields or replace existed (where field name may have dots)
   */


  addNestedFields(newFields) {
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
          childTC = ObjectTypeComposer.createTemp(`${this.getTypeName()}${upperFirst(name)}`, this.schemaComposer);
          this.setField(name, {
            type: childTC,
            resolve: () => ({})
          });
        } else {
          childTC = this.getFieldTC(name);
        }

        if (childTC instanceof ObjectTypeComposer) {
          childTC.addNestedFields({
            [names.join('.')]: fc
          });
        }
      }
    });
    return this;
  }
  /**
   * Get fieldConfig by name
   */


  getField(fieldName) {
    const fields = this.getFields();
    let field = fields[fieldName];

    if (!field) {
      throw new Error(`Cannot get field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`);
    }

    if (isFunction(field)) field = field();

    if (typeof field === 'string' || isComposeOutputType(field) || Array.isArray(field)) {
      return {
        type: field
      };
    }

    return field;
  }

  removeField(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    const fields = this.getFields();
    fieldNames.forEach(fieldName => delete fields[fieldName]);
    this.setFields(_objectSpread({}, fields));
    return this;
  }

  removeOtherFields(fieldNameOrArray) {
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

  extendField(fieldName, partialFieldConfig) {
    let prevFieldConfig;

    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(`Cannot extend field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`);
    }

    this.setField(fieldName, _objectSpread({}, prevFieldConfig, partialFieldConfig, {
      extensions: _objectSpread({}, prevFieldConfig.extensions || {}, partialFieldConfig.extensions || {})
    }));
    return this;
  }

  reorderFields(names) {
    const orderedFields = {};
    const fields = this.getFields();
    names.forEach(name => {
      if (fields[name]) {
        orderedFields[name] = fields[name];
        delete fields[name];
      }
    });
    this.setFields(_objectSpread({}, orderedFields, fields));
    return this;
  }

  isFieldNonNull(fieldName) {
    return this.getFieldType(fieldName) instanceof GraphQLNonNull;
  }

  getFieldConfig(fieldName) {
    const fc = this.getField(fieldName);

    if (!fc) {
      throw new Error(`Type ${this.getTypeName()} does not have field with name '${fieldName}'`);
    }

    return resolveOutputConfigAsThunk(this.schemaComposer, fc, fieldName, this.getTypeName());
  }

  getFieldType(fieldName) {
    return this.getFieldConfig(fieldName).type;
  }

  getFieldTC(fieldName) {
    const fieldType = getNamedType(this.getFieldType(fieldName));
    const tc = this.schemaComposer.createTC(fieldType);

    if (tc instanceof InputTypeComposer) {
      throw new Error(`${this.getTypeName()}.getFieldTC('${fieldName}') returns InputTypeComposer. It's very strange cause fields may have only Output types (Scalar, Object, Enum, Union, Interface).`);
    }

    return tc;
  }
  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */


  getFieldOTC(fieldName) {
    const tc = this.getFieldTC(fieldName);

    if (!(tc instanceof ObjectTypeComposer)) {
      throw new Error(`${this.getTypeName()}.getFieldOTC('${fieldName}') must be ObjectTypeComposer, but recieved ${tc.constructor.name}. Maybe you need to use 'getFieldTC()' method which returns any type composer?`);
    }

    return tc;
  }

  makeFieldNonNull(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);

        if (!(fieldType instanceof GraphQLNonNull)) {
          this.extendField(fieldName, {
            type: new GraphQLNonNull(fieldType)
          });
        }
      }
    });
    return this;
  }

  makeFieldNullable(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);

        if (fieldType instanceof GraphQLNonNull) {
          this.extendField(fieldName, {
            type: fieldType.ofType
          });
        }
      }
    });
    return this;
  }

  deprecateFields(fields) {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(`Cannot deprecate unexisted field '${fields}' from type '${this.getTypeName()}'`);
      }

      this.extendField(fields, {
        deprecationReason: 'deprecated'
      });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate unexisted field '${field}' from type '${this.getTypeName()}'`);
        }

        this.extendField(field, {
          deprecationReason: 'deprecated'
        });
      });
    } else {
      const fieldMap = fields;
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate unexisted field '${field}' from type '${this.getTypeName()}'`);
        }

        const deprecationReason = fieldMap[field];
        this.extendField(field, {
          deprecationReason
        });
      });
    }

    return this;
  }

  getFieldArgs(fieldName) {
    try {
      const fc = this.getField(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(`Cannot get field args. Field '${fieldName}' from type '${this.getTypeName()}' does not exist.`);
    }
  }

  hasFieldArg(fieldName, argName) {
    try {
      const fieldArgs = this.getFieldArgs(fieldName);
      return !!fieldArgs[argName];
    } catch (e) {
      return false;
    }
  }

  getFieldArg(fieldName, argName) {
    const fieldArgs = this.getFieldArgs(fieldName);
    let arg = fieldArgs[argName];

    if (!arg) {
      throw new Error(`Cannot get arg '${argName}' from type.field '${this.getTypeName()}.${fieldName}'. Argument does not exist.`);
    }

    if (isFunction(arg)) arg = arg();

    if (typeof arg === 'string' || isComposeInputType(arg) || Array.isArray(arg)) {
      return {
        type: arg
      };
    }

    return arg;
  }

  getFieldArgType(fieldName, argName) {
    const ac = this.getFieldArg(fieldName, argName);
    const graphqlAC = resolveArgConfigAsThunk(this.schemaComposer, ac, argName, fieldName, this.getTypeName());
    return graphqlAC.type;
  }

  getFieldArgTC(fieldName, argName) {
    const fieldType = getNamedType(this.getFieldArgType(fieldName, argName));
    const tc = this.schemaComposer.createTC(fieldType);

    if (tc instanceof ObjectTypeComposer || tc instanceof InterfaceTypeComposer || tc instanceof UnionTypeComposer) {
      throw new Error(`${this.getTypeName()}.getFieldArgTC('${fieldName}', '${argName}') returns ${tc.constructor.name}. It's very strange cause args may have only Input types (Scalar, InputObject, Enum).`);
    }

    return tc;
  }
  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */


  getFieldArgITC(fieldName, argName) {
    const tc = this.getFieldArgTC(fieldName, argName);

    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(`${this.getTypeName()}.getFieldArgITC('${fieldName}', '${argName}') must be InputTypeComposer, but recieved ${tc.constructor.name}. Maybe you need to use 'getFieldArgTC()' method which returns any type composer?`);
    }

    return tc;
  }

  setFieldArgs(fieldName, args) {
    const field = _objectSpread({}, this.getField(fieldName));

    field.args = args;
    this.setField(fieldName, field);
    return this;
  }

  addFieldArgs(fieldName, newArgs) {
    this.setFieldArgs(fieldName, _objectSpread({}, this.getFieldArgs(fieldName), newArgs));
    return this;
  }

  setFieldArg(fieldName, argName, argConfig) {
    this.addFieldArgs(fieldName, {
      [argName]: argConfig
    });
    return this;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    return this.gqType;
  }

  getTypePlural() {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull() {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName() {
    return this.gqType.name;
  }

  setTypeName(name) {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription() {
    return this.gqType.description || '';
  }

  setDescription(description) {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName) {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for ObjectTypeComposer.clone()');
    }

    const newFields = {};
    this.getFieldNames().forEach(fieldName => {
      const fc = this.getFieldConfig(fieldName);
      newFields[fieldName] = _objectSpread({}, fc);
    });
    const cloned = new ObjectTypeComposer(new GraphQLObjectType({
      name: newTypeName,
      fields: newFields
    }), this.schemaComposer);
    cloned.setDescription(this.getDescription());

    try {
      cloned.setRecordIdFn(this.getRecordIdFn());
    } catch (e) {// no problem, clone without resolveIdFn
    }

    this.getResolvers().forEach(resolver => {
      const newResolver = resolver.clone();
      cloned.addResolver(newResolver);
    });
    return cloned;
  }

  getIsTypeOf() {
    return this.gqType.isTypeOf;
  }

  setIsTypeOf(fn) {
    this.gqType.isTypeOf = fn;
    return this;
  }

  merge(type) {
    if (type instanceof GraphQLObjectType) {
      this.addFields(defineFieldMapToConfig(type.getFields()));
      type.getInterfaces().forEach(iface => this.addInterface(iface));
    } else if (type instanceof GraphQLInterfaceType) {
      this.addFields(defineFieldMapToConfig(type.getFields()));
    } else if (type instanceof ObjectTypeComposer) {
      this.addFields(type.getFields());
      type.getInterfaces().forEach(iface => this.addInterface(iface)); // Feel free to add other properties for merging two TypeComposers.
      // For simplicity it just merge fields and interfaces.
    } else if (type instanceof InterfaceTypeComposer) {
      this.addFields(type.getFields());
    } else {
      throw new Error(`Cannot merge ${inspect(type)} with ObjectType(${this.getTypeName()}). Provided type should be GraphQLObjectType or ObjectTypeComposer.`);
    }

    return this;
  } // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------


  getInputType() {
    return this.getInputTypeComposer().getType();
  }

  hasInputTypeComposer() {
    return !!this.gqType._gqcInputTypeComposer;
  }

  setInputTypeComposer(itc) {
    this.gqType._gqcInputTypeComposer = itc;
    return this;
  }

  getInputTypeComposer() {
    if (!this.gqType._gqcInputTypeComposer) {
      this.gqType._gqcInputTypeComposer = toInputObjectType(this);
    }

    return this.gqType._gqcInputTypeComposer;
  } // Alias for getInputTypeComposer()


  getITC() {
    return this.getInputTypeComposer();
  }

  removeInputTypeComposer() {
    this.gqType._gqcInputTypeComposer = undefined;
    return this;
  } // -----------------------------------------------
  // Resolver methods
  // -----------------------------------------------


  getResolvers() {
    if (!this.gqType._gqcResolvers) {
      this.gqType._gqcResolvers = new Map();
    }

    return this.gqType._gqcResolvers;
  }

  hasResolver(name) {
    if (!this.gqType._gqcResolvers) {
      return false;
    }

    return this.gqType._gqcResolvers.has(name);
  }

  getResolver(name, middlewares) {
    if (!this.hasResolver(name)) {
      throw new Error(`Type ${this.getTypeName()} does not have resolver with name '${name}'`);
    }

    const resolverMap = this.gqType._gqcResolvers;
    const resolver = resolverMap.get(name);

    if (Array.isArray(middlewares)) {
      return resolver.withMiddlewares(middlewares);
    }

    return resolver;
  }

  setResolver(name, resolver) {
    if (!this.gqType._gqcResolvers) {
      this.gqType._gqcResolvers = new Map();
    }

    if (!(resolver instanceof Resolver)) {
      throw new Error('setResolver() accept only Resolver instance');
    }

    this.gqType._gqcResolvers.set(name, resolver);

    resolver.setDisplayName(`${this.getTypeName()}.${resolver.name}`);
    return this;
  }

  addResolver(opts) {
    if (!opts) {
      throw new Error('addResolver called with empty Resolver');
    }

    let resolver;

    if (!(opts instanceof Resolver)) {
      const resolverOpts = _objectSpread({}, opts); // add resolve method, otherwise added resolver will not return any data by graphql-js


      if (!resolverOpts.hasOwnProperty('resolve')) {
        resolverOpts.resolve = () => ({});
      }

      resolver = new Resolver(resolverOpts, this.schemaComposer);
    } else {
      resolver = opts;
    }

    if (!resolver.name) {
      throw new Error('resolver should have non-empty `name` property');
    }

    this.setResolver(resolver.name, resolver);
    return this;
  }

  removeResolver(resolverName) {
    if (resolverName) {
      this.getResolvers().delete(resolverName);
    }

    return this;
  }

  wrapResolver(resolverName, cbResolver) {
    const resolver = this.getResolver(resolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverAs(resolverName, fromResolverName, cbResolver) {
    const resolver = this.getResolver(fromResolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverResolve(resolverName, cbNextRp) {
    const resolver = this.getResolver(resolverName);
    this.setResolver(resolverName, resolver.wrapResolve(cbNextRp));
    return this;
  } // -----------------------------------------------
  // Interface methods
  // -----------------------------------------------


  getInterfaces() {
    if (!this.gqType._gqcInterfaces) {
      let interfaces;

      if (graphqlVersion >= 14) {
        interfaces = this.gqType._interfaces;
      } else {
        interfaces = this.gqType._typeConfig.interfaces;
      }

      this.gqType._gqcInterfaces = resolveInterfaceArrayAsThunk(this.schemaComposer, interfaces, this.getTypeName()) || [];
    }

    return this.gqType._gqcInterfaces;
  }

  setInterfaces(interfaces) {
    this.gqType._gqcInterfaces = [...interfaces];

    const interfacesThunk = () => {
      return interfaces.map(iface => {
        return this.schemaComposer.typeMapper.convertInterfaceType(iface);
      });
    };

    if (graphqlVersion >= 14) {
      this.gqType._interfaces = interfacesThunk;
    } else {
      // for old graphql versions below 0.13
      this.gqType._typeConfig.interfaces = interfacesThunk;
      delete this.gqType._interfaces;
    }

    return this;
  }

  hasInterface(iface) {
    const nameAsString = getComposeTypeName(iface);
    const ifaces = this.getInterfaces();
    return !!ifaces.find(i => getComposeTypeName(i) === nameAsString);
  }

  addInterface(interfaceObj) {
    if (!this.hasInterface(interfaceObj)) {
      this.setInterfaces([...this.getInterfaces(), interfaceObj]);
    }

    return this;
  }

  removeInterface(interfaceObj) {
    const interfaces = this.getInterfaces();
    const idx = interfaces.indexOf(interfaceObj);

    if (idx > -1) {
      interfaces.splice(idx, 1);
      this.setInterfaces(interfaces);
    }

    return this;
  } // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------


  getExtensions() {
    if (!this.gqType._gqcExtensions) {
      return {};
    } else {
      return this.gqType._gqcExtensions;
    }
  }

  setExtensions(extensions) {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions) {
    const current = this.getExtensions();
    this.setExtensions(_objectSpread({}, current, extensions));
    return this;
  }

  clearExtensions() {
    this.setExtensions({});
    return this;
  }

  getExtension(extensionName) {
    const extensions = this.getExtensions();
    return extensions[extensionName];
  }

  hasExtension(extensionName) {
    const extensions = this.getExtensions();
    return extensionName in extensions;
  }

  setExtension(extensionName, value) {
    this.extendExtensions({
      [extensionName]: value
    });
    return this;
  }

  removeExtension(extensionName) {
    const extensions = _objectSpread({}, this.getExtensions());

    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName) {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName, extensions) {
    const field = this.getField(fieldName);
    this.setField(fieldName, _objectSpread({}, field, {
      extensions
    }));
    return this;
  }

  extendFieldExtensions(fieldName, extensions) {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, _objectSpread({}, current, extensions));
    return this;
  }

  clearFieldExtensions(fieldName) {
    this.setFieldExtensions(fieldName, {});
    return this;
  }

  getFieldExtension(fieldName, extensionName) {
    const extensions = this.getFieldExtensions(fieldName);
    return extensions[extensionName];
  }

  hasFieldExtension(fieldName, extensionName) {
    const extensions = this.getFieldExtensions(fieldName);
    return extensionName in extensions;
  }

  setFieldExtension(fieldName, extensionName, value) {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value
    });
    return this;
  }

  removeFieldExtension(fieldName, extensionName) {
    const extensions = _objectSpread({}, this.getFieldExtensions(fieldName));

    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
    return this;
  }

  getFieldArgExtensions(fieldName, argName) {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.extensions || {};
  }

  setFieldArgExtensions(fieldName, argName, extensions) {
    const ac = this.getFieldArg(fieldName, argName);
    this.setFieldArg(fieldName, argName, _objectSpread({}, ac, {
      extensions
    }));
    return this;
  }

  extendFieldArgExtensions(fieldName, argName, extensions) {
    const current = this.getFieldArgExtensions(fieldName, argName);
    this.setFieldArgExtensions(fieldName, argName, _objectSpread({}, current, extensions));
    return this;
  }

  clearFieldArgExtensions(fieldName, argName) {
    this.setFieldArgExtensions(fieldName, argName, {});
    return this;
  }

  getFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensions[extensionName];
  }

  hasFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensionName in extensions;
  }

  setFieldArgExtension(fieldName, argName, extensionName, value) {
    this.extendFieldArgExtensions(fieldName, argName, {
      [extensionName]: value
    });
    return this;
  }

  removeFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = _objectSpread({}, this.getFieldArgExtensions(fieldName, argName));

    delete extensions[extensionName];
    this.setFieldArgExtensions(fieldName, argName, extensions);
    return this;
  } // -----------------------------------------------
  // Directive methods
  // -----------------------------------------------


  getDirectives() {
    const directives = this.getExtension('directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  getDirectiveNames() {
    return this.getDirectives().map(d => d.name);
  }

  getDirectiveByName(directiveName) {
    const directive = this.getDirectives().find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getDirectiveById(idx) {
    const directive = this.getDirectives()[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectives(fieldName) {
    const directives = this.getFieldExtension(fieldName, 'directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  getFieldDirectiveNames(fieldName) {
    return this.getFieldDirectives(fieldName).map(d => d.name);
  }

  getFieldDirectiveByName(fieldName, directiveName) {
    const directive = this.getFieldDirectives(fieldName).find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectiveById(fieldName, idx) {
    const directive = this.getFieldDirectives(fieldName)[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectives(fieldName, argName) {
    const directives = this.getFieldArgExtension(fieldName, argName, 'directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  getFieldArgDirectiveNames(fieldName, argName) {
    return this.getFieldArgDirectives(fieldName, argName).map(d => d.name);
  }

  getFieldArgDirectiveByName(fieldName, argName, directiveName) {
    const directive = this.getFieldArgDirectives(fieldName, argName).find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectiveById(fieldName, argName, idx) {
    const directive = this.getFieldArgDirectives(fieldName, argName)[idx];
    if (!directive) return undefined;
    return directive.args;
  } // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------


  addRelation(fieldName, opts) {
    if (!this.gqType._gqcRelations) {
      this.gqType._gqcRelations = {};
    }

    this.gqType._gqcRelations[fieldName] = opts;

    if (opts.hasOwnProperty('resolver')) {
      this.setField(fieldName, () => {
        return this._relationWithResolverToFC(opts, fieldName);
      });
    } else if (opts.hasOwnProperty('type')) {
      const fc = opts;
      this.setField(fieldName, fc);
    }

    return this;
  }

  getRelations() {
    if (!this.gqType._gqcRelations) {
      this.gqType._gqcRelations = {};
    }

    return this.gqType._gqcRelations;
  }

  _relationWithResolverToFC(opts, fieldName = '') {
    const resolver = isFunction(opts.resolver) ? opts.resolver() : opts.resolver;

    if (!(resolver instanceof Resolver)) {
      throw new Error('You should provide correct Resolver object for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    if (opts.type) {
      throw new Error('You can not use `resolver` and `type` properties simultaneously for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    if (opts.resolve) {
      throw new Error('You can not use `resolver` and `resolve` properties simultaneously for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    const fieldConfig = resolver.getFieldConfig();

    const argsConfig = _objectSpread({}, fieldConfig.args);

    const argsProto = {};
    const argsRuntime = []; // remove args from config, if arg name provided in args
    //    if `argMapVal`
    //       is `undefined`, then keep arg field in config
    //       is `null`, then just remove arg field from config
    //       is `function`, then remove arg field and run it in resolve
    //       is any other value, then put it to args prototype for resolve

    const optsArgs = opts.prepareArgs || {};
    Object.keys(optsArgs).forEach(argName => {
      const argMapVal = optsArgs[argName];

      if (argMapVal !== undefined) {
        delete argsConfig[argName];

        if (isFunction(argMapVal)) {
          argsRuntime.push([argName, argMapVal]);
        } else if (argMapVal !== null) {
          argsProto[argName] = argMapVal;
        }
      }
    }); // if opts.catchErrors is undefined then set true, otherwise take it value

    const _opts$catchErrors = opts.catchErrors,
          catchErrors = _opts$catchErrors === void 0 ? true : _opts$catchErrors;

    const resolve = (source, args, context, info) => {
      const newArgs = _objectSpread({}, args, argsProto);

      argsRuntime.forEach(([argName, argFn]) => {
        newArgs[argName] = argFn(source, args, context, info);
      });
      const payload = fieldConfig.resolve ? fieldConfig.resolve(source, newArgs, context, info) : null;
      return catchErrors ? Promise.resolve(payload).catch(e => {
        // eslint-disable-next-line
        console.log(`GQC ERROR: relation for ${this.getTypeName()}.${fieldName} throws error:`);
        console.log(e); // eslint-disable-line

        return null;
      }) : payload;
    };

    return {
      type: fieldConfig.type,
      description: opts.description,
      deprecationReason: opts.deprecationReason,
      args: argsConfig,
      resolve,
      projection: opts.projection
    };
  }

  setRecordIdFn(fn) {
    this.gqType._gqcGetRecordIdFn = fn;
    return this;
  }

  hasRecordIdFn() {
    return !!this.gqType._gqcGetRecordIdFn;
  }

  getRecordIdFn() {
    if (!this.gqType._gqcGetRecordIdFn) {
      throw new Error(`Type ${this.getTypeName()} does not have RecordIdFn`);
    }

    return this.gqType._gqcGetRecordIdFn;
  }
  /**
   * Get function that returns record id, from provided object.
   */


  getRecordId(source, args, context) {
    return this.getRecordIdFn()(source, args, context);
  }

  get(path) {
    return typeByPath(this, path);
  }

}