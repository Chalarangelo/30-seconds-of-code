const test = require('tape');
const toSafeInteger = require('./toSafeInteger.js');

test('Testing toSafeInteger', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toSafeInteger === 'function', 'toSafeInteger is a Function');
  t.equal(toSafeInteger(3.2), 3, "Converts a value to a safe integer");
  t.equal(toSafeInteger('4.2'), 4, "Converts a value to a safe integer");
  t.equal(toSafeInteger(4.6), 5, "Converts a value to a safe integer");
  t.equal(toSafeInteger(1.5), 2, "Converts a value to a safe integer");
  t.equal(toSafeInteger(Infinity), 9007199254740991, "Converts a value to a safe integer");
  //t.deepEqual(toSafeInteger(args..), 'Expected');
  //t.equal(toSafeInteger(args..), 'Expected');
  //t.false(toSafeInteger(args..), 'Expected');
  //t.throws(toSafeInteger(args..), 'Expected');
  t.end();
});