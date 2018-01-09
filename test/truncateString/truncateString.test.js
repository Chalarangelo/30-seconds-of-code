const test = require('tape');
const truncateString = require('./truncateString.js');

test('Testing truncateString', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof truncateString === 'function', 'truncateString is a Function');
	//t.deepEqual(truncateString(args..), 'Expected');
	//t.equal(truncateString(args..), 'Expected');
	//t.false(truncateString(args..), 'Expected');
	//t.throws(truncateString(args..), 'Expected');
	t.end();
});