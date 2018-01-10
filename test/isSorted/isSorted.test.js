const test = require('tape');
const isSorted = require('./isSorted.js');

test('Testing isSorted', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isSorted === 'function', 'isSorted is a Function');
	//t.deepEqual(isSorted(args..), 'Expected');
	t.equal(isSorted([0, 1, 2, 2]), 1, 'Array is sorted in ascending order');
	t.equal(isSorted([4, 3, 2]), -1, 'Array is sorted in descending order');
	//t.false(isSorted(args..), 'Expected');
	//t.throws(isSorted(args..), 'Expected');
	t.end();
});