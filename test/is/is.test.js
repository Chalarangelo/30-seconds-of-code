const expect = require('expect');
const is = require('./is.js');


  test('is is a Function', () => {
  expect(is).toBeInstanceOf(Function);
});
  t.true(is(Array, [1]), `Works for arrays with data`);
  t.true(is(Array, []), `Works for empty arrays`);
  t.false(is(Array, {}), `Works for arrays, not objects`);
  t.true(is(Object, {}), `Works for objects`);
  t.true(is(Map, new Map()), `Works for maps`);
  t.true(is(RegExp, /./g), `Works for regular expressions`);
  t.true(is(Set, new Set()), `Works for sets`);
  t.true(is(WeakMap, new WeakMap()), `Works for weak maps`);
  t.true(is(WeakSet, new WeakSet()), `Works for weak sets`);
  t.true(is(String, ''), `Works for strings - returns true for primitive`);
  t.true(is(String, new String('')), `Works for strings - returns true when using constructor`);
  t.true(is(Number, 1), `Works for numbers - returns true for primitive`);
  t.true(is(Number, new Number('10')), `Works for numbers - returns true when using constructor`);
  t.true(is(Boolean, false), `Works for booleans - returns true for primitive`);
  t.true(is(Boolean, new Boolean(false)), `Works for booleans - returns true when using constructor`);
  t.true(is(Function, () => null), `Works for functions`);
  

