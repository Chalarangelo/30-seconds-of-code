const test = require('tape');
const mapValues = require('./mapValues.js');

test('Testing mapValues', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof mapValues === 'function', 'mapValues is a Function');
	//t.deepEqual(mapValues(args..), 'Expected');
	//t.equal(mapValues(args..), 'Expected');
	//t.false(mapValues(args..), 'Expected');
	//t.throws(mapValues(args..), 'Expected');
	t.end();
});