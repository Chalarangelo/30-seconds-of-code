const test = require('tape');
const geometricProgression = require('./geometricProgression.js');

test('Testing geometricProgression', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof geometricProgression === 'function', 'geometricProgression is a Function');
	t.deepEqual(geometricProgression(256), [1, 2, 4, 8, 16, 32, 64, 128, 256], "Initializes an array containing the numbers in the specified range");
	t.deepEqual(geometricProgression(256, 3), [3, 6, 12, 24, 48, 96, 192], "Initializes an array containing the numbers in the specified range");
	t.deepEqual(geometricProgression(256, 1, 4), [1, 4, 16, 64, 256], "Initializes an array containing the numbers in the specified range");
	//t.deepEqual(geometricProgression(args..), 'Expected');
	//t.equal(geometricProgression(args..), 'Expected');
	//t.false(geometricProgression(args..), 'Expected');
	//t.throws(geometricProgression(args..), 'Expected');
	t.end();
});