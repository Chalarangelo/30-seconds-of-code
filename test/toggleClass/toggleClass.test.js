const test = require('tape');
const toggleClass = require('./toggleClass.js');

test('Testing toggleClass', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toggleClass === 'function', 'toggleClass is a Function');
	//t.deepEqual(toggleClass(args..), 'Expected');
	//t.equal(toggleClass(args..), 'Expected');
	//t.false(toggleClass(args..), 'Expected');
	//t.throws(toggleClass(args..), 'Expected');
	t.end();
});