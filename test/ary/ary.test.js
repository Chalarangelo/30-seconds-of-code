const test = require('tape');
const ary = require('./ary.js');

test('Testing ary', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof ary === 'function', 'ary is a Function');
	//t.deepEqual(ary(args..), 'Expected');
	//t.equal(ary(args..), 'Expected');
	//t.false(ary(args..), 'Expected');
	//t.throws(ary(args..), 'Expected');
	t.end();
});