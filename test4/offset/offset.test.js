const expect = require('expect');
const offset = require('./offset.js');

test('Testing offset', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof offset === 'function').toBeTruthy();
  expect(offset([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
  expect(offset([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
  expect(offset([1, 2, 3, 4, 5], -2)).toEqual([4, 5, 1, 2, 3]);
  expect(offset([1, 2, 3, 4, 5], 6)).toEqual([1, 2, 3, 4, 5]);
  expect(offset([1, 2, 3, 4, 5], -6)).toEqual([1, 2, 3, 4, 5]);
  expect(offset([], 3)).toEqual([]);
});
