const test = require('tape');
const coalesceFactory = require('./coalesceFactory.js');

test('Testing coalesceFactory', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof coalesceFactory === 'function', 'coalesceFactory is a Function');
	//t.deepEqual(coalesceFactory(args..), 'Expected');
	//t.equal(coalesceFactory(args..), 'Expected');
	//t.false(coalesceFactory(args..), 'Expected');
	//t.throws(coalesceFactory(args..), 'Expected');
	t.end();
});