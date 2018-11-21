const expect = require('expect');
const { isNegativeZero } = require('._30s.js');

test('isNegativeZero is a Function', () => {
  expect(isNegativeZero).toBeInstanceOf(Function);
});
test('0 is not a -0', () => {
  expect(isNegativeZero(0)).toBeFalsy();
});
test('-0 is a negative zero', () => {
  expect(isNegativeZero(-0)).toBeTruthy();
});
test('1 is not a negative zero', () => {
  expect(isNegativeZero(1)).toBeFalsy();
});
