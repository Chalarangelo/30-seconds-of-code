const test = require('tape');
const isDivisible = require('./isDivisible.js');

test('Testing isDivisible', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isDivisible === 'function', 'isDivisible is a Function');
  t.equal(isDivisible(6, 3), true, 'The number 6 is divisible by 3');
  //t.deepEqual(isDivisible(args..), 'Expected');
  //t.false(isDivisible(args..), 'Expected');
  //t.throws(isDivisible(args..), 'Expected');
  t.end();
});