const test = require('tape');
const flatten = require('./flatten.js');

test('Testing flatten', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof flatten === 'function', 'flatten is a Function');
	t.deepEqual(flatten([1, [2], 3, 4]), [1, 2, 3, 4], "Flattens an array");
	//t.deepEqual(flatten(args..), 'Expected');
	//t.equal(flatten(args..), 'Expected');
	//t.false(flatten(args..), 'Expected');
	//t.throws(flatten(args..), 'Expected');
	t.end();
});