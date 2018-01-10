const test = require('tape');
const inRange = require('./inRange.js');

test('Testing inRange', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof inRange === 'function', 'inRange is a Function');
	t.equal(inRange(3, 2, 5), true, "The given number falls within the given range");
	t.equal(inRange(3, 4), true, "The given number falls within the given range");
	t.equal(inRange(2, 3, 5), false, "The given number does not falls within the given range");
	t.equal(inRange(3, 2), false, "The given number does not falls within the given range");
	//t.deepEqual(inRange(args..), 'Expected');
	//t.equal(inRange(args..), 'Expected');
	//t.false(inRange(args..), 'Expected');
	//t.throws(inRange(args..), 'Expected');
	t.end();
});