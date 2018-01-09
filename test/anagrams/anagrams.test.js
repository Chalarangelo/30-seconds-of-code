const test = require('tape');
const anagrams = require('./anagrams.js');

test('Testing anagrams', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof anagrams === 'function', 'anagrams is a Function');
	//t.deepEqual(anagrams(args..), 'Expected');
	//t.equal(anagrams(args..), 'Expected');
	//t.false(anagrams(args..), 'Expected');
	//t.throws(anagrams(args..), 'Expected');
	t.end();
});