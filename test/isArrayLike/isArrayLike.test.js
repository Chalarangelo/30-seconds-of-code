const expect = require('expect');
const isArrayLike = require('./isArrayLike.js');


  test('isArrayLike is a Function', () => {
  expect(isArrayLike).toBeInstanceOf(Function);
});
  t.equal(isArrayLike('abc'), true, 'Returns true for a string');
  t.equal(isArrayLike([1,2,3]), true, 'Returns true for an array');
  t.equal(isArrayLike(null), false, 'Returns false for null');
  

