const expect = require('expect');
const {nthElement} = require('./_30s.js');

test('nthElement is a Function', () => {
  expect(nthElement).toBeInstanceOf(Function);
});
test('Returns the nth element of an array.', () => {
  expect(nthElement(['a', 'b', 'c'], 1)).toBe('b');
});
test('Returns the nth element of an array.', () => {
  expect(nthElement(['a', 'b', 'c'], -3)).toBe('a');
});
test('Returns the nth element of an array.', () => {
  expect(nthElement(['a', 'b', 'c'], -1)).toBe('c');
});
test('Returns the nth element of an array.', () => {
  expect(nthElement(['a', 'b', 'c'])).toBe('a');
});
