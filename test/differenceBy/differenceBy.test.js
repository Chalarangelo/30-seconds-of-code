const test = require('tape');
const differenceBy = require('./differenceBy.js');

test('Testing differenceBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof differenceBy === 'function', 'differenceBy is a Function');
	//t.deepEqual(differenceBy(args..), 'Expected');
	//t.equal(differenceBy(args..), 'Expected');
	//t.false(differenceBy(args..), 'Expected');
	//t.throws(differenceBy(args..), 'Expected');
	t.end();
});