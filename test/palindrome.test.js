const expect = require('expect');
const {palindrome} = require('./_30s.js');

test('palindrome is a Function', () => {
  expect(palindrome).toBeInstanceOf(Function);
});
test('Given string is a palindrome', () => {
  expect(palindrome('taco cat')).toBeTruthy();
});
test('Given string is not a palindrome', () => {
  expect(palindrome('foobar')).toBeFalsy();
});
