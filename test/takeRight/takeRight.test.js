const test = require('tape');
const takeRight = require('./takeRight.js');

test('Testing takeRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof takeRight === 'function', 'takeRight is a Function');
  t.deepEqual(takeRight([1, 2, 3], 2), [2, 3], "Returns an array with n elements removed from the end");
  t.deepEqual(takeRight([1, 2, 3]), [3], "Returns an array with n elements removed from the end");
  //t.deepEqual(takeRight(args..), 'Expected');
  //t.equal(takeRight(args..), 'Expected');
  //t.false(takeRight(args..), 'Expected');
  //t.throws(takeRight(args..), 'Expected');
  t.end();
});