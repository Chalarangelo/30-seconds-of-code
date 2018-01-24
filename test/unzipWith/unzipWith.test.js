const test = require('tape');
const unzipWith = require('./unzipWith.js');

test('Testing unzipWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unzipWith === 'function', 'unzipWith is a Function');
	//t.deepEqual(unzipWith(args..), 'Expected');
	//t.equal(unzipWith(args..), 'Expected');
	//t.false(unzipWith(args..), 'Expected');
	//t.throws(unzipWith(args..), 'Expected');
	t.end();
});