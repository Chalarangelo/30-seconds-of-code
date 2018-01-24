const test = require('tape');
const composeRight = require('./composeRight.js');

test('Testing composeRight', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof composeRight === 'function', 'composeRight is a Function');
	//t.deepEqual(composeRight(args..), 'Expected');
	//t.equal(composeRight(args..), 'Expected');
	//t.false(composeRight(args..), 'Expected');
	//t.throws(composeRight(args..), 'Expected');
	t.end();
});