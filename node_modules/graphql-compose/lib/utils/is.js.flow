/* @flow strict */

export function isString(value: ?mixed) /* : boolean %checks */ {
  return typeof value === 'string';
}

export function isObject(value: ?mixed) /* : boolean %checks */ {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function isFunction(value: ?mixed) /* : boolean %checks */ {
  return !!(value && value.constructor && value.call && typeof value === 'function' && value.apply);
}
