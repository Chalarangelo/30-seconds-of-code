/**
 * Check if an object has all the given keys.
 * @param {object} obj - A plain object.
 * @param {array} keys - An array of stringified keys.
 */
export const hasKeys = (obj, keys) =>
  typeof obj === 'object' && keys.every(key => typeof obj[key] !== 'undefined');
