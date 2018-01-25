const test = require('tape');
const hasClass = require('./hasClass.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('Testing hasClass', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hasClass === 'function', 'hasClass is a Function');
	const className = 'container'
	const dom = new JSDOM(`
	<p class="${className}">Some text</p>
	`);
	t.true(hasClass(dom.window.document.querySelector('p'), className), 'element has the specified class');
	//t.deepEqual(hasClass(args..), 'Expected');
	//t.equal(hasClass(args..), 'Expected');
	//t.false(hasClass(args..), 'Expected');
	//t.throws(hasClass(args..), 'Expected');
	t.end();
});