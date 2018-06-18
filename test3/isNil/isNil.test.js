const expect = require('expect');
const isNil = require('./isNil.js');

test('Testing isNil', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isNil === 'function').toBeTruthy();
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
  expect(isNil('')).toBe(false);
});
