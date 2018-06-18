const expect = require('expect');
const toSafeInteger = require('./toSafeInteger.js');

test('Testing toSafeInteger', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toSafeInteger === 'function').toBeTruthy();
  expect(Number(toSafeInteger(3.2))).toBeTruthy();
  expect(toSafeInteger(3.2)).toBe(3);
  expect(toSafeInteger('4.2')).toBe(4);
  expect(toSafeInteger(4.6)).toBe(5);
  expect(toSafeInteger([])).toBe(0);
  expect(isNaN(toSafeInteger([1.5, 3124]))).toBeTruthy();
  expect(isNaN(toSafeInteger('string'))).toBeTruthy();
  expect(isNaN(toSafeInteger({}))).toBeTruthy();
  expect(isNaN(toSafeInteger())).toBeTruthy();
  expect(toSafeInteger(Infinity)).toBe(9007199254740991);

  let start = new Date().getTime();
  toSafeInteger(3.2);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
