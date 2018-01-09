const test = require('tape');
const createElement = require('./createElement.js');

test('Testing createElement', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof createElement === 'function', 'createElement is a Function');
	//t.deepEqual(createElement(args..), 'Expected');
	//t.equal(createElement(args..), 'Expected');
	//t.false(createElement(args..), 'Expected');
	//t.throws(createElement(args..), 'Expected');
	t.end();
});