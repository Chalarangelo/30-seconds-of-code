const test = require('tape');
const isArrayLike = require('./isArrayLike.js');

test('Testing isArrayLike', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isArrayLike === 'function', 'isArrayLike is a Function');
  //t.deepEqual(isArrayLike(args..), 'Expected');
  //t.equal(isArrayLike(args..), 'Expected');
  //t.false(isArrayLike(args..), 'Expected');
  //t.throws(isArrayLike(args..), 'Expected');
  t.end();
});