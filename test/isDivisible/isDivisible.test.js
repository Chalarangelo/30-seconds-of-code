const expect = require('expect');
const isDivisible = require('./isDivisible.js');


  test('isDivisible is a Function', () => {
  expect(isDivisible).toBeInstanceOf(Function);
});
  t.equal(isDivisible(6, 3), true, 'The number 6 is divisible by 3');
  
