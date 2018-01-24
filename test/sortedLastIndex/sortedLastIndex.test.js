const test = require('tape');
const sortedLastIndex = require('./sortedLastIndex.js');

test('Testing sortedLastIndex', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sortedLastIndex === 'function', 'sortedLastIndex is a Function');
	//t.deepEqual(sortedLastIndex(args..), 'Expected');
	//t.equal(sortedLastIndex(args..), 'Expected');
	//t.false(sortedLastIndex(args..), 'Expected');
	//t.throws(sortedLastIndex(args..), 'Expected');
	t.end();
});