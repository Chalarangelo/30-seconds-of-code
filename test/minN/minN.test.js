const test = require('tape');
const minN = require('./minN.js');

test('Testing minN', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof minN === 'function', 'minN is a Function');
	//t.deepEqual(minN(args..), 'Expected');
	//t.equal(minN(args..), 'Expected');
	//t.false(minN(args..), 'Expected');
	//t.throws(minN(args..), 'Expected');
	t.end();
});