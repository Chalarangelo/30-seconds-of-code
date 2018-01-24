const test = require('tape');
const times = require('./times.js');

test('Testing times', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof times === 'function', 'times is a Function');
	//t.deepEqual(times(args..), 'Expected');
	//t.equal(times(args..), 'Expected');
	//t.false(times(args..), 'Expected');
	//t.throws(times(args..), 'Expected');
	t.end();
});