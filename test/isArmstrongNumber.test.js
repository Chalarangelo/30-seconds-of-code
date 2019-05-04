const expect = require('expect');
const {isArmstrongNumber} = require('./_30s.js');

test('isArmstrongNumber is a Function', () => {
  expect(isArmstrongNumber).toBeInstanceOf(Function);
});
test('isArmstrongNumber returns true', () => {
  expect(isArmstrongNumber(1634)).toBeTruthy();
});
test('isArmstrongNumber returns false', () => {
  expect(isArmstrongNumber(56)).toBeFalsy();
});
