const {haveSameContents} = require('./_30s.js');

test('haveSameContents is a Function', () => {
  expect(haveSameContents).toBeInstanceOf(Function);
});
test('returns true for arrays with same contents', () => {
  expect(haveSameContents([1, 2, 3], [2, 3, 1])).toBeTruthy();
});
test('returns false for arrays with different contents', () => {
  expect(haveSameContents([1, 2], [2, 3, 1])).toBeFalsy();
});
test('returns false for arrays with different contents', () => {
  expect(haveSameContents([1, 2, 3], [2, 1])).toBeFalsy();
});
test('returns false for arrays with different contents', () => {
  expect(haveSameContents([1, 2, 3], [2, 1, 6])).toBeFalsy();
});
