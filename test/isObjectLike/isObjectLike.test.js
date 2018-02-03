const test = require('tape');
const isObjectLike = require('./isObjectLike.js');

test('Testing isObjectLike', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isObjectLike === 'function', 'isObjectLike is a Function');
  t.equal(isObjectLike({}), true, 'Returns true for an object');
  t.equal(isObjectLike([1, 2, 3]), true, 'Returns true for an array');
  t.equal(isObjectLike(x => x), false, 'Returns false for a function');
  t.equal(isObjectLike(null), false, 'Returns false for null');
  //t.deepEqual(isObjectLike(args..), 'Expected');
  //t.equal(isObjectLike(args..), 'Expected');
  //t.false(isObjectLike(args..), 'Expected');
  //t.throws(isObjectLike(args..), 'Expected');
  t.end();
});
