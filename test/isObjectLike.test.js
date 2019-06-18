const {isObjectLike} = require('./_30s.js');

test('isObjectLike is a Function', () => {
  expect(isObjectLike).toBeInstanceOf(Function);
});
test('Returns true for an object', () => {
  expect(isObjectLike({})).toBeTruthy();
});
test('Returns true for an array', () => {
  expect(isObjectLike([1, 2, 3])).toBeTruthy();
});
test('Returns false for a function', () => {
  expect(isObjectLike(x => x)).toBeFalsy();
});
test('Returns false for null', () => {
  expect(isObjectLike(null)).toBeFalsy();
});
