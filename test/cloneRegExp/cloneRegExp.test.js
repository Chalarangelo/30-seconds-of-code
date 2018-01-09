const test = require('tape');
const cloneRegExp = require('./cloneRegExp.js');

test('Testing cloneRegExp', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof cloneRegExp === 'function', 'cloneRegExp is a Function');
	//t.deepEqual(cloneRegExp(args..), 'Expected');
	//t.equal(cloneRegExp(args..), 'Expected');
	//t.false(cloneRegExp(args..), 'Expected');
	//t.throws(cloneRegExp(args..), 'Expected');
	t.end();
});