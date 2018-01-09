const test = require('tape');
const isSorted = require('./isSorted.js');

test('Testing isSorted', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isSorted === 'function', 'isSorted is a Function');
	//t.deepEqual(isSorted(args..), 'Expected');
	//t.equal(isSorted(args..), 'Expected');
	//t.false(isSorted(args..), 'Expected');
	//t.throws(isSorted(args..), 'Expected');
	t.end();
});