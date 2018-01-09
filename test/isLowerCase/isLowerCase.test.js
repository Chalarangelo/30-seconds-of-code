const test = require('tape');
const isLowerCase = require('./isLowerCase.js');

test('Testing isLowerCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isLowerCase === 'function', 'isLowerCase is a Function');
	//t.deepEqual(isLowerCase(args..), 'Expected');
	//t.equal(isLowerCase(args..), 'Expected');
	//t.false(isLowerCase(args..), 'Expected');
	//t.throws(isLowerCase(args..), 'Expected');
	t.end();
});