const test = require('tape');
const isWeakMap = require('./isWeakMap.js');

test('Testing isWeakMap', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isWeakMap === 'function', 'isWeakMap is a Function');
	//t.deepEqual(isWeakMap(args..), 'Expected');
	//t.equal(isWeakMap(args..), 'Expected');
	//t.false(isWeakMap(args..), 'Expected');
	//t.throws(isWeakMap(args..), 'Expected');
	t.end();
});