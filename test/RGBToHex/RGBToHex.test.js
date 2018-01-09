const test = require('tape');
const RGBToHex = require('./RGBToHex.js');

test('Testing RGBToHex', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof RGBToHex === 'function', 'RGBToHex is a Function');
	//t.deepEqual(RGBToHex(args..), 'Expected');
	//t.equal(RGBToHex(args..), 'Expected');
	//t.false(RGBToHex(args..), 'Expected');
	//t.throws(RGBToHex(args..), 'Expected');
	t.end();
});