const test = require('tape');
const factorial = require('./factorial.js');

test('Testing factorial', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof factorial === 'function', 'factorial is a Function');
	//t.deepEqual(factorial(args..), 'Expected');
	//t.equal(factorial(args..), 'Expected');
	//t.false(factorial(args..), 'Expected');
	//t.throws(factorial(args..), 'Expected');
	t.end();
});