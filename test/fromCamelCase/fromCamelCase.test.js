const test = require('tape');
const fromCamelCase = require('./fromCamelCase.js');

test('Testing fromCamelCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof fromCamelCase === 'function', 'fromCamelCase is a Function');
	//t.deepEqual(fromCamelCase(args..), 'Expected');
	//t.equal(fromCamelCase(args..), 'Expected');
	//t.false(fromCamelCase(args..), 'Expected');
	//t.throws(fromCamelCase(args..), 'Expected');
	t.end();
});