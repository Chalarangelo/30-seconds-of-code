const expect = require('expect');
const curry = require('./curry.js');


  test('curry is a Function', () => {
  expect(curry).toBeInstanceOf(Function);
});
  t.equal(curry(Math.pow)(2)(10), 1024, "curries a Math.pow");
  t.equal(curry(Math.min, 3)(10)(50)(2), 2, "curries a Math.min");
  
