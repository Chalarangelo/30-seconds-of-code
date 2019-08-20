"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = isString;
exports.isObject = isObject;
exports.isFunction = isFunction;

function isString(value)
/* : boolean %checks */
{
  return typeof value === 'string';
}

function isObject(value)
/* : boolean %checks */
{
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function isFunction(value)
/* : boolean %checks */
{
  return !!(value && value.constructor && value.call && typeof value === 'function' && value.apply);
}