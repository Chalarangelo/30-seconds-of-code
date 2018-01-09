const test = require('tape');
const quickSort = require('./quickSort.js');

test('Testing quickSort', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof quickSort === 'function', 'quickSort is a Function');
	//t.deepEqual(quickSort(args..), 'Expected');
	//t.equal(quickSort(args..), 'Expected');
	//t.false(quickSort(args..), 'Expected');
	//t.throws(quickSort(args..), 'Expected');
	t.end();
});