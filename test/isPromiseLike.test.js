const expect = require('expect');
const {isPromiseLike} = require('./_30s.js');

test('isPromiseLike is a Function', () => {
  expect(isPromiseLike).toBeInstanceOf(Function);
});
test('Returns true for a promise-like object', () => {
  expect(
    isPromiseLike({
      then: function() {
        return '';
      }
    })
  ).toBeTruthy();
});
test('Returns false for an empty object', () => {
  expect(isPromiseLike({})).toBeFalsy();
});
test('Returns false for a normal function', () => {
  expect(isPromiseLike(Math.max)).toBeFalsy();
});
