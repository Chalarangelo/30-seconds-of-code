const test = require('tape');
const luhnCheck = require('./luhnCheck.js');

test('Testing luhnCheck', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof luhnCheck === 'function', 'luhnCheck is a Function');
	//t.deepEqual(luhnCheck(args..), 'Expected');
	//t.equal(luhnCheck(args..), 'Expected');
	//t.false(luhnCheck(args..), 'Expected');
	//t.throws(luhnCheck(args..), 'Expected');
	t.end();
});