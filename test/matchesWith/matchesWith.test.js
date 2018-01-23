const test = require('tape');
const matchesWith = require('./matchesWith.js');

test('Testing matchesWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof matchesWith === 'function', 'matchesWith is a Function');
	//t.deepEqual(matchesWith(args..), 'Expected');
	//t.equal(matchesWith(args..), 'Expected');
	//t.false(matchesWith(args..), 'Expected');
	//t.throws(matchesWith(args..), 'Expected');
	t.end();
});