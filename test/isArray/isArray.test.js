const expect = require('expect');
const isArray = require('./isArray.js');


  test('isArray is a Function', () => {
  expect(isArray).toBeInstanceOf(Function);
});
  t.equal(isArray([1]), true, "passed value is an array");
  t.equal(isArray('array'), false, "passed value is not an array");
  
