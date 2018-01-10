const test = require('tape');
const isEven = require('./isEven.js');

test('Testing isEven', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isEven === 'function', 'isEven is a Function');
	t.equal(isEven(4), true, '4 is even number');
	t.false(isEven(5), false, '5 is not an even number');
	//t.deepEqual(isEven(args..), 'Expected');
	//t.throws(isEven(args..), 'Expected');
	t.end();
});