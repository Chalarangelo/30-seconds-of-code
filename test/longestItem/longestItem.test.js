const test = require('tape');
const longestItem = require('./longestItem.js');

test('Testing longestItem', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof longestItem === 'function', 'longestItem is a Function');
	//t.deepEqual(longestItem(args..), 'Expected');
	//t.equal(longestItem(args..), 'Expected');
	//t.false(longestItem(args..), 'Expected');
	//t.throws(longestItem(args..), 'Expected');
	t.end();
});