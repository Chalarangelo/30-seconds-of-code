const test = require('tape');
const unzip = require('./unzip.js');

test('Testing unzip', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unzip === 'function', 'unzip is a Function');
	//t.deepEqual(unzip(args..), 'Expected');
	//t.equal(unzip(args..), 'Expected');
	//t.false(unzip(args..), 'Expected');
	//t.throws(unzip(args..), 'Expected');
	t.end();
});