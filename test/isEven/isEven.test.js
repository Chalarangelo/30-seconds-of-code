const expect = require('expect');
const isEven = require('./isEven.js');


  test('isEven is a Function', () => {
  expect(isEven).toBeInstanceOf(Function);
});
  t.equal(isEven(4), true, '4 is even number');
  test('5 is not an even number', () => {
  expect(isEven(5), false).toBeFalsy();
});
  
