const {squareSum} = require('./_30s.js');

test('squareSum is a Function', () => {
  expect(squareSum).toBeInstanceOf(Function);
});
test('squareSum returns the proper result', () => {
  expect(squareSum(2, 3, 4)).toBe(29);
});

test('works with negative numbers', () => {
  expect(squareSum(-2, 3, -4)).toBe(29);
});

test('NaN when parameters have text', () => {
  expect(squareSum(-2, 3, -4, 'text')).toBe(NaN);
});
