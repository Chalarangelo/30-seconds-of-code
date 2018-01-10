const test = require('tape');
const toDecimalMark = require('./toDecimalMark.js');

test('Testing toDecimalMark', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toDecimalMark === 'function', 'toDecimalMark is a Function');
	t.equal(toDecimalMark(12305030388.9087), "12,305,030,388.909", "convert a float-point arithmetic to the Decimal mark form");
	//t.deepEqual(toDecimalMark(args..), 'Expected');
	//t.equal(toDecimalMark(args..), 'Expected');
	//t.false(toDecimalMark(args..), 'Expected');
	//t.throws(toDecimalMark(args..), 'Expected');
	t.end();
});