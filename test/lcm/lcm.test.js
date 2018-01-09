const test = require('tape');
const lcm = require('./lcm.js');

test('Testing lcm', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof lcm === 'function', 'lcm is a Function');
	//t.deepEqual(lcm(args..), 'Expected');
	//t.equal(lcm(args..), 'Expected');
	//t.false(lcm(args..), 'Expected');
	//t.throws(lcm(args..), 'Expected');
	t.end();
});