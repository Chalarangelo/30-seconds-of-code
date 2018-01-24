const test = require('tape');
const unzipWith = require('./unzipWith.js');

test('Testing unzipWith', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unzipWith === 'function', 'unzipWith is a Function');
	t.deepEqual(unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)), [3, 30, 300], `unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)) equals [3, 30, 300]`);
	//t.equal(unzipWith(args..), 'Expected');
	//t.false(unzipWith(args..), 'Expected');
	//t.throws(unzipWith(args..), 'Expected');
	t.end();
});
