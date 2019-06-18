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
test('Works with different size arrays', () => {
  expect(uniqueSymmetricDifference([1, 2, 2, 4], [1, 3, 1, 4, 5, 6])).toEqual([2, 3, 5, 6]);
});
test('Works with different types in the same array', () => {
  expect(uniqueSymmetricDifference([1, 2, 'duplicate text', 'unique text'], [1, 3, 'duplicate text'])).toEqual([2, 'unique text', 3]);
});
test('Works when one array is empty', () => {
  expect(uniqueSymmetricDifference([1, 2, 2, 3], [])).toEqual([1, 2, 3]);
});

