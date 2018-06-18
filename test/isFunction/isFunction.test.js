const expect = require('expect');
const isFunction = require('./isFunction.js');


  test('isFunction is a Function', () => {
  expect(isFunction).toBeInstanceOf(Function);
});
  t.equal(isFunction(x => x), true, "passed value is a function");
  t.equal(isFunction('x'), false, "passed value is not a function");
  
