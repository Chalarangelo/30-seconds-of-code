const test = require('tape');
const zipWith = require('./zipWith.js');

test('Testing zipWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zipWith === 'function', 'zipWith is a Function');
	//t.deepEqual(zipWith(args..), 'Expected');
	//t.equal(zipWith(args..), 'Expected');
	//t.false(zipWith(args..), 'Expected');
	//t.throws(zipWith(args..), 'Expected');
	t.end();
});