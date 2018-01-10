const test = require('tape');
const lcm = require('./lcm.js');

test('Testing lcm', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof lcm === 'function', 'lcm is a Function');
	t.equal(lcm(12, 7), 84, "Returns the least common multiple of two or more numbers.");
	t.equal(lcm(...[1, 3, 4, 5]), 60, "Returns the least common multiple of two or more numbers.");
	//t.deepEqual(lcm(args..), 'Expected');
	//t.equal(lcm(args..), 'Expected');
	//t.false(lcm(args..), 'Expected');
	//t.throws(lcm(args..), 'Expected');
	t.end();
});