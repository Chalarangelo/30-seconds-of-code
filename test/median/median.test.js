const test = require('tape');
const median = require('./median.js');

test('Testing median', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof median === 'function', 'median is a Function');
	//t.deepEqual(median(args..), 'Expected');
	//t.equal(median(args..), 'Expected');
	//t.false(median(args..), 'Expected');
	//t.throws(median(args..), 'Expected');
	t.end();
});