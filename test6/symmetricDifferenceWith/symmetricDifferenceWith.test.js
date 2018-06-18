const expect = require('expect');
const symmetricDifferenceWith = require('./symmetricDifferenceWith.js');

test('Testing symmetricDifferenceWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof symmetricDifferenceWith === 'function').toBeTruthy();
  expect(symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
)).toEqual([1, 1.2, 3.9]);
});
