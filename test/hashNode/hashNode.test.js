const test = require('tape');
const hashNode = require('./hashNode.js');

test('Testing hashNode', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hashNode === 'function', 'hashNode is a Function');
	//t.deepEqual(hashNode(args..), 'Expected');
	//t.equal(hashNode(args..), 'Expected');
	//t.false(hashNode(args..), 'Expected');
	//t.throws(hashNode(args..), 'Expected');
	t.end();
});