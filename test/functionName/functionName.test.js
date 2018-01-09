const test = require('tape');
const functionName = require('./functionName.js');

test('Testing functionName', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof functionName === 'function', 'functionName is a Function');
	//t.deepEqual(functionName(args..), 'Expected');
	//t.equal(functionName(args..), 'Expected');
	//t.false(functionName(args..), 'Expected');
	//t.throws(functionName(args..), 'Expected');
	t.end();
});