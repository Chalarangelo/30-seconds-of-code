const expect = require('expect');
const sum = require('./sum.js');


  test('sum is a Function', () => {
  expect(sum).toBeInstanceOf(Function);
});
  t.equal(sum(...[1, 2, 3, 4]), 10, "Returns the sum of two or more numbers/arrays.");
  
