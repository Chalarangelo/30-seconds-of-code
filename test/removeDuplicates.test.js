const expect = require('expect');
const removeDuplicates = require('./_30s.js');

test('removeDuplicates is a Function', () => {
  expect(removeDuplicates).toBeInstanceOf(Function);
});
test('Remove the duplicated occurences from a given array', () => {
  expect(removeDuplicates([0, 1, 2, 0, 0, 3])).toEqual([0, 1, 2, 3]);
});
