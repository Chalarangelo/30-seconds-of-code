const expect = require('expect');
const isLowerCase = require('./isLowerCase.js');


  test('isLowerCase is a Function', () => {
  expect(isLowerCase).toBeInstanceOf(Function);
});
  test('passed string is a lowercase', () => {
  expect(isLowerCase('abc')).toBe(true)
});
  test('passed string is a lowercase', () => {
  expect(isLowerCase('a3@$')).toBe(true)
});
  test('passed value is not a lowercase', () => {
  expect(isLowerCase('A3@$')).toBe(false)
});
  
