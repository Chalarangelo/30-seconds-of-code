const test = require('tape');
const groupBy = require('./groupBy.js');

test('Testing groupBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof groupBy === 'function', 'groupBy is a Function');
	t.deepEqual(groupBy([6.1, 4.2, 6.3], Math.floor), {4: [4.2], 6: [6.1, 6.3]}, "Groups the elements of an array based on the given function");
	t.deepEqual(groupBy(['one', 'two', 'three'], 'length'), {3: ['one', 'two'], 5: ['three']}, "Groups the elements of an array based on the given function");
	//t.deepEqual(groupBy(args..), 'Expected');
	//t.equal(groupBy(args..), 'Expected');
	//t.false(groupBy(args..), 'Expected');
	//t.throws(groupBy(args..), 'Expected');
	t.end();
});