'use strict';

/**
 * Concat and flattens non-null values.
 * Ex: concat(1, undefined, 2, [3, 4]) = [1, 2, 3, 4]
 */
function concat() {
  const args = Array.from(arguments).filter(e => e != null);
  const baseArray = Array.isArray(args[0]) ? args[0] : [args[0]];
  return Array.prototype.concat.apply(baseArray, args.slice(1));
}

/**
 * Dedupes array based on criterion returned from iteratee function.
 * Ex: uniqueBy(
 *     [{ id: 1 }, { id: 1 }, { id: 2 }],
 *     val => val.id
 * ) = [{ id: 1 }, { id: 2 }]
 */
function uniqueBy(arr, fun) {
  const seen = {};
  return arr.filter(el => {
    const e = fun(el);
    return !(e in seen) && (seen[e] = 1);
  })
}

module.exports = {
  concat: concat,
  uniqueBy: uniqueBy
};
