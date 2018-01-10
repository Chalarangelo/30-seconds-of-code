const test = require('tape');
const standardDeviation = require('./standardDeviation.js');

test('Testing standardDeviation', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof standardDeviation === 'function', 'standardDeviation is a Function');
	t.equal(standardDeviation([10, 2, 38, 23, 38, 23, 21]), 13.284434142114991, "Returns the standard deviation of an array of numbers");
	t.equal(standardDeviation([10, 2, 38, 23, 38, 23, 21], true), 12.29899614287479, "Returns the standard deviation of an array of numbers");
	//t.deepEqual(standardDeviation(args..), 'Expected');
	//t.equal(standardDeviation(args..), 'Expected');
	//t.false(standardDeviation(args..), 'Expected');
	//t.throws(standardDeviation(args..), 'Expected');
	t.end();
});