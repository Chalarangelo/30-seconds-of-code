const test = require('tape');
const functions = require('./functions.js');

test('Testing functions', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof functions === 'function', 'functions is a Function');
	//t.deepEqual(functions(args..), 'Expected');
	//t.equal(functions(args..), 'Expected');
	//t.false(functions(args..), 'Expected');
	//t.throws(functions(args..), 'Expected');
	t.end();
});