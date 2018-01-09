const test = require('tape');
const symmetricDifference = require('./symmetricDifference.js');

test('Testing symmetricDifference', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof symmetricDifference === 'function', 'symmetricDifference is a Function');
	//t.deepEqual(symmetricDifference(args..), 'Expected');
	//t.equal(symmetricDifference(args..), 'Expected');
	//t.false(symmetricDifference(args..), 'Expected');
	//t.throws(symmetricDifference(args..), 'Expected');
	t.end();
});