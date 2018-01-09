const test = require('tape');
const pick = require('./pick.js');

test('Testing pick', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof pick === 'function', 'pick is a Function');
	//t.deepEqual(pick(args..), 'Expected');
	//t.equal(pick(args..), 'Expected');
	//t.false(pick(args..), 'Expected');
	//t.throws(pick(args..), 'Expected');
	t.end();
});