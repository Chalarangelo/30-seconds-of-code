const test = require('tape');
const randomIntArrayInRange = require('./randomIntArrayInRange.js');

test('Testing randomIntArrayInRange', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof randomIntArrayInRange === 'function', 'randomIntArrayInRange is a Function');
	//t.deepEqual(randomIntArrayInRange(args..), 'Expected');
	//t.equal(randomIntArrayInRange(args..), 'Expected');
	//t.false(randomIntArrayInRange(args..), 'Expected');
	//t.throws(randomIntArrayInRange(args..), 'Expected');
	t.end();
});