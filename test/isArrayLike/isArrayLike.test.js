const test = require('tape');
const isArrayLike = require('./isArrayLike.js');

test('Testing isArrayLike', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isArrayLike === 'function', 'isArrayLike is a Function');
  t.equal(isArrayLike('abc'), true, 'Returns true for a string');
  t.equal(isArrayLike([1,2,3]), true, 'Returns true for an array');
  t.equal(isArrayLike(null), false, 'Returns false for null');
  //t.deepEqual(isArrayLike(args..), 'Expected');
  //t.equal(isArrayLike(args..), 'Expected');
  //t.false(isArrayLike(args..), 'Expected');
  //t.throws(isArrayLike(args..), 'Expected');
  t.end();
});
