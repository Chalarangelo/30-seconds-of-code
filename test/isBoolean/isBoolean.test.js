const test = require('tape');
const isBoolean = require('./isBoolean.js');

test('Testing isBoolean', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isBoolean === 'function', 'isBoolean is a Function');
	//t.deepEqual(isBoolean(args..), 'Expected');
	//t.equal(isBoolean(args..), 'Expected');
	//t.false(isBoolean(args..), 'Expected');
	//t.throws(isBoolean(args..), 'Expected');
	t.end();
});