const test = require('tape');
const countOccurrences = require('./countOccurrences.js');

test('Testing countOccurrences', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof countOccurrences === 'function', 'countOccurrences is a Function');
	t.deepEqual(countOccurrences([1, 1, 2, 1, 2, 3], 1), 3, "Counts the occurrences of a value in an array");
	//t.deepEqual(countOccurrences(args..), 'Expected');
	//t.equal(countOccurrences(args..), 'Expected');
	//t.false(countOccurrences(args..), 'Expected');
	//t.throws(countOccurrences(args..), 'Expected');
	t.end();
});