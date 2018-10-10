const expect = require('expect');
const {last} = require('./_30s.js');

test('last is a Function', () => {
  expect(last).toBeInstanceOf(Function);
});
test('last({ a: 1234}) returns undefined', () => {
  expect(last({ a: 1234 }) === undefined).toBeTruthy();
});
test('last([1, 2, 3]) returns 3', () => {
  expect(last([1, 2, 3])).toBe(3);
});
test('last({ 0: false}) returns undefined', () => {
  expect(last({ 0: false })).toBe(undefined);
});
test('last(String) returns g', () => {
  expect(last('String')).toBe('g');
});
test('last(null) throws an Error', () => {
  expect(() => {
    last(null);
  }).toThrow();
});
test('last(undefined) throws an Error', () => {
  expect(() => {
    last(undefined);
  }).toThrow();
});
test('last() throws an Error', () => {
  expect(() => {
    last();
  }).toThrow();
});
let start = new Date().getTime();
last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
let end = new Date().getTime();
test('last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
