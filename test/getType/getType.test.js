const test = require('tape');
const getType = require('./getType.js');

test('Testing getType', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof getType === 'function', 'getType is a Function');
	//t.deepEqual(getType(args..), 'Expected');
	//t.equal(getType(args..), 'Expected');
	//t.false(getType(args..), 'Expected');
	//t.throws(getType(args..), 'Expected');
	t.end();
});