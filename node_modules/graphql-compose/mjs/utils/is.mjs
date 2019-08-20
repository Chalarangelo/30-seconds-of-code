export function isString(value)
/* : boolean %checks */
{
  return typeof value === 'string';
}
export function isObject(value)
/* : boolean %checks */
{
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}
export function isFunction(value)
/* : boolean %checks */
{
  return !!(value && value.constructor && value.call && typeof value === 'function' && value.apply);
}