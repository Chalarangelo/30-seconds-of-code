const test = require('tape');
const distinctValuesOfArray = require('./distinctValuesOfArray.js');

test('Testing distinctValuesOfArray', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof distinctValuesOfArray === 'function', 'distinctValuesOfArray is a Function');
	//t.deepEqual(distinctValuesOfArray(args..), 'Expected');
	//t.equal(distinctValuesOfArray(args..), 'Expected');
	//t.false(distinctValuesOfArray(args..), 'Expected');
	//t.throws(distinctValuesOfArray(args..), 'Expected');
	t.end();
});