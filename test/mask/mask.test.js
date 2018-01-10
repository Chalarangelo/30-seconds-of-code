const test = require('tape');
const mask = require('./mask.js');

test('Testing mask', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof mask === 'function', 'mask is a Function');
	t.equal(mask(1234567890), '******7890', "Replaces all but the last num of characters with the specified mask character");
	t.equal(mask(1234567890, 3), '*******890', "Replaces all but the last num of characters with the specified mask character");
	t.equal(mask(1234567890, -4, '$'), '$$$$567890', "Replaces all but the last num of characters with the specified mask character");

	//t.equal(mask(args..), 'Expected');
	//t.false(mask(args..), 'Expected');
	//t.throws(mask(args..), 'Expected');
	t.end();
});