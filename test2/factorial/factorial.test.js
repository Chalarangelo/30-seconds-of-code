const expect = require('expect');
const factorial = require('./factorial.js');

test('Testing factorial', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof factorial === 'function').toBeTruthy();
  expect(factorial(6)).toBe(720);
  expect(factorial(0)).toBe(1);
  expect(factorial(1)).toBe(1);
  expect(factorial(4)).toBe(24);
  expect(factorial(10)).toBe(3628800);
});