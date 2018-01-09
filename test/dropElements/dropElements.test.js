const test = require('tape');
const dropElements = require('./dropElements.js');

test('Testing dropElements', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof dropElements === 'function', 'dropElements is a Function');
	//t.deepEqual(dropElements(args..), 'Expected');
	//t.equal(dropElements(args..), 'Expected');
	//t.false(dropElements(args..), 'Expected');
	//t.throws(dropElements(args..), 'Expected');
	t.end();
});