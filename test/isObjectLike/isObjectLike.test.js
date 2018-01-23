const test = require('tape');
const isObjectLike = require('./isObjectLike.js');

test('Testing isObjectLike', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isObjectLike === 'function', 'isObjectLike is a Function');
	//t.deepEqual(isObjectLike(args..), 'Expected');
	//t.equal(isObjectLike(args..), 'Expected');
	//t.false(isObjectLike(args..), 'Expected');
	//t.throws(isObjectLike(args..), 'Expected');
	t.end();
});