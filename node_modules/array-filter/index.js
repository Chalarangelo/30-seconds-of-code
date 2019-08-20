/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */

module.exports = function (arr, fn) {
  if (arr.filter) return arr.filter(fn);
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    if (fn(arr[i], i, arr)) ret.push(arr[i]);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;
