const expect = require('expect');
const palindrome = require('./palindrome.js');


  test('palindrome is a Function', () => {
  expect(palindrome).toBeInstanceOf(Function);
});
  t.equal(palindrome('taco cat'), true, "Given string is a palindrome");
  t.equal(palindrome('foobar'), false, "Given string is not a palindrome");
  
