const expect = require('expect');
const isArrayLike = require('./isArrayLike.js');

test('isArrayLike is a Function', () => {
  expect(isArrayLike).toBeInstanceOf(Function);
});
test('Returns true for a string', () => {
  expect(isArrayLike('abc')).toBeTruthy();
});
test('Returns true for an array', () => {
  expect(isArrayLike([1, 2, 3])).toBeTruthy();
});
test('Returns false for null', () => {
  expect(isArrayLike(null)).toBeFalsy();
});
