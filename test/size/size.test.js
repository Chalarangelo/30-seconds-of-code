const test = require('tape');
const size = require('./size.js');

test('Testing size', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof size === 'function', 'size is a Function');
	//t.deepEqual(size(args..), 'Expected');
	//t.equal(size(args..), 'Expected');
	//t.false(size(args..), 'Expected');
	//t.throws(size(args..), 'Expected');
	t.end();
});