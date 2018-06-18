const expect = require('expect');
const is = require('./is.js');

test('Testing is', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof is === 'function').toBeTruthy();
  expect(is(Array, [1])).toBeTruthy();
  expect(is(Array, [])).toBeTruthy();
  expect(is(Array, {})).toBeFalsy();
  expect(is(Object, {})).toBeTruthy();
  expect(is(Map, new Map())).toBeTruthy();
  expect(is(RegExp, /./g)).toBeTruthy();
  expect(is(Set, new Set())).toBeTruthy();
  expect(is(WeakMap, new WeakMap())).toBeTruthy();
  expect(is(WeakSet, new WeakSet())).toBeTruthy();
  expect(is(String, '')).toBeTruthy();
  expect(is(String, new String(''))).toBeTruthy();
  expect(is(Number, 1)).toBeTruthy();
  expect(is(Number, new Number('10'))).toBeTruthy();
  expect(is(Boolean, false)).toBeTruthy();
  expect(is(Boolean, new Boolean(false))).toBeTruthy();
  expect(is(Function, () => null)).toBeTruthy();
});
