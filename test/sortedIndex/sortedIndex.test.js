const test = require('tape');
const sortedIndex = require('./sortedIndex.js');

test('Testing sortedIndex', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sortedIndex === 'function', 'sortedIndex is a Function');
	t.equal(sortedIndex([5, 3, 2, 1], 4), 1, "Returns the lowest index at which value should be inserted into array in order to maintain its sort order.");
	t.equal(sortedIndex([30, 50], 40), 1, "Returns the lowest index at which value should be inserted into array in order to maintain its sort order.");
	//t.deepEqual(sortedIndex(args..), 'Expected');
	//t.equal(sortedIndex(args..), 'Expected');
	//t.false(sortedIndex(args..), 'Expected');
	//t.throws(sortedIndex(args..), 'Expected');
	t.end();
});