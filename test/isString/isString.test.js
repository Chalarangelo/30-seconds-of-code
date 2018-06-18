const expect = require('expect');
const isString = require('./isString.js');


  test('isString is a Function', () => {
  expect(isString).toBeInstanceOf(Function);
});
  test('foo is a string', () => {
  expect(isString('foo'), true).toBe()
});
  test('"10" is a string', () => {
  expect(isString('10'), true).toBe()
});
  test('Empty string is a string', () => {
  expect(isString(''), true).toBe()
});
  test('10 is not a string', () => {
  expect(isString(10), false).toBe()
});
  test('true is not string', () => {
  expect(isString(true), false).toBe()
});
  
