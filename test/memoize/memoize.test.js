const test = require('tape');
const memoize = require('./memoize.js');

test('Testing memoize', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof memoize === 'function', 'memoize is a Function');
	//t.deepEqual(memoize(args..), 'Expected');
	//t.equal(memoize(args..), 'Expected');
	//t.false(memoize(args..), 'Expected');
	//t.throws(memoize(args..), 'Expected');
	t.end();
});