const test = require('tape');
const percentile = require('./percentile.js');

test('Testing percentile', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof percentile === 'function', 'percentile is a Function');
	//t.deepEqual(percentile(args..), 'Expected');
	//t.equal(percentile(args..), 'Expected');
	//t.false(percentile(args..), 'Expected');
	//t.throws(percentile(args..), 'Expected');
	t.end();
});