const {symmetricDifference} = require('./_30s.js');

test('symmetricDifference is a Function', () => {
  expect(symmetricDifference).toBeInstanceOf(Function);
});
test('Returns the symmetric difference between two arrays.', () => {
  expect(symmetricDifference([1, 2, 3], [1, 2, 4])).toEqual([3, 4]);
});
test('Returns duplicates from one array', () => {
  expect(symmetricDifference([1, 2, 2], [1, 3, 1])).toEqual([2, 2, 3]);
});
