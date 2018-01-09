const test = require('tape');
const flip = require('./flip.js');

test('Testing flip', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof flip === 'function', 'flip is a Function');
	//t.deepEqual(flip(args..), 'Expected');
	//t.equal(flip(args..), 'Expected');
	//t.false(flip(args..), 'Expected');
	//t.throws(flip(args..), 'Expected');
	t.end();
});