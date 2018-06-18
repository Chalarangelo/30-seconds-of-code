const expect = require('expect');
const isEmpty = require('./isEmpty.js');


  test('isEmpty is a Function', () => {
  expect(isEmpty).toBeInstanceOf(Function);
});
  test('Returns true for empty Map', () => {
  expect(isEmpty(new Map()), true).toBe()
});
  test('Returns true for empty Set', () => {
  expect(isEmpty(new Set()), true).toBe()
});
  test('Returns true for empty array', () => {
  expect(isEmpty([]), true).toBe()
});
  test('Returns true for empty object', () => {
  expect(isEmpty({}), true).toBe()
});
  test('Returns true for empty string', () => {
  expect(isEmpty(''), true).toBe()
});
  test('Returns false for non-empty array', () => {
  expect(isEmpty([1, 2]), false).toBe()
});
  test('Returns false for non-empty object', () => {
  expect(isEmpty({ a: 1, b: 2 }), false).toBe()
});
  test('Returns false for non-empty string', () => {
  expect(isEmpty('text'), false).toBe()
});
  test('Returns true - type is not considered a collection', () => {
  expect(isEmpty(123), true).toBe()
});
  test('Returns true - type is not considered a collection', () => {
  expect(isEmpty(true), true).toBe()
});
  

