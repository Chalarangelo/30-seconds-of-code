const test = require('tape');
const take = require('./take.js');

test('Testing take', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof take === 'function', 'take is a Function');
	//t.deepEqual(take(args..), 'Expected');
	//t.equal(take(args..), 'Expected');
	//t.false(take(args..), 'Expected');
	//t.throws(take(args..), 'Expected');
	t.end();
});