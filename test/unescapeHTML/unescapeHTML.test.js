const test = require('tape');
const unescapeHTML = require('./unescapeHTML.js');

test('Testing unescapeHTML', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unescapeHTML === 'function', 'unescapeHTML is a Function');
	//t.deepEqual(unescapeHTML(args..), 'Expected');
	//t.equal(unescapeHTML(args..), 'Expected');
	//t.false(unescapeHTML(args..), 'Expected');
	//t.throws(unescapeHTML(args..), 'Expected');
	t.end();
});