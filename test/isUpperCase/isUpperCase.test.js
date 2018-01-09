const test = require('tape');
const isUpperCase = require('./isUpperCase.js');

test('Testing isUpperCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isUpperCase === 'function', 'isUpperCase is a Function');
	//t.deepEqual(isUpperCase(args..), 'Expected');
	//t.equal(isUpperCase(args..), 'Expected');
	//t.false(isUpperCase(args..), 'Expected');
	//t.throws(isUpperCase(args..), 'Expected');
	t.end();
});