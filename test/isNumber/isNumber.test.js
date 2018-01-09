const test = require('tape');
const isNumber = require('./isNumber.js');

test('Testing isNumber', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isNumber === 'function', 'isNumber is a Function');
	//t.deepEqual(isNumber(args..), 'Expected');
	//t.equal(isNumber(args..), 'Expected');
	//t.false(isNumber(args..), 'Expected');
	//t.throws(isNumber(args..), 'Expected');
	t.end();
});