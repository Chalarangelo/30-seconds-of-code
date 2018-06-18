const expect = require('expect');
const isNull = require('./isNull.js');

test('Testing isNull', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isNull === 'function').toBeTruthy();
  expect(isNull(null)).toBe(true);
  expect(isNull(NaN)).toBe(false);
});