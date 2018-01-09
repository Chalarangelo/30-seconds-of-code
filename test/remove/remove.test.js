const test = require('tape');
const remove = require('./remove.js');

test('Testing remove', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof remove === 'function', 'remove is a Function');
	//t.deepEqual(remove(args..), 'Expected');
	//t.equal(remove(args..), 'Expected');
	//t.false(remove(args..), 'Expected');
	//t.throws(remove(args..), 'Expected');
	t.end();
});