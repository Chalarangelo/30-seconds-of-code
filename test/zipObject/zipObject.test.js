const test = require('tape');
const zipObject = require('./zipObject.js');

test('Testing zipObject', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zipObject === 'function', 'zipObject is a Function');
	t.deepEqual(zipObject(['a', 'b', 'c'], [1, 2]), {a: 1, b: 2, c: undefined}, 'Array was zipped to object');
	t.deepEqual(zipObject(['a', 'b'], [1, 2, 3]), {a: 1, b: 2}, 'Array was zipped to object');
	//t.equal(zipObject(args..), 'Expected');
	//t.false(zipObject(args..), 'Expected');
	//t.throws(zipObject(args..), 'Expected');
	t.end();
});
