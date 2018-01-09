const test = require('tape');
const isPrimitive = require('./isPrimitive.js');

test('Testing isPrimitive', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPrimitive === 'function', 'isPrimitive is a Function');
	//t.deepEqual(isPrimitive(args..), 'Expected');
	//t.equal(isPrimitive(args..), 'Expected');
	//t.false(isPrimitive(args..), 'Expected');
	//t.throws(isPrimitive(args..), 'Expected');
	t.end();
});