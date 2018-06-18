const expect = require('expect');
const isNumber = require('./isNumber.js');

test('Testing isNumber', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isNumber === 'function').toBeTruthy();
  expect(isNumber(1)).toBe(true);
  expect(isNumber('1')).toBe(false);
});