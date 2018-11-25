const expect = require('expect');
const {squareSum} = require('./_30s.js');

test('squareSum is a Function', () => {
  expect(squareSum).toBeInstanceOf(Function);
});
test('squareSum returns the proper result', () => {
  expect(squareSum(2, 3, 4)).toBe(29);
});
