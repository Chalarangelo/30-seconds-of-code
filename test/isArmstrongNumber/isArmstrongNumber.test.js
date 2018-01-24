const test = require('tape');
const isArmstrongNumber = require('./isArmstrongNumber.js');

test('Testing isArmstrongNumber', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isArmstrongNumber === 'function', 'isArmstrongNumber is a Function');
  //t.deepEqual(isArmstrongNumber(args..), 'Expected');
  //t.equal(isArmstrongNumber(args..), 'Expected');
  //t.false(isArmstrongNumber(args..), 'Expected');
  //t.throws(isArmstrongNumber(args..), 'Expected');
  t.end();
});