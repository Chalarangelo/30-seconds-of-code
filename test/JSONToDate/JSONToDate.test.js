const test = require('tape');
const JSONToDate = require('./JSONToDate.js');

test('Testing JSONToDate', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof JSONToDate === 'function', 'JSONToDate is a Function');
	//t.deepEqual(JSONToDate(args..), 'Expected');
	//t.equal(JSONToDate(args..), 'Expected');
	//t.false(JSONToDate(args..), 'Expected');
	//t.throws(JSONToDate(args..), 'Expected');
	t.end();
});