const test = require('tape');
const splitLines = require('./splitLines.js');

test('Testing splitLines', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof splitLines === 'function', 'splitLines is a Function');
	t.deepEqual(splitLines('This\nis a\nmultiline\nstring.\n'), ['This', 'is a', 'multiline', 'string.' , ''], "Splits a multiline string into an array of lines.");
	//t.deepEqual(splitLines(args..), 'Expected');
	//t.equal(splitLines(args..), 'Expected');
	//t.false(splitLines(args..), 'Expected');
	//t.throws(splitLines(args..), 'Expected');
	t.end();
});