const test = require('tape');
const is = require('./is.js');

test('Testing is', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof is === 'function', 'is is a Function');
  t.true(is(Array, [1]), `Works for arrays with data`);
  t.true(is(Array, []), `Works for empty arrays`);
  t.false(is(Array, {}), `Works for arrays, not objects`);
  t.true(is(Object, {}), `Works for objects`);
  t.true(is(Map, new Map()), `Works for maps`);
  t.true(is(RegExp, /./g), `Works for regular expressions`);
  t.true(is(Set, new Set()), `Works for sets`);
  t.true(is(WeakMap, new WeakMap()), `Works for weak maps`);
  t.true(is(WeakSet, new WeakSet()), `Works for weak sets`);
  t.false(is(String, ''), `Works for strings - returns false for primitive`);
  t.true(is(String, new String('')), `Works for strings - returns true when using constructor`);
  t.false(is(Number, 1), `Works for numbers - returns false for primitive`);
  t.true(is(Number, new Number('10')), `Works for numbers - returns true when using constructor`);
  t.false(is(Boolean, false), `Works for booleans - returns false for primitive`);
  t.true(is(Boolean, new Boolean(false)), `Works for booleans - returns true when using constructor`);
  t.true(is(Function, () => null), `Works for functions`);
	//t.deepEqual(is(args..), 'Expected');
	//t.equal(is(args..), 'Expected');
	//t.false(is(args..), 'Expected');
	//t.throws(is(args..), 'Expected');
	t.end();
});
