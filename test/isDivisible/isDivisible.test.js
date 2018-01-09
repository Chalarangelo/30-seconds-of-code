const test = require('tape');
const isDivisible = require('./isDivisible.js');

test('Testing isDivisible', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isDivisible === 'function', 'isDivisible is a Function');
	//t.deepEqual(isDivisible(args..), 'Expected');
	//t.equal(isDivisible(args..), 'Expected');
	//t.false(isDivisible(args..), 'Expected');
	//t.throws(isDivisible(args..), 'Expected');
	t.end();
});