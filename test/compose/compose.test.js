const test = require('tape');
const compose = require('./compose.js');

test('Testing compose', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof compose === 'function', 'compose is a Function');
	//t.deepEqual(compose(args..), 'Expected');
	//t.equal(compose(args..), 'Expected');
	//t.false(compose(args..), 'Expected');
	//t.throws(compose(args..), 'Expected');
	t.end();
});