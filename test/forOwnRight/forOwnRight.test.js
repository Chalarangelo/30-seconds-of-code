const test = require('tape');
const forOwnRight = require('./forOwnRight.js');

test('Testing forOwnRight', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof forOwnRight === 'function', 'forOwnRight is a Function');
	//t.deepEqual(forOwnRight(args..), 'Expected');
	//t.equal(forOwnRight(args..), 'Expected');
	//t.false(forOwnRight(args..), 'Expected');
	//t.throws(forOwnRight(args..), 'Expected');
	t.end();
});