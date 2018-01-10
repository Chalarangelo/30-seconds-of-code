const test = require('tape');
const pullAtIndex = require('./pullAtIndex.js');

test('Testing pullAtIndex', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof pullAtIndex === 'function', 'pullAtIndex is a Function');

	let myArray1 = ['a', 'b', 'c', 'd'];
	pullAtIndex(myArray1, [1, 3]);
	t.deepEqual(myArray1, [ 'a', 'c' ], 'b & d was pulled from myArray1');

	let myArray2 = ['a', 'b', 'c', 'd'];
	pullAtIndex(myArray2, [0, 2]);
	t.deepEqual(myArray2, [ 'b', 'd' ], 'a & c was pulled from myArray2');

	//t.deepEqual(pullAtIndex(args..), 'Expected');
	//t.deepEqual(pullAtIndex(args..), 'Expected');
	//t.equal(pullAtIndex(args..), 'Expected');
	//t.false(pullAtIndex(args..), 'Expected');
	//t.throws(pullAtIndex(args..), 'Expected');
	t.end();
});
