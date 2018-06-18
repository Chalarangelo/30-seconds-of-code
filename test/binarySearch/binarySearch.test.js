const expect = require('expect');
const binarySearch = require('./binarySearch.js');

test('binarySearch is a Function', () => {
  expect(binarySearch).toBeInstanceOf(Function);
});
test('Finds item in array', () => {
  expect(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6)).toBe(2);
});
test('Returns -1 when not found', () => {
  expect(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21)).toBe(-1);
});
test('Works with empty arrays', () => {
  expect(binarySearch([], 21)).toBe(-1);
});
test('Works for one element arrays', () => {
  expect(binarySearch([1], 1)).toBe(0);
});
