const test = require('tape');
const toSafeInteger = require('./toSafeInteger.js');

test('Testing toSafeInteger', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toSafeInteger === 'function', 'toSafeInteger is a Function');
	//t.deepEqual(toSafeInteger(args..), 'Expected');
	//t.equal(toSafeInteger(args..), 'Expected');
	//t.false(toSafeInteger(args..), 'Expected');
	//t.throws(toSafeInteger(args..), 'Expected');
	t.end();
});