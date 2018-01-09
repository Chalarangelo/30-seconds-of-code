const test = require('tape');
const shallowClone = require('./shallowClone.js');

test('Testing shallowClone', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof shallowClone === 'function', 'shallowClone is a Function');
	//t.deepEqual(shallowClone(args..), 'Expected');
	//t.equal(shallowClone(args..), 'Expected');
	//t.false(shallowClone(args..), 'Expected');
	//t.throws(shallowClone(args..), 'Expected');
	t.end();
});