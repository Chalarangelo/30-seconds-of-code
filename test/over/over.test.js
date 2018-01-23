const test = require('tape');
const over = require('./over.js');

test('Testing over', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof over === 'function', 'over is a Function');
	//t.deepEqual(over(args..), 'Expected');
	//t.equal(over(args..), 'Expected');
	//t.false(over(args..), 'Expected');
	//t.throws(over(args..), 'Expected');
	t.end();
});