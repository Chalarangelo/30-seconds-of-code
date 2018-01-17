const test = require('tape');
const isMap = require('./isMap.js');

test('Testing isMap', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isMap === 'function', 'isMap is a Function');
	//t.deepEqual(isMap(args..), 'Expected');
	//t.equal(isMap(args..), 'Expected');
	//t.false(isMap(args..), 'Expected');
	//t.throws(isMap(args..), 'Expected');
	t.end();
});