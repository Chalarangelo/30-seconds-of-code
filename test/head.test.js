const expect = require('expect');
const {head} = require('./_30s.js');

test('head is a Function', () => {
  expect(head).toBeInstanceOf(Function);
});
test('head({ a: 1234}) returns undefined', () => {
  expect(head({ a: 1234 }) === undefined).toBeTruthy();
});
test('head([1, 2, 3]) returns 1', () => {
  expect(head([1, 2, 3])).toBe(1);
});
test('head({ 0: false}) returns false', () => {
  expect(head({ 0: false })).toBeFalsy();
});
test('head(String) returns S', () => {
  expect(head('String')).toBe('S');
});
test('head(null) throws an Error', () => {
  expect(() => {
    head(null);
  }).toThrow();
});
test('head(undefined) throws an Error', () => {
  expect(() => {
    head(undefined);
  }).toThrow();
});
test('head() throws an Error', () => {
  expect(() => {
    head();
  }).toThrow();
});
let start = new Date().getTime();
head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
let end = new Date().getTime();
test('head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
