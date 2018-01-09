const test = require('tape');
const similarity = require('./similarity.js');

test('Testing similarity', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof similarity === 'function', 'similarity is a Function');
	//t.deepEqual(similarity(args..), 'Expected');
	//t.equal(similarity(args..), 'Expected');
	//t.false(similarity(args..), 'Expected');
	//t.throws(similarity(args..), 'Expected');
	t.end();
});