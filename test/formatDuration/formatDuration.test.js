const test = require('tape');
const formatDuration = require('./formatDuration.js');

test('Testing formatDuration', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof formatDuration === 'function', 'formatDuration is a Function');
	//t.deepEqual(formatDuration(args..), 'Expected');
	//t.equal(formatDuration(args..), 'Expected');
	//t.false(formatDuration(args..), 'Expected');
	//t.throws(formatDuration(args..), 'Expected');
	t.end();
});