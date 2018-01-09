const test = require('tape');
const pullAtValue = require('./pullAtValue.js');

test('Testing pullAtValue', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof pullAtValue === 'function', 'pullAtValue is a Function');
	//t.deepEqual(pullAtValue(args..), 'Expected');
	//t.equal(pullAtValue(args..), 'Expected');
	//t.false(pullAtValue(args..), 'Expected');
	//t.throws(pullAtValue(args..), 'Expected');
	t.end();
});