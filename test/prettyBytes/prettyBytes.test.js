const test = require('tape');
const prettyBytes = require('./prettyBytes.js');

test('Testing prettyBytes', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof prettyBytes === 'function', 'prettyBytes is a Function');
	//t.deepEqual(prettyBytes(args..), 'Expected');
	//t.equal(prettyBytes(args..), 'Expected');
	//t.false(prettyBytes(args..), 'Expected');
	//t.throws(prettyBytes(args..), 'Expected');
	t.end();
});