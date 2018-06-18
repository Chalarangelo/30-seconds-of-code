const expect = require('expect');
const isUpperCase = require('./isUpperCase.js');


  test('isUpperCase is a Function', () => {
  expect(isUpperCase).toBeInstanceOf(Function);
});
  test('ABC is all upper case', () => {
  expect(isUpperCase('ABC'), true).toBe()
});
  test('abc is not all upper case', () => {
  expect(isUpperCase('abc'), false).toBe()
});
  test('A3@$ is all uppercase', () => {
  expect(isUpperCase('A3@$'), true).toBe()
});
  
