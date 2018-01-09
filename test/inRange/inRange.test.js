const test = require('tape');
const inRange = require('./inRange.js');

test('Testing inRange', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof inRange === 'function', 'inRange is a Function');
	//t.deepEqual(inRange(args..), 'Expected');
	//t.equal(inRange(args..), 'Expected');
	//t.false(inRange(args..), 'Expected');
	//t.throws(inRange(args..), 'Expected');
	t.end();
});