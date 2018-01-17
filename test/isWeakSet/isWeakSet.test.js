const test = require('tape');
const isWeakSet = require('./isWeakSet.js');

test('Testing isWeakSet', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isWeakSet === 'function', 'isWeakSet is a Function');
	//t.deepEqual(isWeakSet(args..), 'Expected');
	//t.equal(isWeakSet(args..), 'Expected');
	//t.false(isWeakSet(args..), 'Expected');
	//t.throws(isWeakSet(args..), 'Expected');
	t.end();
});