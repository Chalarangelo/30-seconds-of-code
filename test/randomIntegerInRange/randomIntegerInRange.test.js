const test = require('tape');
const randomIntegerInRange = require('./randomIntegerInRange.js');

test('Testing randomIntegerInRange', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof randomIntegerInRange === 'function', 'randomIntegerInRange is a Function');
	//t.deepEqual(randomIntegerInRange(args..), 'Expected');
	//t.equal(randomIntegerInRange(args..), 'Expected');
	//t.false(randomIntegerInRange(args..), 'Expected');
	//t.throws(randomIntegerInRange(args..), 'Expected');
	t.end();
});