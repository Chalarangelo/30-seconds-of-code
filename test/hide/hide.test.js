const test = require('tape');
const hide = require('./hide.js');

test('Testing hide', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hide === 'function', 'hide is a Function');
	//t.deepEqual(hide(args..), 'Expected');
	//t.equal(hide(args..), 'Expected');
	//t.false(hide(args..), 'Expected');
	//t.throws(hide(args..), 'Expected');
	t.end();
});