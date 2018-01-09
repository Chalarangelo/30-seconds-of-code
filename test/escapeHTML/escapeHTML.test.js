const test = require('tape');
const escapeHTML = require('./escapeHTML.js');

test('Testing escapeHTML', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof escapeHTML === 'function', 'escapeHTML is a Function');
	//t.deepEqual(escapeHTML(args..), 'Expected');
	//t.equal(escapeHTML(args..), 'Expected');
	//t.false(escapeHTML(args..), 'Expected');
	//t.throws(escapeHTML(args..), 'Expected');
	t.end();
});