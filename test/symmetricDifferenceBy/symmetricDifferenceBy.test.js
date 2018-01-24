const test = require('tape');
const symmetricDifferenceBy = require('./symmetricDifferenceBy.js');

test('Testing symmetricDifferenceBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof symmetricDifferenceBy === 'function', 'symmetricDifferenceBy is a Function');
	//t.deepEqual(symmetricDifferenceBy(args..), 'Expected');
	//t.equal(symmetricDifferenceBy(args..), 'Expected');
	//t.false(symmetricDifferenceBy(args..), 'Expected');
	//t.throws(symmetricDifferenceBy(args..), 'Expected');
	t.end();
});