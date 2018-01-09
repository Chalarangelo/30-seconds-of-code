const test = require('tape');
const pull = require('./pull.js');

test('Testing pull', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof pull === 'function', 'pull is a Function');
	//t.deepEqual(pull(args..), 'Expected');
	//t.equal(pull(args..), 'Expected');
	//t.false(pull(args..), 'Expected');
	//t.throws(pull(args..), 'Expected');
	t.end();
});