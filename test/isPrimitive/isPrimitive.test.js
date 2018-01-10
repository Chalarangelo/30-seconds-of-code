const test = require('tape');
const isPrimitive = require('./isPrimitive.js');

test('Testing isPrimitive', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPrimitive === 'function', 'isPrimitive is a Function');
	t.equal(isPrimitive(null), true, "passed value is primitive");
	t.equal(isPrimitive(50), true, "passed value is primitive");
	t.equal(isPrimitive('Hello'), true, "passed value is primitive");
	t.equal(isPrimitive(false), true, "passed value is primitive");
	t.equal(isPrimitive(Symbol()), true, "passed value is primitive");
	t.equal(isPrimitive([]), false, "passed value is primitive");


	//t.deepEqual(isPrimitive(args..), 'Expected');
	//t.equal(isPrimitive(args..), 'Expected');
	//t.false(isPrimitive(args..), 'Expected');
	//t.throws(isPrimitive(args..), 'Expected');
	t.end();
});