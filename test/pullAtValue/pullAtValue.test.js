const test = require('tape');
const pullAtValue = require('./pullAtValue.js');

test('Testing pullAtValue', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof pullAtValue === 'function', 'pullAtValue is a Function');

	let myArray1 = ['a', 'b', 'c', 'd'];
	pullAtValue(myArray1, ['b', 'd']);
	t.deepEqual(myArray1, [ 'a', 'c' ], 'b & d was pulled from myArray1');
	t.true(Array.isArray(myArray1), 'myArray1 is still an Array');

	let myArray2 = ['a', 'b', 'c', 'd'];
	pullAtValue(myArray2, ['a', 'c']);
	t.deepEqual(myArray2, [ 'b', 'd' ], 'a & c was pulled from myArray2');
	t.true(Array.isArray(myArray2), 'myArray2 is still an Array');

	//t.false(pullAtValue(args..), 'Expected');
	//t.throws(pullAtValue(args..), 'Expected');
	t.end();
});
