const test = require('tape');
const deepFlatten = require('./deepFlatten.js');

test('Testing deepFlatten', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof deepFlatten === 'function', 'deepFlatten is a Function');
	//t.deepEqual(deepFlatten(args..), 'Expected');
	//t.equal(deepFlatten(args..), 'Expected');
	//t.false(deepFlatten(args..), 'Expected');
	//t.throws(deepFlatten(args..), 'Expected');
	t.end();
});