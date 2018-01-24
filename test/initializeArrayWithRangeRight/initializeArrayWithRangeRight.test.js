const test = require('tape');
const initializeArrayWithRangeRight = require('./initializeArrayWithRangeRight.js');

test('Testing initializeArrayWithRangeRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof initializeArrayWithRangeRight === 'function', 'initializeArrayWithRangeRight is a Function');
  //t.deepEqual(initializeArrayWithRangeRight(args..), 'Expected');
  //t.equal(initializeArrayWithRangeRight(args..), 'Expected');
  //t.false(initializeArrayWithRangeRight(args..), 'Expected');
  //t.throws(initializeArrayWithRangeRight(args..), 'Expected');
  t.end();
});