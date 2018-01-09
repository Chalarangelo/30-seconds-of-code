const test = require('tape');
const reverseString = require('./reverseString.js');

test('Testing reverseString', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof reverseString === 'function', 'reverseString is a Function');
	//t.deepEqual(reverseString(args..), 'Expected');
	//t.equal(reverseString(args..), 'Expected');
	//t.false(reverseString(args..), 'Expected');
	//t.throws(reverseString(args..), 'Expected');
	t.end();
});