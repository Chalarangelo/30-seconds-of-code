const {isPlainObject} = require('./_30s.js');

test('isPlainObject is a Function', () => {
  expect(isPlainObject).toBeInstanceOf(Function);
});
test('Returns true for a plain object', () => {
  expect(isPlainObject({ a: 1 })).toBeTruthy();
});
test('Returns false for a Map (example of non-plain object)', () => {
  expect(isPlainObject(new Map())).toBeFalsy();
});
