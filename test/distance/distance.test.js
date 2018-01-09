const test = require('tape');
const distance = require('./distance.js');

test('Testing distance', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof distance === 'function', 'distance is a Function');
	//t.deepEqual(distance(args..), 'Expected');
	//t.equal(distance(args..), 'Expected');
	//t.false(distance(args..), 'Expected');
	//t.throws(distance(args..), 'Expected');
	t.end();
});