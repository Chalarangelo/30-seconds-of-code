const test = require('tape');
const initializeArrayWithRange = require('./initializeArrayWithRange.js');

test('Testing initializeArrayWithRange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof initializeArrayWithRange === 'function', 'initializeArrayWithRange is a Function');
  t.deepEqual(initializeArrayWithRange(5), [0, 1, 2, 3, 4, 5], "Initializes an array containing the numbers in the specified range");
  //t.deepEqual(initializeArrayWithRange(args..), 'Expected');
  //t.equal(initializeArrayWithRange(args..), 'Expected');
  //t.false(initializeArrayWithRange(args..), 'Expected');
  //t.throws(initializeArrayWithRange(args..), 'Expected');
  t.end();
});