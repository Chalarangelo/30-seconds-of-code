const test = require('tape');
const castArray = require('./castArray.js');

test('Testing castArray', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof castArray === 'function', 'castArray is a Function');
  t.deepEqual(castArray(1), [1], 'Works for single values');
  t.deepEqual(castArray([1]), [1], 'Works for arrays with one value');
  t.deepEqual(castArray([1,2,3]), [1,2,3], 'Works for arrays with multiple value');
  t.deepEqual(castArray('test'), ['test'], 'Works for strings');
  t.deepEqual(castArray({}), [{}], 'Works for objects');
	//t.deepEqual(castArray(args..), 'Expected');
	//t.equal(castArray(args..), 'Expected');
	//t.false(castArray(args..), 'Expected');
	//t.throws(castArray(args..), 'Expected');
	t.end();
});
