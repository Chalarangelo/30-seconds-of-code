const test = require('tape');
const mask = require('./mask.js');

test('Testing mask', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof mask === 'function', 'mask is a Function');
	//t.deepEqual(mask(args..), 'Expected');
	//t.equal(mask(args..), 'Expected');
	//t.false(mask(args..), 'Expected');
	//t.throws(mask(args..), 'Expected');
	t.end();
});