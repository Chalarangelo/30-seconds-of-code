const test = require('tape');
const zipObject = require('./zipObject.js');

test('Testing zipObject', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zipObject === 'function', 'zipObject is a Function');
	//t.deepEqual(zipObject(args..), 'Expected');
	//t.equal(zipObject(args..), 'Expected');
	//t.false(zipObject(args..), 'Expected');
	//t.throws(zipObject(args..), 'Expected');
	t.end();
});