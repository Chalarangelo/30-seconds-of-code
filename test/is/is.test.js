const test = require('tape');
const is = require('./is.js');

test('Testing is', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof is === 'function', 'is is a Function');
	//t.deepEqual(is(args..), 'Expected');
	//t.equal(is(args..), 'Expected');
	//t.false(is(args..), 'Expected');
	//t.throws(is(args..), 'Expected');
	t.end();
});