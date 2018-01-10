const test = require('tape');
const words = require('./words.js');

test('Testing words', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof words === 'function', 'words is a Function');
	t.deepEqual(words('I love javaScript!!'), ["I", "love", "javaScript"], "Returns words from a string");
	t.deepEqual(words('python, javaScript & coffee'), ["python", "javaScript", "coffee"], "Returns words from a string");

	//t.deepEqual(words(args..), 'Expected');
	//t.equal(words(args..), 'Expected');
	//t.false(words(args..), 'Expected');
	//t.throws(words(args..), 'Expected');
	t.end();
});