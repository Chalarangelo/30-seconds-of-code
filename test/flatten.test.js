const expect = require('expect');
const {flatten} = require('./_30s.js');

test('flatten is a Function', () => {
  expect(flatten).toBeInstanceOf(Function);
});
test('Flattens an array', () => {
  expect(flatten([1, [2], 3, 4])).toEqual([1, 2, 3, 4]);
});
test('Flattens an array', () => {
  expect(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2)).toEqual([1, 2, 3, [4, 5], 6, 7, 8]);
});
