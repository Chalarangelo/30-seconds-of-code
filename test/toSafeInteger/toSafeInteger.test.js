const expect = require('expect');
const toSafeInteger = require('./toSafeInteger.js');


  test('toSafeInteger is a Function', () => {
  expect(toSafeInteger).toBeInstanceOf(Function);
});
  test('Number(toSafeInteger(3.2)) is a number', () => {
  expect(Number(toSafeInteger(3.2))).toBeTruthy();
});
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
  test('toSafeInteger(3.2) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  

