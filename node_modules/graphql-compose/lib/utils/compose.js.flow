/* @flow strict */
/* eslint-disable */

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function composeImpl(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args));
}

type FN<A,R> = (a: A) => R;
const compose:
  ((end: void) => (<T>(x: T) => T)) &
  (<A,B>(m1: FN<A,B>, end: void) => FN<A,B>) &
  (<A,B,C>(m1: FN<B,C>, m2: FN<A,B>, end: void) => FN<A,C>) &
  (<A,B,C,D>(m1: FN<C,D>, m2: FN<B,C>, m3: FN<A,B>, end: void) => FN<A,D>) &
  (<A,B,C,D,E>(m1: FN<D,E>, m2: FN<C,D>, m3: FN<B,C>, m4: FN<A,B>, end: void) => FN<A,E>) &
  (<A,B,C,D,E,F>(m1: FN<E,F>, m2: FN<D,E>, m3: FN<C,D>, m4: FN<B,C>, m5: FN<A,B>, end: void) => FN<A,F>) &
  (<A,B,C,D,E,F,G>(m1: FN<F,G>, m2: FN<E,F>, m3: FN<D,E>, m4: FN<C,D>, m5: FN<B,C>, m6: FN<A,B>, end: void) => FN<A,G>) &
  (<A,B,C,D,E,F,G,H>(m1: FN<G,H>, m2: FN<F,G>, m3: FN<E,F>, m4: FN<D,E>, m5: FN<C,D>, m6: FN<B,C>, m7: FN<A,B>, end: void) => FN<A,H>) &
  (<A,B,C,D,E,F,G,H,J>(m1: FN<G,J>, m2: FN<G,H>, m3: FN<F,G>, m4: FN<E,F>, m5: FN<D,E>, m6: FN<C,D>, m7: FN<B,C>, m8: FN<A,B>, end: void) => FN<A,J>) &
  (<A,B,C,D,E,F,G,H,J,K>(m1: FN<J,K>, m2: FN<G,J>, m3: FN<G,H>, m4: FN<F,G>, m5: FN<E,F>, m6: FN<D,E>, m7: FN<C,D>, m8: FN<B,C>, m9: FN<A,B>, end: void) => FN<A,K>) &
  (<A,B,C,D,E,F,G,H,J,K,L>(m1: FN<K,L>, m2: FN<J,K>, m3: FN<G,J>, m4: FN<G,H>, m5: FN<F,G>, m6: FN<E,F>, m7: FN<D,E>, m8: FN<C,D>, m9: FN<B,C>, m10: FN<A,B>, end: void) => FN<A,L>) &
  (<A,R>(...funcs: Array<FN<A,R>>) => FN<A,R>)
  = (composeImpl: any);

export default compose;
