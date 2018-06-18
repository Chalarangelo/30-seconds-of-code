const expect = require('expect');
const isPrime = require('./isPrime.js');


  test('isPrime is a Function', () => {
  expect(isPrime).toBeInstanceOf(Function);
});
  t.equal(isPrime(11), true, "passed number is a prime");
  
