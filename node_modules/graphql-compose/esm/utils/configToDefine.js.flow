/* @flow strict */
/* eslint-disable no-use-before-define */

// This is internal methods of graphql-js (introduced in 14.0.0)
// required for corret config convertion to internal field definition of types
// copy pasted from https://github.com/graphql/graphql-js/blame/master/src/type/definition.js

// Methods *ToConfig was written by @nodkz for converting internal fields to config objects

import invariant from 'graphql/jsutils/invariant';
import type { Thunk } from './definitions';
import { resolveMaybeThunk, inspect } from './misc';
import type {
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfigMap,
  GraphQLFieldMap,
  GraphQLEnumType,
  GraphQLEnumValueConfigMap,
  GraphQLEnumValue,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputFieldMap,
} from '../graphql';

function isPlainObj(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function defineFieldMap(
  config: GraphQLObjectType | GraphQLInterfaceType,
  fieldMap: GraphQLFieldConfigMap<any, any>
): GraphQLFieldMap<*, *> {
  invariant(
    isPlainObj(fieldMap),
    `${config.name} fields must be an object with field names as keys or a ` +
      'function which returns such an object.'
  );

  const resultFieldMap = Object.create(null);
  for (const fieldName of Object.keys(fieldMap)) {
    const fieldConfig = fieldMap[fieldName];
    invariant(
      isPlainObj(fieldConfig),
      `${config.name}.${fieldName} field config must be an object`
    );
    invariant(
      !fieldConfig.hasOwnProperty('isDeprecated'),
      `${config.name}.${fieldName} should provide "deprecationReason" ` +
        'instead of "isDeprecated".'
    );
    const field = {
      ...fieldConfig,
      isDeprecated: Boolean(fieldConfig.deprecationReason),
      name: fieldName,
    };
    invariant(
      field.resolve == null || typeof field.resolve === 'function',
      `${config.name}.${fieldName} field resolver must be a function if ` +
        `provided, but got: ${inspect(field.resolve)}.`
    );
    const argsConfig = fieldConfig.args;
    if (!argsConfig) {
      field.args = [];
    } else {
      invariant(
        isPlainObj(argsConfig),
        `${config.name}.${fieldName} args must be an object with argument names as keys.`
      );
      field.args = Object.keys(argsConfig).map(argName => {
        const arg = argsConfig[argName];
        return {
          name: argName,
          description: arg.description === undefined ? null : arg.description,
          type: arg.type,
          defaultValue: arg.defaultValue,
          astNode: arg.astNode,
        };
      });
    }
    resultFieldMap[fieldName] = field;
  }
  return resultFieldMap;
}

export function defineFieldMapToConfig(
  fieldMap: Thunk<GraphQLFieldMap<*, *>>
): GraphQLFieldConfigMap<any, any> {
  const fields = {};
  const _fields = resolveMaybeThunk(fieldMap);
  Object.keys(_fields).forEach(n => {
    const { name, isDeprecated, ...fc } = _fields[n];
    if (Array.isArray(fc.args)) {
      const args = {};
      fc.args.forEach(({ name: argName, ...ac }) => {
        args[argName] = ac;
      });
      fc.args = (args: any);
    }
    fields[n] = fc;
  });
  return fields;
}

export function defineEnumValues(
  type: GraphQLEnumType,
  valueMap: GraphQLEnumValueConfigMap /* <T> */
): Array<GraphQLEnumValue /* <T> */> {
  invariant(
    isPlainObj(valueMap),
    `${type.name} values must be an object with value names as keys.`
  );
  return Object.keys(valueMap).map(valueName => {
    const value = valueMap[valueName];
    invariant(
      isPlainObj(value),
      `${type.name}.${valueName} must refer to an object with a "value" key ` +
        `representing an internal value but got: ${inspect(value)}.`
    );
    invariant(
      !value.hasOwnProperty('isDeprecated'),
      `${type.name}.${valueName} should provide "deprecationReason" instead of "isDeprecated".`
    );
    return {
      name: valueName,
      description: value.description,
      isDeprecated: Boolean(value.deprecationReason),
      deprecationReason: value.deprecationReason,
      astNode: value.astNode,
      value: value.hasOwnProperty('value') ? value.value : valueName,
    };
  });
}

export function defineEnumValuesToConfig(
  _values: Array<GraphQLEnumValue /* <T> */>
): GraphQLEnumValueConfigMap /* <T> */ {
  const values = {};
  if (Array.isArray(_values)) {
    _values.forEach(({ name, isDeprecated, ...config }) => {
      values[name] = config;
    });
  }
  return values;
}

export function defineInputFieldMap(
  config: GraphQLInputObjectType,
  fieldMap: GraphQLInputFieldConfigMap
): GraphQLInputFieldMap {
  invariant(
    isPlainObj(fieldMap),
    `${config.name} fields must be an object with field names as keys or a ` +
      'function which returns such an object.'
  );
  const resultFieldMap = Object.create(null);
  for (const fieldName of Object.keys(fieldMap)) {
    const field = {
      ...fieldMap[fieldName],
      name: fieldName,
    };
    invariant(
      !field.hasOwnProperty('resolve'),
      `${config.name}.${fieldName} field has a resolve property, but ` +
        'Input Types cannot define resolvers.'
    );
    resultFieldMap[fieldName] = field;
  }
  return resultFieldMap;
}

export function defineInputFieldMapToConfig(
  fieldMap: GraphQLInputFieldMap
): GraphQLInputFieldConfigMap {
  const fields = {};
  const _fields = resolveMaybeThunk(fieldMap);
  Object.keys(_fields).forEach(n => {
    const { name, isDeprecated, ...fc } = _fields[n];
    fields[n] = fc;
  });
  return fields;
}
