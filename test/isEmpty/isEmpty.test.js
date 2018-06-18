const expect = require('expect');
const isEmpty = require('./isEmpty.js');


  test('isEmpty is a Function', () => {
  expect(isEmpty).toBeInstanceOf(Function);
});
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
  

