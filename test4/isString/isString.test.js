const expect = require('expect');
const isString = require('./isString.js');

test('Testing isString', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isString === 'function').toBeTruthy();
  expect(isString('foo')).toBe(true);
  expect(isString('10')).toBe(true);
  expect(isString('')).toBe(true);
  expect(isString(10)).toBe(false);
  expect(isString(true)).toBe(false);
});