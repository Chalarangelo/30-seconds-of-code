const test = require('tape');
const chunk = require('./chunk.js');

test('Testing chunk', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof chunk === 'function', 'chunk is a Function');
	//t.deepEqual(chunk(args..), 'Expected');
	//t.equal(chunk(args..), 'Expected');
	//t.false(chunk(args..), 'Expected');
	//t.throws(chunk(args..), 'Expected');
	t.end();
});