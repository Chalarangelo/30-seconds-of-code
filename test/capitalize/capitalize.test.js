const test = require('tape');
const capitalize = require('./capitalize.js');

test('Testing capitalize', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof capitalize === 'function', 'capitalize is a Function');
	//t.deepEqual(capitalize(args..), 'Expected');
	//t.equal(capitalize(args..), 'Expected');
	//t.false(capitalize(args..), 'Expected');
	//t.throws(capitalize(args..), 'Expected');
	t.end();
});