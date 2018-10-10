const expect = require('expect');
const {all} = require('./_30s.js');

test('all is a Function', () => {
  expect(all).toBeInstanceOf(Function);
});
test('Returns true for arrays with no falsey values', () => {
  expect(all([4, 1, 2, 3])).toBeTruthy();
});
test('Returns false for arrays with 0', () => {
  expect(all([0, 1])).toBeFalsy();
});
test('Returns false for arrays with NaN', () => {
  expect(all([NaN, 1])).toBeFalsy();
});
test('Returns false for arrays with undefined', () => {
  expect(all([undefined, 1])).toBeFalsy();
});
test('Returns false for arrays with null', () => {
  expect(all([null, 1])).toBeFalsy();
});
test('Returns false for arrays with empty strings', () => {
  expect(all(['', 1])).toBeFalsy();
});
test('Returns true with predicate function', () => {
  expect(all([4, 1, 2, 3], x => x >= 1)).toBeTruthy();
});
test('Returns false with a predicate function', () => {
  expect(all([0, 1], x => x >= 1)).toBeFalsy();
});
