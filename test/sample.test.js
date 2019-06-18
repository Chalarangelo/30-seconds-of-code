const {sample} = require('./_30s.js');

test('sample is a Function', () => {
  expect(sample).toBeInstanceOf(Function);
});
const arr = [3, 7, 9, 11];
test('Returns a random element from the array', () => {
  expect(arr.includes(sample(arr))).toBeTruthy();
});
test('Works for single-element arrays', () => {
  expect(sample([1])).toBe(1);
});
test('Returns undefined for empty array', () => {
  expect(sample([])).toBe(undefined);
});
