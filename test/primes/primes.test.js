const test = require('tape');
const primes = require('./primes.js');

test('Testing primes', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof primes === 'function', 'primes is a Function');
	//t.deepEqual(primes(args..), 'Expected');
	//t.equal(primes(args..), 'Expected');
	//t.false(primes(args..), 'Expected');
	//t.throws(primes(args..), 'Expected');
	t.end();
});