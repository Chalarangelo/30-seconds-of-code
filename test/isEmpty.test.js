const {isEmpty} = require('./_30s.js');

test('isEmpty is a Function', () => {
  expect(isEmpty).toBeInstanceOf(Function);
});
test('Returns true for empty Map', () => {
  expect(isEmpty(new Map())).toBeTruthy();
});
test('Returns true for empty Set', () => {
  expect(isEmpty(new Set())).toBeTruthy();
});
test('Returns true for empty array', () => {
  expect(isEmpty([])).toBeTruthy();
});
test('Returns true for empty object', () => {
  expect(isEmpty({})).toBeTruthy();
});
test('Returns true for empty string', () => {
  expect(isEmpty('')).toBeTruthy();
});
test('Returns false for non-empty array', () => {
  expect(isEmpty([1, 2])).toBeFalsy();
});
test('Returns false for non-empty object', () => {
  expect(isEmpty({ a: 1, b: 2 })).toBeFalsy();
});
test('Returns false for non-empty string', () => {
  expect(isEmpty('text')).toBeFalsy();
});
test('Returns true - type is not considered a collection', () => {
  expect(isEmpty(123)).toBeTruthy();
});
test('Returns true - type is not considered a collection', () => {
  expect(isEmpty(true)).toBeTruthy();
});
