const test = require('tape');
const toKebabCase = require('./toKebabCase.js');

test('Testing toKebabCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toKebabCase === 'function', 'toKebabCase is a Function');
	//t.deepEqual(toKebabCase(args..), 'Expected');
	//t.equal(toKebabCase(args..), 'Expected');
	//t.false(toKebabCase(args..), 'Expected');
	//t.throws(toKebabCase(args..), 'Expected');
	t.end();
});