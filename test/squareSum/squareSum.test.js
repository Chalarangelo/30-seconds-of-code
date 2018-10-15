const expect = require('expect');
const squareSum = require('./squareSum.js');

test('squareSum is a Function', () => {
  expect(squareSum).toBeInstanceOf(Function);
});
test('Returns the sum of squares of numbers in an array', () => {
  expect(reduceWhich([1, 3, 2])).toBe(14);
});
