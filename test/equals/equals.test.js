const test = require('tape');
const equals = require('./equals.js');

test('Testing equals', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof equals === 'function', 'equals is a Function');
  t.true(equals({ a: [2, {e: 3}], b: [4], c: 'foo' }, { a: [2, {e: 3}], b: [4], c: 'foo' }), "{ a: [2, {e: 3}], b: [4], c: 'foo' } is equal to { a: [2, {e: 3}], b: [4], c: 'foo' }");
  t.true(equals([1, 2, 3], [1, 2, 3]), '[1,2,3] is equal to [1,2,3]');
  t.false(equals({ a: [2, 3], b: [4] }, { a: [2, 3], b: [6] }), '{ a: [2, 3], b: [4] } is not equal to { a: [2, 3], b: [6] }');
  t.false(equals([1, 2, 3], [1, 2, 4]), '[1,2,3] is not equal to [1,2,4]');
  t.true(equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }), '[1, 2, 3] should be equal to { 0: 1, 1: 2, 2: 3 }) - type is different, but their enumerable properties match.')
  //t.deepEqual(equals(args..), 'Expected');
  //t.equal(equals(args..), 'Expected');
  //t.false(equals(args..), 'Expected');
  //t.throws(equals(args..), 'Expected');
  t.end();
});
