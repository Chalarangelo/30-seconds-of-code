const expect = require('expect');
const symmetricDifferenceBy = require('./symmetricDifferenceBy.js');

test('Testing symmetricDifferenceBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof symmetricDifferenceBy === 'function').toBeTruthy();
  expect(symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([ 1.2, 3.4 ]);
});
