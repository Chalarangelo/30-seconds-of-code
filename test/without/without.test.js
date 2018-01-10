const test = require('tape');
const without = require('./without.js');

test('Testing without', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof without === 'function', 'without is a Function');
	t.deepEqual(without([2, 1, 2, 3], 1, 2), [3], "Filters out the elements of an array, that have one of the specified values.");
	//t.deepEqual(without(args..), 'Expected');
	//t.equal(without(args..), 'Expected');
	//t.false(without(args..), 'Expected');
	//t.throws(without(args..), 'Expected');
	t.end();
});