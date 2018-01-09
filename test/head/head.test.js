const test = require('tape');
const head = require('./head.js');

test('Testing head', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof head === 'function', 'head is a Function');
	//t.deepEqual(head(args..), 'Expected');
	//t.equal(head(args..), 'Expected');
	//t.false(head(args..), 'Expected');
	//t.throws(head(args..), 'Expected');
	t.end();
});