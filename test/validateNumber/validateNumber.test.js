const test = require('tape');
const validateNumber = require('./validateNumber.js');

test('Testing validateNumber', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof validateNumber === 'function', 'validateNumber is a Function');
	//t.deepEqual(validateNumber(args..), 'Expected');
	//t.equal(validateNumber(args..), 'Expected');
	//t.false(validateNumber(args..), 'Expected');
	//t.throws(validateNumber(args..), 'Expected');
	t.end();
});