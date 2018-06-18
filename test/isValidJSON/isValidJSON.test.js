const expect = require('expect');
const isValidJSON = require('./isValidJSON.js');


  test('isValidJSON is a Function', () => {
  expect(isValidJSON).toBeInstanceOf(Function);
});
  t.equal(isValidJSON('{"name":"Adam","age":20}'), true, '{"name":"Adam","age":20} is a valid JSON');
  t.equal(isValidJSON('{"name":"Adam",age:"20"}'), false, '{"name":"Adam",age:"20"} is not a valid JSON');
  t.equal(isValidJSON(null), true, 'null is a valid JSON');
  
