const test = require('tape');
const elo = require('./elo.js');

test('Testing elo', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof elo === 'function', 'elo is a Function');
	//t.deepEqual(elo(args..), 'Expected');
	//t.equal(elo(args..), 'Expected');
	//t.false(elo(args..), 'Expected');
	//t.throws(elo(args..), 'Expected');
	t.end();
});