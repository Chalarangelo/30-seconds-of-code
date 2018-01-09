const test = require('tape');
const initializeArrayWithValues = require('./initializeArrayWithValues.js');

test('Testing initializeArrayWithValues', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof initializeArrayWithValues === 'function', 'initializeArrayWithValues is a Function');
	//t.deepEqual(initializeArrayWithValues(args..), 'Expected');
	//t.equal(initializeArrayWithValues(args..), 'Expected');
	//t.false(initializeArrayWithValues(args..), 'Expected');
	//t.throws(initializeArrayWithValues(args..), 'Expected');
	t.end();
});