const test = require('tape');
const select = require('./select.js');

test('Testing select', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof select === 'function', 'select is a Function');
	//t.deepEqual(select(args..), 'Expected');
	//t.equal(select(args..), 'Expected');
	//t.false(select(args..), 'Expected');
	//t.throws(select(args..), 'Expected');
	t.end();
});