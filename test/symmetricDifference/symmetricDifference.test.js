const expect = require('expect');
const symmetricDifference = require('./symmetricDifference.js');

test('symmetricDifference is a Function', () => {
  expect(symmetricDifference).toBeInstanceOf(Function);
});
test('Returns the symmetric difference between two arrays.', () => {
  expect(symmetricDifference([1, 2, 3], [1, 2, 4])).toEqual([3, 4]);
});
