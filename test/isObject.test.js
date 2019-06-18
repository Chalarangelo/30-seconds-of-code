const {isObject} = require('./_30s.js');

test('isObject is a Function', () => {
  expect(isObject).toBeInstanceOf(Function);
});
test('isObject([1, 2, 3, 4]) is a object', () => {
  expect(isObject([1, 2, 3, 4])).toBeTruthy();
});
test('isObject([]) is a object', () => {
  expect(isObject([])).toBeTruthy();
});
test('isObject({ a:1 }) is a object', () => {
  expect(isObject({ a: 1 })).toBeTruthy();
});
test('isObject(true) is not a object', () => {
  expect(isObject(true)).toBeFalsy();
});
