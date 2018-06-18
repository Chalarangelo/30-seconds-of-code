const expect = require('expect');
const isValidJSON = require('./isValidJSON.js');


  test('isValidJSON is a Function', () => {
  expect(isValidJSON).toBeInstanceOf(Function);
});
  test('{"name":"Adam","age":20} is a valid JSON', () => {
  expect(isValidJSON('{"name":"Adam","age":20}'), true).toBe()
});
  test('{"name":"Adam",age:"20"} is not a valid JSON', () => {
  expect(isValidJSON('{"name":"Adam",age:"20"}'), false).toBe()
});
  test('null is a valid JSON', () => {
  expect(isValidJSON(null), true).toBe()
});
  
