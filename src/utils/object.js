/* eslint-disable no-prototype-builtins */
/**
 * Check if an object has the given key.
 * @param {object} obj - An object.
 * @param {array} keys - A list of nested keys.
 */
export const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every(key => {
      if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};

/**
 * Check if an object has all the given keys.
 * @param {object} obj - A plain object.
 * @param {array} keys - An array of stringified keys.
 */
export const hasKeys = (obj, keys) =>
  typeof obj === 'object' &&
  keys.every(key => hasKey(obj, Array.isArray(key) ? key : [key]));

/**
 * Retrieve a set of properties indicated by the given selectors from an object.
 * @param {object} from - An object.
 * @param  {array} selectors - A list of selector keys.
 */
export const get = (from, selectors) =>
  selectors
    .map(s => Array.isArray(s) ? s.join('.') : s)
    .map(s =>
      s
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur], from)
    );
