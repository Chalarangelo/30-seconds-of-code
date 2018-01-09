const test = require('tape');
const standardDeviation = require('./standardDeviation.js');

test('Testing standardDeviation', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof standardDeviation === 'function', 'standardDeviation is a Function');
	//t.deepEqual(standardDeviation(args..), 'Expected');
	//t.equal(standardDeviation(args..), 'Expected');
	//t.false(standardDeviation(args..), 'Expected');
	//t.throws(standardDeviation(args..), 'Expected');
	t.end();
});