const expect = require('expect');
const palindrome = require('./palindrome.js');


  test('palindrome is a Function', () => {
  expect(palindrome).toBeInstanceOf(Function);
});
  test('Given string is a palindrome', () => {
  expect(palindrome('taco cat')).toBe(true)
});
  test('Given string is not a palindrome', () => {
  expect(palindrome('foobar')).toBe(false)
});
  
