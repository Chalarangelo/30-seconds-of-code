const test = require('tape');
const nthArg = require('./nthArg.js');

test('Testing nthArg', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof nthArg === 'function', 'nthArg is a Function');
	//t.deepEqual(nthArg(args..), 'Expected');
	//t.equal(nthArg(args..), 'Expected');
	//t.false(nthArg(args..), 'Expected');
	//t.throws(nthArg(args..), 'Expected');
	t.end();
});