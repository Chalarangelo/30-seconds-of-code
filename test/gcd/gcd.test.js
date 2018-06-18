const expect = require('expect');
const gcd = require('./gcd.js');


  test('gcd is a Function', () => {
  expect(gcd).toBeInstanceOf(Function);
});
  t.equal(gcd(8, 36), 4, "Calculates the greatest common divisor between two or more numbers/arrays");
  t.deepEqual(gcd(...[12, 8, 32]), 4, "Calculates the greatest common divisor between two or more numbers/arrays");
  
