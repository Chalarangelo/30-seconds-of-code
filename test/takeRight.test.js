const expect = require('expect');
const {takeRight} = require('./_30s.js');

test('takeRight is a Function', () => {
  expect(takeRight).toBeInstanceOf(Function);
});
test('Returns an array with n elements removed from the end', () => {
  expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
});
test('Returns an array with n elements removed from the end', () => {
  expect(takeRight([1, 2, 3])).toEqual([3]);
});
