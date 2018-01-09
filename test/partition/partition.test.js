const test = require('tape');
const partition = require('./partition.js');

test('Testing partition', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof partition === 'function', 'partition is a Function');
	//t.deepEqual(partition(args..), 'Expected');
	//t.equal(partition(args..), 'Expected');
	//t.false(partition(args..), 'Expected');
	//t.throws(partition(args..), 'Expected');
	t.end();
});