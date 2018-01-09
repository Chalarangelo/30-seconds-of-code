const test = require('tape');
const getDaysDiffBetweenDates = require('./getDaysDiffBetweenDates.js');

test('Testing getDaysDiffBetweenDates', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof getDaysDiffBetweenDates === 'function', 'getDaysDiffBetweenDates is a Function');
	//t.deepEqual(getDaysDiffBetweenDates(args..), 'Expected');
	//t.equal(getDaysDiffBetweenDates(args..), 'Expected');
	//t.false(getDaysDiffBetweenDates(args..), 'Expected');
	//t.throws(getDaysDiffBetweenDates(args..), 'Expected');
	t.end();
});