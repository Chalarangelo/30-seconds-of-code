const test = require('tape');
const forOwn = require('./forOwn.js');

test('Testing forOwn', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof forOwn === 'function', 'forOwn is a Function');
	//t.deepEqual(forOwn(args..), 'Expected');
	//t.equal(forOwn(args..), 'Expected');
	//t.false(forOwn(args..), 'Expected');
	//t.throws(forOwn(args..), 'Expected');
	t.end();
});