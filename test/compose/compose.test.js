const test = require('tape');
const compose = require('./compose.js');

test('Testing compose', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof compose === 'function', 'compose is a Function');
	const add5 = x => x + 5;
	const multiply = (x, y) => x * y;
	const multiplyAndAdd5 = compose(add5, multiply);
	t.equal(multiplyAndAdd5(5, 2), 15, "Performs right-to-left function composition");
	//t.deepEqual(compose(args..), 'Expected');
	//t.equal(compose(args..), 'Expected');
	//t.false(compose(args..), 'Expected');
	//t.throws(compose(args..), 'Expected');
	t.end();
});