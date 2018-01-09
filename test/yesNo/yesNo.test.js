const test = require('tape');
const yesNo = require('./yesNo.js');

test('Testing yesNo', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof yesNo === 'function', 'yesNo is a Function');
	//t.deepEqual(yesNo(args..), 'Expected');
	//t.equal(yesNo(args..), 'Expected');
	//t.false(yesNo(args..), 'Expected');
	//t.throws(yesNo(args..), 'Expected');
	t.end();
});