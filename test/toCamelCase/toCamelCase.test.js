const test = require('tape');
const toCamelCase = require('./toCamelCase.js');

test('Testing toCamelCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toCamelCase === 'function', 'toCamelCase is a Function');
	//t.deepEqual(toCamelCase(args..), 'Expected');
	//t.equal(toCamelCase(args..), 'Expected');
	//t.false(toCamelCase(args..), 'Expected');
	//t.throws(toCamelCase(args..), 'Expected');
	t.end();
});