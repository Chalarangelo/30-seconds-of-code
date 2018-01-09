const test = require('tape');
const reducedFilter = require('./reducedFilter.js');

test('Testing reducedFilter', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof reducedFilter === 'function', 'reducedFilter is a Function');
	//t.deepEqual(reducedFilter(args..), 'Expected');
	//t.equal(reducedFilter(args..), 'Expected');
	//t.false(reducedFilter(args..), 'Expected');
	//t.throws(reducedFilter(args..), 'Expected');
	t.end();
});