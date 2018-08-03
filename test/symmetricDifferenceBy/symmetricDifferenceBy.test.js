const expect = require('expect');
const symmetricDifferenceBy = require('./symmetricDifferenceBy.js');

test('symmetricDifferenceBy is a Function', () => {
  expect(symmetricDifferenceBy).toBeInstanceOf(Function);
});
test('Returns the symmetric difference between two arrays, after applying the provided function to each array element of both', () => {
  expect(symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2, 3.4]);
});
