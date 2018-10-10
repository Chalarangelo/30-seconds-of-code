const expect = require('expect');
const {isBoolean} = require('./_30s.js');

test('isBoolean is a Function', () => {
  expect(isBoolean).toBeInstanceOf(Function);
});
test('passed value is not a boolean', () => {
  expect(isBoolean(null)).toBeFalsy();
});
test('passed value is not a boolean', () => {
  expect(isBoolean(false)).toBeTruthy();
});
