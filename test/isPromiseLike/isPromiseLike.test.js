const test = require('tape');
const isPromiseLike = require('./isPromiseLike.js');

test('Testing isPromiseLike', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPromiseLike === 'function', 'isPromiseLike is a Function');
	//t.deepEqual(isPromiseLike(args..), 'Expected');
	//t.equal(isPromiseLike(args..), 'Expected');
	//t.false(isPromiseLike(args..), 'Expected');
	//t.throws(isPromiseLike(args..), 'Expected');
	t.end();
});