const test = require('tape');
const toDecimalMark = require('./toDecimalMark.js');

test('Testing toDecimalMark', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toDecimalMark === 'function', 'toDecimalMark is a Function');
	//t.deepEqual(toDecimalMark(args..), 'Expected');
	//t.equal(toDecimalMark(args..), 'Expected');
	//t.false(toDecimalMark(args..), 'Expected');
	//t.throws(toDecimalMark(args..), 'Expected');
	t.end();
});