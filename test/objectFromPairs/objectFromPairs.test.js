const test = require('tape');
const objectFromPairs = require('./objectFromPairs.js');

test('Testing objectFromPairs', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof objectFromPairs === 'function', 'objectFromPairs is a Function');
	//t.deepEqual(objectFromPairs(args..), 'Expected');
	//t.equal(objectFromPairs(args..), 'Expected');
	//t.false(objectFromPairs(args..), 'Expected');
	//t.throws(objectFromPairs(args..), 'Expected');
	t.end();
});