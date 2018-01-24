const test = require('tape');
const unionBy = require('./unionBy.js');

test('Testing unionBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unionBy === 'function', 'unionBy is a Function');
	//t.deepEqual(unionBy(args..), 'Expected');
	//t.equal(unionBy(args..), 'Expected');
	//t.false(unionBy(args..), 'Expected');
	//t.throws(unionBy(args..), 'Expected');
	t.end();
});