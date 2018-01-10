const test = require('tape');
const flattenDepth = require('./flattenDepth.js');

test('Testing flattenDepth', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof flattenDepth === 'function', 'flattenDepth is a Function');
	t.deepEqual(flattenDepth([1, [2], 3, 4]), [1, 2, 3, 4], "Flattens an array up to the specified depth");
	//t.deepEqual(flattenDepth(args..), 'Expected');
	//t.equal(flattenDepth(args..), 'Expected');
	//t.false(flattenDepth(args..), 'Expected');
	//t.throws(flattenDepth(args..), 'Expected');
	t.end();
});