const expect = require('expect');
const isObjectLike = require('./isObjectLike.js');


  test('isObjectLike is a Function', () => {
  expect(isObjectLike).toBeInstanceOf(Function);
});
  t.equal(isObjectLike({}), true, 'Returns true for an object');
  t.equal(isObjectLike([1, 2, 3]), true, 'Returns true for an array');
  t.equal(isObjectLike(x => x), false, 'Returns false for a function');
  t.equal(isObjectLike(null), false, 'Returns false for null');
  

