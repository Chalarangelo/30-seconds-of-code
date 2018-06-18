const expect = require('expect');
const isBoolean = require('./isBoolean.js');


  test('isBoolean is a Function', () => {
  expect(isBoolean).toBeInstanceOf(Function);
});
  t.equal(isBoolean(null), false, "passed value is not a boolean");
  t.equal(isBoolean(false), true, "passed value is not a boolean");
  
