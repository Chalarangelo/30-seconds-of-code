function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { $$asyncIterator } from 'iterall';
/**
 * Given an error, returns an AsyncIterable which will fail with that error.
 *
 * Similar to Promise.reject(error)
 */

export default function asyncIteratorReject(error) {
  var isComplete = false;
  /* TODO: Flow doesn't support symbols as keys:
     https://github.com/facebook/flow/issues/3258 */

  return _defineProperty({
    next: function next() {
      var result = isComplete ? Promise.resolve({
        value: undefined,
        done: true
      }) : Promise.reject(error);
      isComplete = true;
      return result;
    },
    return: function _return() {
      isComplete = true;
      return Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function _throw() {
      isComplete = true;
      return Promise.reject(error);
    }
  }, $$asyncIterator, function () {
    return this;
  });
}
