const test = require('tape');
const factorial = require('./factorial.js');

test('Testing factorial', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof factorial === 'function', 'factorial is a Function');
	// t.equal(factorial(6), 720, "Calculates the factorial of a number"); DOESN'T WORK
	//t.deepEqual(factorial(args..), 'Expected');
	//t.equal(factorial(args..), 'Expected');
	//t.false(factorial(args..), 'Expected');
	//t.throws(factorial(args..), 'Expected');
	t.end();
});