const expect = require('expect');
const isBoolean = require('./isBoolean.js');

test('Testing isBoolean', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isBoolean === 'function').toBeTruthy();
  expect(isBoolean(null)).toBe(false);
  expect(isBoolean(false)).toBe(true);
});