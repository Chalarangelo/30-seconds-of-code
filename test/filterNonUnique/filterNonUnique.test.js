const expect = require('expect');
const filterNonUnique = require('./filterNonUnique.js');

test('filterNonUnique is a Function', () => {
  expect(filterNonUnique).toBeInstanceOf(Function);
});
test('Filters out the non-unique values in an array', () => {
  expect(filterNonUnique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 3, 5]);
});
