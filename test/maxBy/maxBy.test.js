const test = require('tape');
const maxBy = require('./maxBy.js');

test('Testing maxBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof maxBy === 'function', 'maxBy is a Function');
	//t.deepEqual(maxBy(args..), 'Expected');
	//t.equal(maxBy(args..), 'Expected');
	//t.false(maxBy(args..), 'Expected');
	//t.throws(maxBy(args..), 'Expected');
	t.end();
});