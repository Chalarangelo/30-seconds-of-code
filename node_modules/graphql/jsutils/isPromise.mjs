/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 */
// eslint-disable-next-line no-redeclare
export default function isPromise(value) {
  return Boolean(value && typeof value.then === 'function');
}
