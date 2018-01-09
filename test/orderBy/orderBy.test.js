const test = require('tape');
const orderBy = require('./orderBy.js');

test('Testing orderBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof orderBy === 'function', 'orderBy is a Function');
	//t.deepEqual(orderBy(args..), 'Expected');
	//t.equal(orderBy(args..), 'Expected');
	//t.false(orderBy(args..), 'Expected');
	//t.throws(orderBy(args..), 'Expected');
	t.end();
});