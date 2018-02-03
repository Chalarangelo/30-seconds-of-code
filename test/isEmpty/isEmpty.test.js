const test = require('tape');
const isEmpty = require('./isEmpty.js');

test('Testing isEmpty', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isEmpty === 'function', 'isEmpty is a Function');
  t.equal(isEmpty(new Map()), true, 'Returns true for empty Map');
  t.equal(isEmpty(new Set()), true, 'Returns true for empty Set');
  t.equal(isEmpty([]), true, 'Returns true for empty array');
  t.equal(isEmpty({}), true, 'Returns true for empty object');
  t.equal(isEmpty(''), true, 'Returns true for empty string');
  t.equal(isEmpty([1, 2]), false, 'Returns false for non-empty array');
  t.equal(isEmpty({ a: 1, b: 2 }), false, 'Returns false for non-empty object');
  t.equal(isEmpty('text'), false, 'Returns false for non-empty string');
  t.equal(isEmpty(123), true, 'Returns true - type is not considered a collection');
  t.equal(isEmpty(true), true, 'Returns true - type is not considered a collection');
  //t.deepEqual(isEmpty(args..), 'Expected');
  //t.equal(isEmpty(args..), 'Expected');
  //t.false(isEmpty(args..), 'Expected');
  //t.throws(isEmpty(args..), 'Expected');
  t.end();
});
