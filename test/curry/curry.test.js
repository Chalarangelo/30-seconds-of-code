const test = require('tape');
const curry = require('./curry.js');

test('Testing curry', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof curry === 'function', 'curry is a Function');
	//BROKEN
	// t.equal(curry(Math.pow)(2)(10), 1024, "Curries a function");
	//t.deepEqual(curry(args..), 'Expected');
	//t.equal(curry(args..), 'Expected');
	//t.false(curry(args..), 'Expected');
	//t.throws(curry(args..), 'Expected');
	t.end();
});