const test = require('tape');
const union = require('./union.js');

test('Testing union', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof union === 'function', 'union is a Function');
  t.deepEqual(union([1, 2, 3], [4, 3, 2]), [1, 2, 3, 4], "union([1, 2, 3], [4, 3, 2]) returns [1, 2, 3, 4]");
  t.deepEqual(union('str', 'asd'), [ 's', 't', 'r', 'a', 'd' ], "union('str', 'asd') returns [ 's', 't', 'r', 'a', 'd' ]");
  t.deepEqual(union([[], {}], [1, 2, 3]), [[], {}, 1, 2, 3], "union([[], {}], [1, 2, 3]) returns [[], {}, 1, 2, 3]");
  t.deepEqual(union([], []), [], "union([], []) returns []");
  t.throws(() => union(), 'union() throws an error');
  t.throws(() => union(true, 'str'), 'union(true, str) throws an error');
  t.throws(() => union('false', true), 'union(false, true) throws an error');
  t.throws(() => union(123, {}), 'union(123, {}) throws an error');
  t.throws(() => union([], {}), 'union([], {}) throws an error');
  t.throws(() => union(undefined, null), 'union(undefined, null) throws an error');

  let start = new Date().getTime();
  union([1, 2, 3], [4, 3, 2]);
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'union([1, 2, 3], [4, 3, 2]) takes less than 2s to run');
  t.end();
});
