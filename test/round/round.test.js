const test = require('tape');
const round = require('./round.js');

test('Testing round', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof round === 'function', 'round is a Function');
	t.equal(round(1.005, 2), 1.01, "Rounds a number to a specified amount of digits.");
	//t.equal(round(args..), 'Expected');
	//t.false(round(args..), 'Expected');
	//t.throws(round(args..), 'Expected');
	t.end();
});