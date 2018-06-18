const expect = require('expect');
const isDivisible = require('./isDivisible.js');

test('isDivisible is a Function', () => {
  expect(isDivisible).toBeInstanceOf(Function);
});
test('The number 6 is divisible by 3', () => {
  expect(isDivisible(6, 3)).toBeTruthy();
});
  
