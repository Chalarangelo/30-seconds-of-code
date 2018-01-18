const test = require('tape');
const get = require('./get.js');

test('Testing get', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof get === 'function', 'get is a Function');
	const obj = { selector: { to: { val: 'val to get' } } };
	t.deepEqual(get(obj, 'selector.to.val'), ['val to get'], "Retrieve a property indicated by the selector from an object.");
	//t.deepEqual(get(args..), 'Expected');
	//t.equal(get(args..), 'Expected');
	//t.false(get(args..), 'Expected');
	//t.throws(get(args..), 'Expected');
	t.end();
});
