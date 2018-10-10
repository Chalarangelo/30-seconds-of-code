const expect = require('expect');
const {isString} = require('./_30s.js');

test('isString is a Function', () => {
  expect(isString).toBeInstanceOf(Function);
});
test('foo is a string', () => {
  expect(isString('foo')).toBeTruthy();
});
test('"10" is a string', () => {
  expect(isString('10')).toBeTruthy();
});
test('Empty string is a string', () => {
  expect(isString('')).toBeTruthy();
});
test('10 is not a string', () => {
  expect(isString(10)).toBeFalsy();
});
test('true is not string', () => {
  expect(isString(true)).toBeFalsy();
});
