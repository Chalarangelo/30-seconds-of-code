// @flow strict

import isPromise from './isPromise';
import { type PromiseOrValue } from './PromiseOrValue';

/**
 * Similar to Array.prototype.reduce(), however the reducing callback may return
 * a Promise, in which case reduction will continue after each promise resolves.
 *
 * If the callback does not return a Promise, then this function will also not
 * return a Promise.
 */
export default function promiseReduce<T, U>(
  values: $ReadOnlyArray<T>,
  callback: (U, T) => PromiseOrValue<U>,
  initialValue: PromiseOrValue<U>,
): PromiseOrValue<U> {
  return values.reduce(
    (previous, value) =>
      isPromise(previous)
        ? previous.then(resolved => callback(resolved, value))
        : callback(previous, value),
    initialValue,
  );
}
