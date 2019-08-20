// @flow strict

/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 */
declare function isPromise(value: mixed): boolean %checks(value instanceof
  Promise);

// eslint-disable-next-line no-redeclare
export default function isPromise(value) {
  return Boolean(value && typeof value.then === 'function');
}
