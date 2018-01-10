const test = require('tape');
const isString = require('./isString.js');

test('Testing isString', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isString === 'function', 'isString is a Function');
	t.equal(isString('foo'), true, 'foo is a string');
	t.equal(isString('10'), true, '"10" is a string');
	t.equal(isString(''), true, 'Empty string is a string');
	t.equal(isString(10), false, '10 is not a string');
	t.equal(isString(true), false, 'true is not string');

	//t.deepEqual(isString(args..), 'Expected');
	//t.equal(isString(args..), 'Expected');
	//t.false(isString(args..), 'Expected');
	//t.throws(isString(args..), 'Expected');
	t.end();
});