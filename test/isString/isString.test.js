const test = require('tape');
const isString = require('./isString.js');

test('Testing isString', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isString === 'function', 'isString is a Function');
	//t.deepEqual(isString(args..), 'Expected');
	//t.equal(isString(args..), 'Expected');
	//t.false(isString(args..), 'Expected');
	//t.throws(isString(args..), 'Expected');
	t.end();
});