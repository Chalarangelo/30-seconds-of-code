const expect = require('expect');
const {everyNth} = require('./_30s.js');

test('everyNth is a Function', () => {
  expect(everyNth).toBeInstanceOf(Function);
});
test('Returns every nth element in an array', () => {
  expect(everyNth([1, 2, 3, 4, 5, 6], 2)).toEqual([2, 4, 6]);
});
test('When N is bigger than array size, return nothing', () => {
  expect(everyNth([1, 2, 3, 4], 5)).toEqual([]);
});
test('Works with different variable types in the same array', () => {
  expect(everyNth([1, 'two', 3, false, 5, 6.1], 2)).toEqual(['two', false, 6.1]);
});

