const test = require('tape');
const toSafeInteger = require('./toSafeInteger.js');

test('Testing toSafeInteger', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toSafeInteger === 'function', 'toSafeInteger is a Function');
  t.true(Number(toSafeInteger(3.2)), 'Number(toSafeInteger(3.2)) is a number');
  t.equal(toSafeInteger(3.2), 3, "Converts a value to a safe integer");
  t.equal(toSafeInteger('4.2'), 4, "toSafeInteger('4.2') returns 4");
  t.equal(toSafeInteger(4.6), 5, "toSafeInteger(4.6) returns 5");
  t.equal(toSafeInteger([]), 0, "toSafeInteger([]) returns 0");
  t.true(isNaN(toSafeInteger([1.5, 3124])), "isNaN(toSafeInteger([1.5, 3124])) is true");
  t.true(isNaN(toSafeInteger('string')), "isNaN(toSafeInteger('string')) is true");
  t.true(isNaN(toSafeInteger({})), "isNaN(toSafeInteger({})) is true");
  t.true(isNaN(toSafeInteger()), "isNaN(toSafeInteger()) is true");
  t.equal(toSafeInteger(Infinity), 9007199254740991, "toSafeInteger(Infinity) returns 9007199254740991");

  let start = new Date().getTime();
  toSafeInteger(3.2);
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'toSafeInteger(3.2) takes less than 2s to run');
  t.end();
});
