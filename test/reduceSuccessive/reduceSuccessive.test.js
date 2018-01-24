const test = require('tape');
const reduceSuccessive = require('./reduceSuccessive.js');

test('Testing reduceSuccessive', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof reduceSuccessive === 'function', 'reduceSuccessive is a Function');
	//t.deepEqual(reduceSuccessive(args..), 'Expected');
	//t.equal(reduceSuccessive(args..), 'Expected');
	//t.false(reduceSuccessive(args..), 'Expected');
	//t.throws(reduceSuccessive(args..), 'Expected');
	t.end();
});