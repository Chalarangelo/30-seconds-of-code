const {isContainedIn} = require('./_30s.js');

test('isContainedIn is a Function', () => {
  expect(isContainedIn).toBeInstanceOf(Function);
});
test('returns true for arrays with same contents', () => {
  expect(isContainedIn([1, 2, 3], [2, 3, 1])).toBeTruthy();
});
test('returns true for arrays with correct contents', () => {
  expect(isContainedIn([1, 2], [2, 3, 1])).toBeTruthy();
});
test('returns false for arrays with different contents', () => {
  expect(isContainedIn([1, 4], [2, 3, 1])).toBeFalsy();
});
test('returns false for arrays with different contents', () => {
  expect(isContainedIn([1, 2, 3], [2, 1, 6])).toBeFalsy();
});
