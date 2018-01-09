const test = require('tape');
const elementIsVisibleInViewport = require('./elementIsVisibleInViewport.js');

test('Testing elementIsVisibleInViewport', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof elementIsVisibleInViewport === 'function', 'elementIsVisibleInViewport is a Function');
	//t.deepEqual(elementIsVisibleInViewport(args..), 'Expected');
	//t.equal(elementIsVisibleInViewport(args..), 'Expected');
	//t.false(elementIsVisibleInViewport(args..), 'Expected');
	//t.throws(elementIsVisibleInViewport(args..), 'Expected');
	t.end();
});