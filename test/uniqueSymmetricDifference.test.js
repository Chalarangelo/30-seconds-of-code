const expect = require('expect');
const {uniqueSymmetricDifference} = require('./_30s.js');

test('uniqueSymmetricDifference is a Function', () => {
  expect(uniqueSymmetricDifference).toBeInstanceOf(Function);
});
test('Returns the symmetric difference between two arrays.', () => {
  expect(uniqueSymmetricDifference([1, 2, 3], [1, 2, 4])).toEqual([3, 4]);
});
test('Does not return duplicates from one array', () => {
  expect(uniqueSymmetricDifference([1, 2, 2], [1, 3, 1])).toEqual([2, 3]);
});
