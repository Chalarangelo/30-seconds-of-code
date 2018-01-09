const test = require('tape');
const average = require('./average.js');

test('Testing average', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof average === 'function', 'average is a Function');
	//t.deepEqual(average(args..), 'Expected');
	//t.equal(average(args..), 'Expected');
	//t.false(average(args..), 'Expected');
	//t.throws(average(args..), 'Expected');
	t.end();
});