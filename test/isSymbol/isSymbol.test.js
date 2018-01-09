const test = require('tape');
const isSymbol = require('./isSymbol.js');

test('Testing isSymbol', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isSymbol === 'function', 'isSymbol is a Function');
	//t.deepEqual(isSymbol(args..), 'Expected');
	//t.equal(isSymbol(args..), 'Expected');
	//t.false(isSymbol(args..), 'Expected');
	//t.throws(isSymbol(args..), 'Expected');
	t.end();
});