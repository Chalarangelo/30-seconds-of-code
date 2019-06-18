const {memoize} = require('./_30s.js');

test('memoize is a Function', () => {
  expect(memoize).toBeInstanceOf(Function);
});
const f = x => x * x;
const square = memoize(f);
test('Function works properly', () => {
  expect(square(2)).toBe(4);
});
test('Function works properly', () => {
  expect(square(3)).toBe(9);
});
test('Function works properly, cache stores values (coverage)', () => {
  expect(square(3)).toBe(9);
});
test('Cache stores values', () => {
  expect(Array.from(square.cache)).toEqual([[2, 4], [3, 9]]);
});
