/* @flow strict */
/* eslint-disable no-nested-ternary */

import { pluralize } from './pluralize';
import type { Thunk, ObjMap } from './definitions';

export function resolveMaybeThunk<+T>(thingOrThunk: Thunk<T>): T {
  // eslint-disable-line
  return typeof thingOrThunk === 'function' ? (thingOrThunk: any)() : thingOrThunk;
}

export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '');
}

export function getPluralName(name: string): string {
  return pluralize(camelCase(name));
}

export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function clearName(str: string): string {
  return str.replace(/[^_a-zA-Z0-9]/g, '');
}

export function omit(obj: Object, keys: string | string[]) {
  if (!obj) {
    return {};
  }

  const result = { ...obj };
  if (Array.isArray(keys)) {
    keys.forEach(k => {
      delete result[k];
    });
  } else {
    delete result[keys];
  }

  return result;
}

export function only(obj: Object, keys: string | string[]) {
  if (!obj) {
    return {};
  }

  const result = {};
  if (Array.isArray(keys)) {
    keys.forEach(k => {
      if ({}.hasOwnProperty.call(obj, k)) {
        result[k] = obj[k];
      }
    });
  } else if ({}.hasOwnProperty.call(obj, keys)) {
    result[keys] = obj[keys];
  }

  return result;
}

function inspectObject(value: Object): string {
  let name;
  if (value && value.constructor && value.constructor.name) {
    name = value.constructor.name;
  }

  const props = `{ ${Object.keys(value)
    .map(k => `${k}: ${inspect((value: any)[k])}`)
    .join(', ')} }`;

  return name ? `${name}(${props})` : props;
}

/**
 * Used to print values in error messages.
 */
export function inspect(value: mixed): string {
  return value && typeof value === 'object'
    ? typeof value.inspect === 'function'
      ? (value: any).inspect()
      : Array.isArray(value)
      ? `[${value.map(inspect).join(', ')}]`
      : inspectObject(value)
    : typeof value === 'string'
    ? `"${value}"`
    : typeof value === 'function'
    ? `[function ${value.name}]`
    : String(value);
}

export function forEachKey<V>(
  arrayOrObject: { [key: string]: V } | ObjMap<V>,
  callback: (value: V, key: string) => void
): void {
  Object.keys(arrayOrObject).forEach(key => {
    callback(arrayOrObject[key], key);
  });
}
