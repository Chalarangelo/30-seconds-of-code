const test = require('tape');
const fibonacci = require('./fibonacci.js');

test('Testing fibonacci', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof fibonacci === 'function', 'fibonacci is a Function');
	t.deepEqual(fibonacci(6), [0, 1, 1, 2, 3, 5], "Generates an array, containing the Fibonacci sequence");
	//t.deepEqual(fibonacci(args..), 'Expected');
	//t.equal(fibonacci(args..), 'Expected');
	//t.false(fibonacci(args..), 'Expected');
	//t.throws(fibonacci(args..), 'Expected');
	t.end();
});