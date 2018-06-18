const expect = require('expect');
const isEven = require('./isEven.js');


  test('isEven is a Function', () => {
  expect(isEven).toBeInstanceOf(Function);
});
  test('4 is even number', () => {
  expect(isEven(4), true).toBe()
});
  test('5 is not an even number', () => {
  expect(isEven(5), false).toBeFalsy();
});
  
