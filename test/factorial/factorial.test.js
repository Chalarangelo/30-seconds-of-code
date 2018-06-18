const expect = require('expect');
const factorial = require('./factorial.js');


  test('factorial is a Function', () => {
  expect(factorial).toBeInstanceOf(Function);
});
  t.equal(factorial(6), 720, "Calculates the factorial of 720");
  t.equal(factorial(0), 1, "Calculates the factorial of 0");
  t.equal(factorial(1), 1, "Calculates the factorial of 1");
  t.equal(factorial(4), 24, "Calculates the factorial of 4");
  t.equal(factorial(10), 3628800, "Calculates the factorial of 10");
  
