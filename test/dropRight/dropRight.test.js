const expect = require('expect');
const dropRight = require('./dropRight.js');

test('dropRight is a Function', () => {
  expect(dropRight).toBeInstanceOf(Function);
});
test('Returns a new array with n elements removed from the right', () => {
  expect(dropRight([1, 2, 3])).toEqual([1, 2]);
});
test('Returns a new array with n elements removed from the right', () => {
  expect(dropRight([1, 2, 3], 2)).toEqual([1]);
});
test('Returns a new array with n elements removed from the right', () => {
  expect(dropRight([1, 2, 3], 42)).toEqual([]);
});
