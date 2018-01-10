const test = require('tape');
const isPrime = require('./isPrime.js');

test('Testing isPrime', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPrime === 'function', 'isPrime is a Function');
	t.equal(isPrime(11), true, "passed number is a prime");
	//t.deepEqual(isPrime(args..), 'Expected');
	//t.equal(isPrime(args..), 'Expected');
	//t.false(isPrime(args..), 'Expected');
	//t.throws(isPrime(args..), 'Expected');
	t.end();
});