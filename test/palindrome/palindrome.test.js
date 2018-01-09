const test = require('tape');
const palindrome = require('./palindrome.js');

test('Testing palindrome', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof palindrome === 'function', 'palindrome is a Function');
	//t.deepEqual(palindrome(args..), 'Expected');
	//t.equal(palindrome(args..), 'Expected');
	//t.false(palindrome(args..), 'Expected');
	//t.throws(palindrome(args..), 'Expected');
	t.end();
});