const expect = require('expect');
const {permutations} = require('./_30s.js');

test('permutations is a Function', () => {
  expect(permutations).toBeInstanceOf(Function);
});
test('Generates all permutations of an array', () => {
  expect(permutations([1, 33, 5])).toEqual([
    [1, 33, 5],
    [1, 5, 33],
    [33, 1, 5],
    [33, 5, 1],
    [5, 1, 33],
    [5, 33, 1]
  ]);
});
