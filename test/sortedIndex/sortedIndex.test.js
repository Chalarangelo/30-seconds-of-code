const test = require('tape');
const sortedIndex = require('./sortedIndex.js');

test('Testing sortedIndex', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sortedIndex === 'function', 'sortedIndex is a Function');
	//t.deepEqual(sortedIndex(args..), 'Expected');
	//t.equal(sortedIndex(args..), 'Expected');
	//t.false(sortedIndex(args..), 'Expected');
	//t.throws(sortedIndex(args..), 'Expected');
	t.end();
});