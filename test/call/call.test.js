const test = require('tape');
const call = require('./call.js');

test('Testing call', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof call === 'function', 'call is a Function');
	//t.deepEqual(call(args..), 'Expected');
	//t.equal(call(args..), 'Expected');
	//t.false(call(args..), 'Expected');
	//t.throws(call(args..), 'Expected');
	t.end();
});