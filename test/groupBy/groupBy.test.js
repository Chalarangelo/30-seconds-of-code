const test = require('tape');
const groupBy = require('./groupBy.js');

test('Testing groupBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof groupBy === 'function', 'groupBy is a Function');
	//t.deepEqual(groupBy(args..), 'Expected');
	//t.equal(groupBy(args..), 'Expected');
	//t.false(groupBy(args..), 'Expected');
	//t.throws(groupBy(args..), 'Expected');
	t.end();
});