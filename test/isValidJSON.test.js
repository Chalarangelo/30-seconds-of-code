const {isValidJSON} = require('./_30s.js');

test('isValidJSON is a Function', () => {
  expect(isValidJSON).toBeInstanceOf(Function);
});
test('{"name":"Adam","age":20} is a valid JSON', () => {
  expect(isValidJSON('{"name":"Adam","age":20}')).toBeTruthy();
});
test('{"name":"Adam",age:"20"} is not a valid JSON', () => {
  expect(isValidJSON('{"name":"Adam",age:"20"}')).toBeFalsy();
});
test('null is a valid JSON', () => {
  expect(isValidJSON(null)).toBeTruthy();
});
