const expect = require('expect');
const isNil = require('./isNil.js');


  test('isNil is a Function', () => {
  expect(isNil).toBeInstanceOf(Function);
});
  test('Returns true for null', () => {
  expect(isNil(null), true).toBe()
});
  test('Returns true for undefined', () => {
  expect(isNil(undefined), true).toBe()
});
  test('Returns false for an empty string', () => {
  expect(isNil(''), false).toBe()
});
  

