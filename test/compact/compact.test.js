const test = require('tape');
const compact = require('./compact.js');

test('Testing compact', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof compact === 'function', 'compact is a Function');
	//t.deepEqual(compact(args..), 'Expected');
	//t.equal(compact(args..), 'Expected');
	//t.false(compact(args..), 'Expected');
	//t.throws(compact(args..), 'Expected');
	t.end();
});