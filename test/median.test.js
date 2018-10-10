const expect = require('expect');
const {median} = require('./_30s.js');

test('median is a Function', () => {
  expect(median).toBeInstanceOf(Function);
});
test('Returns the median of an array of numbers', () => {
  expect(median([5, 6, 50, 1, -5])).toBe(5);
});
test('Returns the median of an array of numbers', () => {
  expect(median([1, 2, 3])).toBe(2);
});
