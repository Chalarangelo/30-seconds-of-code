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
  t.equal(isPromiseLike(null), false, 'Returns false for null');
  t.equal(isPromiseLike({}), false, 'Returns false for an empty object');
  

