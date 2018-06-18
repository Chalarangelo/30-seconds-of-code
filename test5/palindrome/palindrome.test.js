const expect = require('expect');
const palindrome = require('./palindrome.js');

test('Testing palindrome', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof palindrome === 'function').toBeTruthy();
  expect(palindrome('taco cat')).toBe(true);
  expect(palindrome('foobar')).toBe(false);
});