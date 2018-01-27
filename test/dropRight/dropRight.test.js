const test = require('tape');
const dropRight = require('./dropRight.js');

test('Testing dropRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof dropRight === 'function', 'dropRight is a Function');
  t.deepEqual(dropRight([1, 2, 3]), [1,2], "Returns a new array with n elements removed from the right");
  t.deepEqual(dropRight([1, 2, 3], 2), [1], "Returns a new array with n elements removed from the right");
  t.deepEqual(dropRight([1, 2, 3], 42), [], "Returns a new array with n elements removed from the right");
  //t.deepEqual(dropRight(args..), 'Expected');
  //t.equal(dropRight(args..), 'Expected');
  //t.false(dropRight(args..), 'Expected');
  //t.throws(dropRight(args..), 'Expected');
  t.end();
});