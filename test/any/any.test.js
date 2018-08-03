const expect = require('expect');
const any = require('./any.js');

test('any is a Function', () => {
  expect(any).toBeInstanceOf(Function);
});
test('Returns true for arrays with at least one truthy value', () => {
  expect(any([0, 1, 2, 3])).toBeTruthy();
});
test('Returns false for arrays with no truthy values', () => {
  expect(any([0, 0])).toBeFalsy();
});
test('Returns false for arrays with no truthy values', () => {
  expect(any([NaN, 0, undefined, null, ''])).toBeFalsy();
});
test('Returns true with predicate function', () => {
  expect(any([4, 1, 0, 3], x => x >= 1)).toBeTruthy();
});
test('Returns false with a predicate function', () => {
  expect(any([0, 1], x => x < 0)).toBeFalsy();
});
