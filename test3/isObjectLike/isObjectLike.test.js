const expect = require('expect');
const isObjectLike = require('./isObjectLike.js');

test('Testing isObjectLike', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isObjectLike === 'function').toBeTruthy();
  expect(isObjectLike({})).toBe(true);
  expect(isObjectLike([1, 2, 3])).toBe(true);
  expect(isObjectLike(x => x)).toBe(false);
  expect(isObjectLike(null)).toBe(false);
});
