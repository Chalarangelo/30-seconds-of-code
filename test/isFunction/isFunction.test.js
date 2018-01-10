const test = require('tape');
const isFunction = require('./isFunction.js');

test('Testing isFunction', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isFunction === 'function', 'isFunction is a Function');
	t.equal(isFunction(x => x), true, "passed value is a function");
	t.equal(isFunction('x'), false, "passed value is not a function");
	//t.equal(isFunction(args..), 'Expected');
	//t.false(isFunction(args..), 'Expected');
	//t.throws(isFunction(args..), 'Expected');
	t.end();
});