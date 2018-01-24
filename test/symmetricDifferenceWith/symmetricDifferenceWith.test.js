const test = require('tape');
const symmetricDifferenceWith = require('./symmetricDifferenceWith.js');

test('Testing symmetricDifferenceWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof symmetricDifferenceWith === 'function', 'symmetricDifferenceWith is a Function');
	//t.deepEqual(symmetricDifferenceWith(args..), 'Expected');
	//t.equal(symmetricDifferenceWith(args..), 'Expected');
	//t.false(symmetricDifferenceWith(args..), 'Expected');
	//t.throws(symmetricDifferenceWith(args..), 'Expected');
	t.end();
});