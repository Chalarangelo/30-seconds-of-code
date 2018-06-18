const expect = require('expect');
const isPrimitive = require('./isPrimitive.js');


  test('isPrimitive is a Function', () => {
  expect(isPrimitive).toBeInstanceOf(Function);
});
  t.true(isPrimitive(null), "isPrimitive(null) is primitive");
  t.true(isPrimitive(undefined), "isPrimitive(undefined) is primitive");
  t.true(isPrimitive('string'), "isPrimitive(string) is primitive");
  t.true(isPrimitive(true), "isPrimitive(true) is primitive");
  t.true(isPrimitive(50), "isPrimitive(50) is primitive");
  t.true(isPrimitive('Hello'), "isPrimitive('Hello') is primitive");
  t.true(isPrimitive(false), "isPrimitive(false) is primitive");
  t.true(isPrimitive(Symbol()), "isPrimitive(Symbol()) is primitive");
  t.false(isPrimitive([1, 2, 3]), "isPrimitive([1, 2, 3]) is not primitive");
  t.false(isPrimitive({ a: 123 }), "isPrimitive({ a: 123 }) is not primitive");
  
  let start = new Date().getTime();
  isPrimitive({ a: 123 
  let end = new Date().getTime();  
  test('isPrimitive({ a: 123 }) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  
