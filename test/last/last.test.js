const test = require('tape');
const last = require('./last.js');

test('Testing last', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof last === 'function', 'last is a Function');
	t.equal(last([1, 2, 3]), 3, "Returns the last element in an array");
	//t.deepEqual(last(args..), 'Expected');
	//t.equal(last(args..), 'Expected');
	//t.false(last(args..), 'Expected');
	//t.throws(last(args..), 'Expected');
	t.end();
});