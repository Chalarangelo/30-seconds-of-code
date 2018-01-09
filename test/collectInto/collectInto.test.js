const test = require('tape');
const collectInto = require('./collectInto.js');

test('Testing collectInto', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof collectInto === 'function', 'collectInto is a Function');
	//t.deepEqual(collectInto(args..), 'Expected');
	//t.equal(collectInto(args..), 'Expected');
	//t.false(collectInto(args..), 'Expected');
	//t.throws(collectInto(args..), 'Expected');
	t.end();
});