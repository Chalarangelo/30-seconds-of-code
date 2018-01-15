const test = require('tape');
const factorial = require('./factorial.js');

test('Testing factorial', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof factorial === 'function', 'factorial is a Function');
	t.equal(factorial(6), 720, "Calculates the factorial of 720");
	t.equal(factorial(0), 1, "Calculates the factorial of 0");
	t.equal(factorial(1), 1, "Calculates the factorial of 1");
	t.equal(factorial(4), 24, "Calculates the factorial of 4");
	t.equal(factorial(10), 3628800, "Calculates the factorial of 10");
	//t.deepEqual(factorial(args..), 'Expected');
	//t.equal(factorial(args..), 'Expected');
	//t.false(factorial(args..), 'Expected');
	//t.throws(factorial(args..), 'Expected');
	t.end();
});