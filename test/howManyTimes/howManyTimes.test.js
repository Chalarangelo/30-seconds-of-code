const test = require('tape');
const howManyTimes = require('./howManyTimes.js');

test('Testing howManyTimes', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof howManyTimes === 'function', 'howManyTimes is a Function');
	//t.deepEqual(howManyTimes(args..), 'Expected');
	//t.equal(howManyTimes(args..), 'Expected');
	//t.false(howManyTimes(args..), 'Expected');
	//t.throws(howManyTimes(args..), 'Expected');
	t.end();
});