const test = require('tape');
const toKebabCase = require('./toKebabCase.js');

test('Testing toKebabCase', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toKebabCase === 'function', 'toKebabCase is a Function');
	t.equal(toKebabCase('camelCase'), 'camel-case', "string converts to snake case");
	t.equal(toKebabCase('some text'), 'some-text', "string converts to snake case");
	t.equal(toKebabCase('some-mixed-string With spaces-underscores-and-hyphens'), 'some-mixed-string-with-spaces-underscores-and-hyphens', "string converts to snake case");
	t.equal(toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'), 'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html', "string converts to snake case");
	//t.deepEqual(toKebabCase(args..), 'Expected');
	//t.equal(toKebabCase(args..), 'Expected');
	//t.false(toKebabCase(args..), 'Expected');
	//t.throws(toKebabCase(args..), 'Expected');
	t.end();
});