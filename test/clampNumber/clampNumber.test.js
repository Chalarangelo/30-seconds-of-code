const test = require('tape');
const clampNumber = require('./clampNumber.js');

test('Testing clampNumber', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof clampNumber === 'function', 'clampNumber is a Function');
	//t.deepEqual(clampNumber(args..), 'Expected');
	//t.equal(clampNumber(args..), 'Expected');
	//t.false(clampNumber(args..), 'Expected');
	//t.throws(clampNumber(args..), 'Expected');
	t.end();
});