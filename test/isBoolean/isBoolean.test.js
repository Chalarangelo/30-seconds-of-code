const expect = require('expect');
const isBoolean = require('./isBoolean.js');


  test('isBoolean is a Function', () => {
  expect(isBoolean).toBeInstanceOf(Function);
});
  test('passed value is not a boolean', () => {
  expect(isBoolean(null)).toBe(false)
});
  test('passed value is not a boolean', () => {
  expect(isBoolean(false)).toBe(true)
});
  
