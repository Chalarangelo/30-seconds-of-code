const test = require('tape');
const partial = require('./partial.js');

test('Testing partial', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof partial === 'function', 'partial is a Function');
	//t.deepEqual(partial(args..), 'Expected');
	//t.equal(partial(args..), 'Expected');
	//t.false(partial(args..), 'Expected');
	//t.throws(partial(args..), 'Expected');
	t.end();
});