const {weightedSample} = require('./_30s.js');

test('sample is a Function', () => {
  expect(weightedSample).toBeInstanceOf(Function);
});
const arr = [3, 7, 9, 11];
const weights = [0.1, 0.2, 0.6, 0.1];
test('Returns a random element from the array', () => {
  expect(arr.includes(weightedSample(arr, weights))).toBeTruthy();
});
test('Works for single-element arrays', () => {
  expect(weightedSample([1], [1])).toBe(1);
});
test('Returns undefined for empty array', () => {
  expect(weightedSample([], [])).toBe(undefined);
});
