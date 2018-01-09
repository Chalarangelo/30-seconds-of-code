const test = require('tape');
const sum = require('./sum.js');

test('Testing sum', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sum === 'function', 'sum is a Function');
	//t.deepEqual(sum(args..), 'Expected');
	//t.equal(sum(args..), 'Expected');
	//t.false(sum(args..), 'Expected');
	//t.throws(sum(args..), 'Expected');
	t.end();
});