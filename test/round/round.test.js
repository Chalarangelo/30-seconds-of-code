const test = require('tape');
const round = require('./round.js');

test('Testing round', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof round === 'function', 'round is a Function');
	//t.deepEqual(round(args..), 'Expected');
	//t.equal(round(args..), 'Expected');
	//t.false(round(args..), 'Expected');
	//t.throws(round(args..), 'Expected');
	t.end();
});