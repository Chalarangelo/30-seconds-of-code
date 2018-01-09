const test = require('tape');
const sumPower = require('./sumPower.js');

test('Testing sumPower', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sumPower === 'function', 'sumPower is a Function');
	//t.deepEqual(sumPower(args..), 'Expected');
	//t.equal(sumPower(args..), 'Expected');
	//t.false(sumPower(args..), 'Expected');
	//t.throws(sumPower(args..), 'Expected');
	t.end();
});