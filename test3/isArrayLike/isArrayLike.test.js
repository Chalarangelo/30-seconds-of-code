const expect = require('expect');
const isArrayLike = require('./isArrayLike.js');

test('Testing isArrayLike', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isArrayLike === 'function').toBeTruthy();
  expect(isArrayLike('abc')).toBe(true);
  expect(isArrayLike([1,2,3])).toBe(true);
  expect(isArrayLike(null)).toBe(false);
});
