const test = require('tape');
const unzip = require('./unzip.js');

test('Testing unzip', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof unzip === 'function', 'unzip is a Function');
	t.deepEqual(unzip([['a', 1, true], ['b', 2, false]]), [['a', 'b'], [1, 2], [true, false]], `unzip([['a', 1, true], ['b', 2, false]]) equals [['a', 'b'], [1, 2], [true, false]]`);
  t.deepEqual(unzip([['a', 1, true], ['b', 2]]), [['a', 'b'], [1, 2], [true]], `unzip([['a', 1, true], ['b', 2]]) equals [['a', 'b'], [1, 2], [true]]`);
	//t.deepEqual(unzip(args..), 'Expected');
	//t.equal(unzip(args..), 'Expected');
	//t.false(unzip(args..), 'Expected');
	//t.throws(unzip(args..), 'Expected');
	t.end();
});
