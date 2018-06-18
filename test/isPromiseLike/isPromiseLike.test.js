const expect = require('expect');
const isPromiseLike = require('./isPromiseLike.js');


  test('isPromiseLike is a Function', () => {
  expect(isPromiseLike).toBeInstanceOf(Function);
});
  t.equal(isPromiseLike({
    then: function() {
      return '';
    }
  }), true, 'Returns true for a promise-like object');
  test('Returns false for null', () => {
  expect(isPromiseLike(null), false).toBe()
});
  test('Returns false for an empty object', () => {
  expect(isPromiseLike({}), false).toBe()
});
  

