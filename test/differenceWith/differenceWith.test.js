const test = require('tape');
const differenceWith = require('./differenceWith.js');

test('Testing differenceWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof differenceWith === 'function', 'differenceWith is a Function');
	t.deepEqual(differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)), [1, 1.2], "Filters out all values from an array");
	//t.deepEqual(differenceWith(args..), 'Expected');
	//t.equal(differenceWith(args..), 'Expected');
	//t.false(differenceWith(args..), 'Expected');
	//t.throws(differenceWith(args..), 'Expected');
	t.end();
});