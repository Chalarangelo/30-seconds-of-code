"use strict";

const getValueAt = (obj, selector) => {
  const selectors = typeof selector === `string` ? selector.split(`.`) : selector;
  return get(obj, selectors);
};

const get = (obj, selectors) => {
  if (Array.isArray(obj)) return getArray(obj, selectors);
  const [key, ...rest] = selectors;
  const value = obj[key];
  if (!rest.length) return value;
  if (Array.isArray(value)) return getArray(value, rest);
  if (value && typeof value === `object`) return get(value, rest);
  return undefined;
};

const getArray = (arr, selectors) => arr.map(value => Array.isArray(value) ? getArray(value, selectors) : get(value, selectors)).filter(v => v !== undefined);

module.exports = {
  getValueAt
};
//# sourceMappingURL=get-value-at.js.map