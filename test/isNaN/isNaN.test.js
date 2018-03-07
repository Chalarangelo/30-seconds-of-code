const test = require('tape');
const isNaN = require('./isNaN.js');

test('Testing isNaN', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isNaN === 'function', 'isNaN is a Function');
  t.equal(isNaN(NaN), true, "checks if NaN is NaN");
  t.equal(isNaN("1"), false, "checks if NaN is '1'");
  t.equal(isNaN(1), false, "checks if NaN is 1");
  t.equal(isNaN(undefined), false, "cheks if NaN is undefined");
  //t.deepEqual(isNaN(args..), 'Expected');
  //t.equal(isNaN(args..), 'Expected');
  //t.false(isNaN(args..), 'Expected');
  //t.throws(isNaN(args..), 'Expected');
  t.end();
});