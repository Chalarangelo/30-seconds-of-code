const expect = require('expect');
const getType = require('./getType.js');

test('getType is a Function', () => {
  expect(getType).toBeInstanceOf(Function);
});
test('Returns the native type of a value', () => {
  expect(getType(new Set([1, 2, 3]))).toBe('set');
});
