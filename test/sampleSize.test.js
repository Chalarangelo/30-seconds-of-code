const expect = require('expect');
const {sampleSize} = require('./_30s.js');

test('sampleSize is a Function', () => {
  expect(sampleSize).toBeInstanceOf(Function);
});
const arr = [3, 7, 9, 11];
test('Returns a single element without n specified', () => {
  expect(sampleSize(arr).length).toBe(1);
});
test('Returns a random sample of specified size from an array', () => {
  expect(sampleSize(arr, 2).every(x => arr.includes(x))).toBeTruthy();
});
test('Returns all elements in an array if n >= length', () => {
  expect(sampleSize(arr, 5).length).toBe(4);
});
test('Returns an empty array if original array is empty', () => {
  expect(sampleSize([], 2)).toEqual([]);
});
test('Returns an empty array if n = 0', () => {
  expect(sampleSize(arr, 0)).toEqual([]);
});
