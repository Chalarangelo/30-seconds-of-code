const test = require('tape');
const lowercaseKeys = require('./lowercaseKeys.js');

test('Testing lowercaseKeys', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof lowercaseKeys === 'function', 'lowercaseKeys is a Function');
	//t.deepEqual(lowercaseKeys(args..), 'Expected');
	//t.equal(lowercaseKeys(args..), 'Expected');
	//t.false(lowercaseKeys(args..), 'Expected');
	//t.throws(lowercaseKeys(args..), 'Expected');
	t.end();
});