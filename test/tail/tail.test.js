const test = require('tape');
const tail = require('./tail.js');

test('Testing tail', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof tail === 'function', 'tail is a Function');
	//t.deepEqual(tail(args..), 'Expected');
	//t.equal(tail(args..), 'Expected');
	//t.false(tail(args..), 'Expected');
	//t.throws(tail(args..), 'Expected');
	t.end();
});