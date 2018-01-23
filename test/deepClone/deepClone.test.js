const test = require('tape');
const deepClone = require('./deepClone.js');

test('Testing deepClone', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof deepClone === 'function', 'deepClone is a Function');
	//t.deepEqual(deepClone(args..), 'Expected');
	//t.equal(deepClone(args..), 'Expected');
	//t.false(deepClone(args..), 'Expected');
	//t.throws(deepClone(args..), 'Expected');
	t.end();
});