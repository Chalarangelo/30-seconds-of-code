const test = require('tape');
const differenceWith = require('./differenceWith.js');

test('Testing differenceWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof differenceWith === 'function', 'differenceWith is a Function');
	//t.deepEqual(differenceWith(args..), 'Expected');
	//t.equal(differenceWith(args..), 'Expected');
	//t.false(differenceWith(args..), 'Expected');
	//t.throws(differenceWith(args..), 'Expected');
	t.end();
});