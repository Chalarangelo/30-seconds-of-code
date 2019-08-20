/* @flow strict */
/* eslint-disable no-use-before-define */

import { isFunction, isObject } from './is';
import type { SchemaComposer } from '../SchemaComposer';
import type {
  GraphQLFieldConfig,
  GraphQLArgumentConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLObjectType,
  GraphQLInterfaceType,
} from '../graphql';
import type { ComposeInputFieldConfig, ComposeInputFieldConfigMap } from '../InputTypeComposer';
import type {
  ComposeFieldConfig,
  ComposeFieldConfigMap,
  ComposeArgumentConfig,
  ComposeFieldConfigArgumentMap,
  ComposeObjectType,
} from '../ObjectTypeComposer';
import type { ComposeInterfaceType } from '../InterfaceTypeComposer';
import type { Thunk } from './definitions';

export function resolveOutputConfigAsThunk<TSource, TContext>(
  schema: SchemaComposer<TContext>,
  fc: ComposeFieldConfig<TSource, TContext>,
  name: string,
  typeName?: string = ''
): GraphQLFieldConfig<TSource, TContext> {
  const fieldConfig = schema.typeMapper.convertOutputFieldConfig(
    isFunction(fc) ? fc() : fc,
    name,
    typeName
  );

  if (isFunction(fieldConfig.type)) {
    fieldConfig.type = schema.typeMapper.convertOutputFieldConfig(
      fieldConfig.type(),
      name,
      typeName
    ).type;
  }

  if (isObject(fieldConfig.args)) {
    fieldConfig.args = resolveArgConfigMapAsThunk(schema, (fieldConfig.args: any), name, typeName);
  }

  return fieldConfig;
}

export function resolveOutputConfigMapAsThunk<TSource, TContext>(
  schema: SchemaComposer<TContext>,
  fieldMap: ComposeFieldConfigMap<TSource, TContext>,
  typeName?: string = ''
): GraphQLFieldConfigMap<TSource, TContext> {
  const fields = {};
  if (isObject(fieldMap)) {
    Object.keys(fieldMap).forEach(name => {
      fields[name] = resolveOutputConfigAsThunk(schema, fieldMap[name], name, typeName);
    });
  }
  return fields;
}

export function resolveInputConfigAsThunk(
  schema: SchemaComposer<any>,
  fc: ComposeInputFieldConfig,
  name: string,
  typeName?: string
): GraphQLInputFieldConfig {
  const fieldConfig = schema.typeMapper.convertInputFieldConfig(
    isFunction(fc) ? fc() : fc,
    name,
    typeName
  );

  if (isFunction(fieldConfig.type)) {
    fieldConfig.type = schema.typeMapper.convertInputFieldConfig(
      fieldConfig.type(),
      name,
      typeName
    ).type;
  }

  return fieldConfig;
}

export function resolveInputConfigMapAsThunk(
  schema: SchemaComposer<any>,
  fieldMap: ComposeInputFieldConfigMap,
  typeName?: string
): GraphQLInputFieldConfigMap {
  const fields = {};
  if (isObject(fieldMap)) {
    Object.keys(fieldMap).forEach(name => {
      fields[name] = resolveInputConfigAsThunk(schema, fieldMap[name], name, typeName);
    });
  }
  return fields;
}

export function resolveArgConfigAsThunk(
  schema: SchemaComposer<any>,
  ac: ComposeArgumentConfig,
  name: string,
  fieldName?: string,
  typeName?: string
): GraphQLArgumentConfig {
  const argConfig = schema.typeMapper.convertArgConfig(
    isFunction(ac) ? ac() : ac,
    name,
    fieldName,
    typeName
  );

  if (isFunction(argConfig.type)) {
    argConfig.type = schema.typeMapper.convertArgConfig(argConfig.type(), name, typeName).type;
  }

  return argConfig;
}

export function resolveArgConfigMapAsThunk(
  schema: SchemaComposer<any>,
  argMap: ComposeFieldConfigArgumentMap<any>,
  fieldName?: string,
  typeName?: string
): GraphQLFieldConfigArgumentMap {
  const args = {};
  if (isObject(argMap)) {
    Object.keys(argMap).forEach(name => {
      args[name] = resolveArgConfigAsThunk(schema, argMap[name], name, fieldName, typeName);
    });
  }
  return args;
}

export function resolveTypeArrayAsThunk(
  schema: SchemaComposer<any>,
  types: Thunk<$ReadOnlyArray<ComposeObjectType>>,
  typeName?: string
): Array<GraphQLObjectType> {
  try {
    const t = isFunction(types) ? types() : types;
    return t.map((type: ComposeObjectType) => schema.typeMapper.convertOutputType(type));
  } catch (e) {
    throw new Error(`Cannot resolve types for ${typeName || ''}`);
  }
}

export function resolveInterfaceArrayAsThunk(
  schema: SchemaComposer<any>,
  types: Thunk<$ReadOnlyArray<ComposeInterfaceType>>,
  typeName?: string
): Array<GraphQLInterfaceType> {
  try {
    const t = isFunction(types) ? types() : types;
    return t.map((type: ComposeInterfaceType) => schema.typeMapper.convertInterfaceType(type));
  } catch (e) {
    throw new Error(`Cannot resolve types for ${typeName || ''}`);
  }
}
