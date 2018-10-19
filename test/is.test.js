const expect = require('expect');
const {is} = require('./_30s.js');

test('is is a Function', () => {
  expect(is).toBeInstanceOf(Function);
});
test('Works for arrays with data', () => {
  expect(is(Array, [1])).toBeTruthy();
});
test('Works for empty arrays', () => {
  expect(is(Array, [])).toBeTruthy();
});
test('Works for arrays, not objects', () => {
  expect(is(Array, {})).toBeFalsy();
});
test('Works for objects', () => {
  expect(is(Object, {})).toBeTruthy();
});
test('Works for maps', () => {
  expect(is(Map, new Map())).toBeTruthy();
});
test('Works for regular expressions', () => {
  expect(is(RegExp, /./g)).toBeTruthy();
});
test('Works for sets', () => {
  expect(is(Set, new Set())).toBeTruthy();
});
test('Works for weak maps', () => {
  expect(is(WeakMap, new WeakMap())).toBeTruthy();
});
test('Works for weak sets', () => {
  expect(is(WeakSet, new WeakSet())).toBeTruthy();
});
test('Works for strings - returns true for primitive', () => {
  expect(is(String, '')).toBeTruthy();
});
test('Works for strings - returns true when using constructor', () => {
  expect(is(String, new String(''))).toBeTruthy();
});
test('Works for numbers - returns true for primitive', () => {
  expect(is(Number, 1)).toBeTruthy();
});
test('Works for numbers - returns true when using constructor', () => {
  expect(is(Number, new Number('10'))).toBeTruthy();
});
test('Works for booleans - returns true for primitive', () => {
  expect(is(Boolean, false)).toBeTruthy();
});
test('Works for booleans - returns true when using constructor', () => {
  expect(is(Boolean, new Boolean(false))).toBeTruthy();
});
test('Works for functions', () => {
  expect(is(Function, () => null)).toBeTruthy();
});
