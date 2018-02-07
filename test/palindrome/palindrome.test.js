const test = require('tape');
const palindrome = require('./palindrome.js');

test('Testing palindrome', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof palindrome === 'function', 'palindrome is a Function');
  t.equal(palindrome('taco cat'), true, "Given string is a palindrome");
  t.equal(palindrome('foobar'), false, "Given string is not a palindrome");
  //t.deepEqual(palindrome(args..), 'Expected');
  //t.equal(palindrome(args..), 'Expected');
  //t.false(palindrome(args..), 'Expected');
  //t.throws(palindrome(args..), 'Expected');
  t.end();
});