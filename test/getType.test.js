const {getType} = require('./_30s.js');

test('getType is a Function', () => {
  expect(getType).toBeInstanceOf(Function);
});
test('Returns the native type of a value', () => {
  expect(getType(new Set([1, 2, 3]))).toBe('set');
});
test('Returns null for null', () => {
  expect(getType(null)).toBe('null');
});
test('Returns undefined for undefined', () => {
  expect(getType(undefined)).toBe('undefined');
});
