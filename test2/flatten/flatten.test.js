const expect = require('expect');
const flatten = require('./flatten.js');

test('Testing flatten', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof flatten === 'function').toBeTruthy();
  expect(flatten([1, [2], 3, 4])).toEqual([1, 2, 3, 4]);
  expect(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2)).toEqual([1, 2, 3, [4, 5], 6, 7, 8]);
});