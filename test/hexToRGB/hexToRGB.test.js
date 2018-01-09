const test = require('tape');
const hexToRGB = require('./hexToRGB.js');

test('Testing hexToRGB', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hexToRGB === 'function', 'hexToRGB is a Function');
	//t.deepEqual(hexToRGB(args..), 'Expected');
	//t.equal(hexToRGB(args..), 'Expected');
	//t.false(hexToRGB(args..), 'Expected');
	//t.throws(hexToRGB(args..), 'Expected');
	t.end();
});