const test = require('tape');
const geometricProgression = require('./geometricProgression.js');

test('Testing geometricProgression', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof geometricProgression === 'function', 'geometricProgression is a Function');
	//t.deepEqual(geometricProgression(args..), 'Expected');
	//t.equal(geometricProgression(args..), 'Expected');
	//t.false(geometricProgression(args..), 'Expected');
	//t.throws(geometricProgression(args..), 'Expected');
	t.end();
});