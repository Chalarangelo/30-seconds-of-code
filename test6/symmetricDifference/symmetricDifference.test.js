const expect = require('expect');
const symmetricDifference = require('./symmetricDifference.js');

test('Testing symmetricDifference', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof symmetricDifference === 'function').toBeTruthy();
  expect(symmetricDifference([1, 2, 3], [1, 2, 4])).toEqual([3, 4]);
});