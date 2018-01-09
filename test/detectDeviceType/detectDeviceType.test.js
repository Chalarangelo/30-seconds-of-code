const test = require('tape');
const detectDeviceType = require('./detectDeviceType.js');

test('Testing detectDeviceType', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof detectDeviceType === 'function', 'detectDeviceType is a Function');
	//t.deepEqual(detectDeviceType(args..), 'Expected');
	//t.equal(detectDeviceType(args..), 'Expected');
	//t.false(detectDeviceType(args..), 'Expected');
	//t.throws(detectDeviceType(args..), 'Expected');
	t.end();
});