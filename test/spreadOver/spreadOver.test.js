const test = require('tape');
const spreadOver = require('./spreadOver.js');

test('Testing spreadOver', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof spreadOver === 'function', 'spreadOver is a Function');
	const arrayMax = spreadOver(Math.max);
	t.equal(arrayMax([1, 2, 3]), 3, "Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.");
	//t.deepEqual(spreadOver(args..), 'Expected');
	//t.equal(spreadOver(args..), 'Expected');
	//t.false(spreadOver(args..), 'Expected');
	//t.throws(spreadOver(args..), 'Expected');
	t.end();
});