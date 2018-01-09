const test = require('tape');
const toSnakeCase = require('./toSnakeCase.js');

test('Testing toSnakeCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toSnakeCase === 'function', 'toSnakeCase is a Function');
	//t.deepEqual(toSnakeCase(args..), 'Expected');
	//t.equal(toSnakeCase(args..), 'Expected');
	//t.false(toSnakeCase(args..), 'Expected');
	//t.throws(toSnakeCase(args..), 'Expected');
	t.end();
});