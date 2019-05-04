const expect = require('expect');
const {filterNonUnique} = require('./_30s.js');

test('filterNonUnique is a Function', () => {
  expect(filterNonUnique).toBeInstanceOf(Function);
});
test('Filters out the non-unique values in an array', () => {
  expect(filterNonUnique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 3, 5]);
});
test('Works with multiple types of values in the same array', () => {
  expect(filterNonUnique([1, 2, 2, 3, 4, 4, 5, true, 'repeated text', 'repeated text', 'unique text'])).toEqual([1, 3, 5, true, 'unique text']);
});
test('No error on empty array', () => {
  expect(filterNonUnique([])).toEqual([]);
});

