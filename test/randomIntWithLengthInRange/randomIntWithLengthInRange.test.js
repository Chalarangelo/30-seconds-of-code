const test = require('tape');
const randomIntWithLengthInRange = require('./randomIntWithLengthInRange.js');

test('Testing randomIntWithLengthInRange', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof randomIntWithLengthInRange === 'function', 'randomIntWithLengthInRange is a Function');
	//t.deepEqual(randomIntWithLengthInRange(args..), 'Expected');
	//t.equal(randomIntWithLengthInRange(args..), 'Expected');
	//t.false(randomIntWithLengthInRange(args..), 'Expected');
	//t.throws(randomIntWithLengthInRange(args..), 'Expected');
	t.end();
});