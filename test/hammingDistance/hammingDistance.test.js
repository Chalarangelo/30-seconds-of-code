const test = require('tape');
const hammingDistance = require('./hammingDistance.js');

test('Testing hammingDistance', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof hammingDistance === 'function', 'hammingDistance is a Function');
	t.equal(hammingDistance(2, 3), 1, "retuns hamming disance between 2 values");
	//t.deepEqual(hammingDistance(args..), 'Expected');
	//t.equal(hammingDistance(args..), 'Expected');
	//t.false(hammingDistance(args..), 'Expected');
	//t.throws(hammingDistance(args..), 'Expected');
	t.end();
});