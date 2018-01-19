const test = require('tape');
const isPlainObject = require('./isPlainObject.js');

test('Testing isPlainObject', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPlainObject === 'function', 'isPlainObject is a Function');
	//t.deepEqual(isPlainObject(args..), 'Expected');
	//t.equal(isPlainObject(args..), 'Expected');
	//t.false(isPlainObject(args..), 'Expected');
	//t.throws(isPlainObject(args..), 'Expected');
	t.end();
});