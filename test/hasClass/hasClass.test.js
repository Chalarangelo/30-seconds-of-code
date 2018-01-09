const test = require('tape');
const hasClass = require('./hasClass.js');

test('Testing hasClass', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hasClass === 'function', 'hasClass is a Function');
	//t.deepEqual(hasClass(args..), 'Expected');
	//t.equal(hasClass(args..), 'Expected');
	//t.false(hasClass(args..), 'Expected');
	//t.throws(hasClass(args..), 'Expected');
	t.end();
});