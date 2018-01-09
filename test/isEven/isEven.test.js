const test = require('tape');
const isEven = require('./isEven.js');

test('Testing isEven', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isEven === 'function', 'isEven is a Function');
	//t.deepEqual(isEven(args..), 'Expected');
	//t.equal(isEven(args..), 'Expected');
	//t.false(isEven(args..), 'Expected');
	//t.throws(isEven(args..), 'Expected');
	t.end();
});