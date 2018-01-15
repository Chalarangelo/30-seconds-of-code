const test = require('tape');
const minBy = require('./minBy.js');

test('Testing minBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof minBy === 'function', 'minBy is a Function');
	//t.deepEqual(minBy(args..), 'Expected');
	//t.equal(minBy(args..), 'Expected');
	//t.false(minBy(args..), 'Expected');
	//t.throws(minBy(args..), 'Expected');
	t.end();
});