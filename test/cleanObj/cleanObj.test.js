const test = require('tape');
const cleanObj = require('./cleanObj.js');

test('Testing cleanObj', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof cleanObj === 'function', 'cleanObj is a Function');
	//t.deepEqual(cleanObj(args..), 'Expected');
	//t.equal(cleanObj(args..), 'Expected');
	//t.false(cleanObj(args..), 'Expected');
	//t.throws(cleanObj(args..), 'Expected');
	t.end();
});