const expect = require('expect');
const isPrimitive = require('./isPrimitive.js');

test('isPrimitive is a Function', () => {
  expect(isPrimitive).toBeInstanceOf(Function);
});
test('isPrimitive(null) is primitive', () => {
  expect(isPrimitive(null)).toBeTruthy();
});
test('isPrimitive(undefined) is primitive', () => {
  expect(isPrimitive(undefined)).toBeTruthy();
});
test('isPrimitive(string) is primitive', () => {
  expect(isPrimitive('string')).toBeTruthy();
});
test('isPrimitive(true) is primitive', () => {
  expect(isPrimitive(true)).toBeTruthy();
});
test('isPrimitive(50) is primitive', () => {
  expect(isPrimitive(50)).toBeTruthy();
});
test('isPrimitive('Hello') is primitive', () => {
  expect(isPrimitive('Hello')).toBeTruthy();
});
test('isPrimitive(false) is primitive', () => {
  expect(isPrimitive(false)).toBeTruthy();
});
test('isPrimitive(Symbol()) is primitive', () => {
  expect(isPrimitive(Symbol())).toBeTruthy();
});
test('isPrimitive([1, 2, 3]) is not primitive', () => {
  expect(isPrimitive([1, 2, 3])).toBeFalsy();
});
test('isPrimitive({ a: 123 }) is not primitive', () => {
  expect(isPrimitive({ a: 123 })).toBeFalsy();
});
let start = new Date().getTime();
isPrimitive({ a: 123
let end = new Date().getTime();
test('isPrimitive({ a: 123 }) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
